import { Box, Center, Code, Flex, Spacer } from '@chakra-ui/layout'
import { Progress } from '@chakra-ui/progress'
import { useColorModeValue, Text, Image, Stack } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/spinner'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React, { useEffect } from 'react'
import { atom, useRecoilState } from 'recoil'
import useSWR from 'swr'
import { logger } from 'utils/logger'
import { fetcher } from 'utils/utils'
import Form from '../components/Form'
import Done from './done'


export const getServerSideProps: GetServerSideProps = async (context) => {
	return {
		props: {
			id: context.query.id as string,
		}
	}
}

export interface Check {
	pass: boolean,
	imageID: string,
	imageURL: string,
	page: number,
	checked: boolean,
	isQuestionOne: boolean
}
export interface AttentionCheck {
	uid: string,
	currentPage: number, // redundant
	checks: Check[]
}

export const attentionCheckState = atom<AttentionCheck>({
	key: 'att-check',
	default: {
		uid: '',
		currentPage: -1,
		checks: [{
			pass: false,
			imageID: 'att_0',
			imageURL: 'https://c102-251.cloud.gwdg.de/public/4327805618_a2b1c48f5a.jpg',
			page: 25,
			checked: false,
			isQuestionOne: true
		},
		{
			pass: false,
			imageID: 'att_1',
			imageURL: 'https://c102-251.cloud.gwdg.de/private/4363222502_9828d7b93c.jpg',
			checked: false,
			page: 50,
			isQuestionOne: true
		},
		{
			pass: false,
			imageID: 'att_2',
			imageURL: 'https://c102-251.cloud.gwdg.de/private/4380717531_94abf4986c.jpg',
			checked: false,
			page: 75,
			isQuestionOne: false
		}]
	}
})

const Annotate = ({ id }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const colorMode = useColorModeValue('white', 'gray.800')
	const { data, error, mutate } = useSWR(`/api/user?id=${id}`, fetcher)
	const [attentionCheck, setAttentionCheck] = useRecoilState(attentionCheckState)

	// initialize att-check state
	useEffect(() => {
		if (id && !attentionCheck.uid) {
			setAttentionCheck({
				...attentionCheck,
				uid: id,
			})
		}
	}, [attentionCheck, id, setAttentionCheck])

	// update att-check current page
	useEffect(() => {
		if (data && data.data && id && attentionCheck.currentPage === -1) {
			const { users_by_pk: { next_index: nextIndex } } = data.data
			setAttentionCheck({
				...attentionCheck,
				currentPage: nextIndex as number - 1
			})
		}
	}, [attentionCheck, data, id, setAttentionCheck])


	if (error) {
		logger.error(error)
		return <>
			An Error Occured. Please Login or start a new session.
		</>
	}
	if (!data) {
		return <>
			<Center mt="24">
				<Spinner size="xl" />
			</Center>
		</>
	}

	if (id) {
		const { users_by_pk: { images, next_index: nextIndex } } = data.data
		if (nextIndex === 101) return <Done />

		const { checks } = attentionCheck
		const check = checks.find(({ page }) => page === nextIndex - 1)
		const isCheck = () => {
			if (check) {
				return !check.checked
			}
			return false
		}

		return (
			<>
				<Progress colorScheme="red" value={nextIndex as number} />
				<Flex w="full" alignItems='center' justifyContent='center'>
					<Box
						bg={colorMode}
						w="lg"
						maxW="xl"
						borderWidth="1px"
						rounded="lg"
						shadow="lg"
						mt={5}
						position="relative"
					>
						<Center p={5}>
							<Stack spacing={3}>
								<Text>UID:</Text>
								<Code> {id}</Code>
								<Text>Submission No.:</Text>
								<Code>{nextIndex as number - 1}</Code>
								<Spacer />
								<Spacer />
								<Image
									boxShadow="md"
									borderRadius='md'
									src={isCheck() ? check!.imageURL : images[nextIndex - 1].url}
									alt='Image'
								/>
							</Stack>
						</Center>
						<Form
							uid={id as string}
							imageID={isCheck() ? check!.imageID : images[nextIndex - 1].id}
							pageNumber={nextIndex as number}
							refetch={mutate}
							isCheck={isCheck()}
						/>
					</Box>
				</Flex>
			</>
		)
	}

	return <div>ID needed! Please login or start a new session.</div>
}

export default Annotate
