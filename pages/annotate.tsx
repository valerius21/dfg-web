import { Box, Center, Code, Flex, Spacer } from "@chakra-ui/layout";
import { Progress } from "@chakra-ui/progress";
import { useColorModeValue, Text, Image, Stack, Heading } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";
import { STUDY_SIZE } from "db/db";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React, { useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import useSWR from "swr";
import { logger } from "utils/logger";
import { fetcher } from "utils/utils";
import Form from "../components/Form";
import Done from "./done";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      id: context.query.id as string,
    },
  };
};

export interface Check {
  pass: boolean;
  imageID: string;
  imageURL: string;
  page: number;
  checked: boolean;
  isQuestionOne: boolean;
}
export interface AttentionCheck {
  uid: string;
  currentPage: number; // redundant
  checks: Check[];
}

export const attentionCheckState = atom<AttentionCheck>({
  key: "att-check",
  default: {
    uid: "",
    currentPage: -1,
    checks: [
      {
        pass: false,
        imageID: "att_0",
        imageURL:
          "https://c102-251.cloud.gwdg.de/public/4327805618_a2b1c48f5a.jpg",
        page: 25,
        checked: false,
        isQuestionOne: true,
      },
      {
        pass: false,
        imageID: "att_1",
        imageURL:
          "https://c102-251.cloud.gwdg.de/private/4363222502_9828d7b93c.jpg",
        checked: false,
        page: 50,
        isQuestionOne: true,
      },
      {
        pass: false,
        imageID: "att_2",
        imageURL:
          "https://c102-251.cloud.gwdg.de/private/4380717531_94abf4986c.jpg",
        checked: false,
        page: 75,
        isQuestionOne: false,
      },
    ],
  },
});

export interface User {
  uid: string
}

export const userState = atom<User>({
  key: 'r-uid',
  default: {
    uid: ''
  }
})

const Annotate = ({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const colorMode = useColorModeValue("white", "gray.800");
  const { data, error, mutate } = useSWR(`/api/user?id=${id}`, fetcher);
  const [attentionCheck, setAttentionCheck] =
    useRecoilState(attentionCheckState);
  const [userId, setUserId] = useRecoilState(userState)

  // initialize r-uid state
  useEffect(() => {
    if (id) {
      setUserId({
        uid: id
      })
    }
  }, [id, setUserId])

  // initialize att-check state
  useEffect(() => {
    if (id && !attentionCheck.uid) {
      setAttentionCheck({
        ...attentionCheck,
        uid: id,
      });
    }
  }, [attentionCheck, id, setAttentionCheck]);

  // update att-check current page
  useEffect(() => {
    if (data && data.data && id && attentionCheck.currentPage === -1) {
      const {
        users_by_pk: { next_index: nextIndex },
      } = data.data;
      setAttentionCheck({
        ...attentionCheck,
        currentPage: (nextIndex as number) - 1,
      });
    }
  }, [attentionCheck, data, id, setAttentionCheck]);

  if (error) {
    logger.error(error);
    return <>An Error Occured. Please Login or start a new session.</>;
  }
  if (!data) {
    return (
      <>
        <Center mt="24">
          <Spinner size="xl" />
        </Center>
      </>
    );
  }

  if (id) {
    const {
      users_by_pk: { images, next_index: nextIndex },
    } = data.data;
    if (nextIndex === 101) return <Done />;

    const { checks } = attentionCheck;
    const check = checks.find(({ page }) => page === nextIndex - 1);
    const isCheck = () => {
      if (check) {
        return !check.checked;
      }
      return false;
    };

    return (
      <>
        <Flex
          mx='auto'
          maxW="3xl"
        >
          <Progress mx='auto' colorScheme="red" value={nextIndex as number} display={{ base: 'none', md: 'flex' }} />
          <Box
            bg={colorMode}
            rounded="lg"
            borderWidth={{ base: '0px', md: "1px" }}
            shadow={{ base: 'none', md: 'md' }}
            mt={5}
            px={"14"}
            mx='auto'
          >
            <Center p={5}>
              <Stack spacing={"5"}>
                <Heading textAlign='center' color='red.400'>{(nextIndex as number) - 1} / {STUDY_SIZE}</Heading>
                <Image
                  boxShadow="md"
                  borderRadius="md"
                  src={isCheck() ? check!.imageURL : images[nextIndex - 1].url}
                  alt="Image"
                />
              </Stack>
            </Center>
            <Form
              uid={userId.uid}
              imageID={isCheck() ? check!.imageID : images[nextIndex - 1].id}
              pageNumber={nextIndex as number}
              refetch={mutate}
              isCheck={isCheck()}
            />
          </Box>
        </Flex>
      </>
    );
  }

  return <div>ID needed! Please login or start a new session.</div>;
};

export default Annotate;
