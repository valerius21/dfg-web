import { Box, Center, Flex } from '@chakra-ui/layout'
import { Progress } from '@chakra-ui/progress'
import { useColorModeValue, Text, Image } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/spinner'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React from 'react'
import useSWR from 'swr'
import Form from '../components/Form'
import Done from './done'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const getServerSideProps: GetServerSideProps = async (context) => {
	return {
		props: {
			id: context.query.id as string,
		}
	}
}

const Annotate = ({ id }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const colorMode = useColorModeValue('white', 'gray.800')
	const { data, error, mutate } = useSWR(`/api/user?id=${id}`, fetcher)

	if (error) {
		console.error(error)
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
							<div>
								UID:
								<Text fontWeight='bold'> {id}</Text>
								Submission No.:
								<Text fontWeight='bold'>{nextIndex as number - 1}</Text>
								<Image
									mt={5}
									boxShadow="md"
									borderRadius='md'
									src={images[nextIndex - 1].url}
									alt='Image'
								/>
							</div>
						</Center>
						<Form
							uid={id as string}
							imageID={images[nextIndex - 1].id}
							pageNumber={nextIndex as number}
							refetch={mutate}
						/>
					</Box>
				</Flex>
			</>
		)
	}

	return <div>ID needed! Please login or start a new session.</div>
}

export default Annotate
