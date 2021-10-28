import { Box, Center, Flex } from '@chakra-ui/layout'
import { Progress } from '@chakra-ui/progress'
import { useColorModeValue, Text, Image } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/spinner'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React from 'react'
import { useQuery } from 'react-query'
import { requestUserInformation } from 'utils/utils'
import Form from '../components/Form'
import Done from './done'

export const getServerSideProps: GetServerSideProps = async (context) => {
	return {
		props: {
			id: context.query.id as string
		}
	}
}

const Annotate = ({ id }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const colorMode = useColorModeValue('white', 'gray.800')
	const { data, isLoading, isError, error, refetch } = useQuery('getImage', async () => {
		if (id !== undefined) {
			// throw new Error("No User ID");
			return await requestUserInformation(id as string)
		}
		return
	})

	if (isError) {
		console.error(error)
		return <>
			An Error Occured. Please Login or start a new session.
		</>
	}
	if (isLoading) {
		return <>
			<Center mt="24">
				<Spinner size="xl" />
			</Center>
		</>
	}

	if (id) {
		refetch()
		const { users_by_pk: { images, next_index: nextIndex } } = data
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
							refetch={refetch}
						/>
					</Box>
				</Flex>
			</>
		)
	}

	return <div>ID needed! Please login or start a new session.</div>
}

export default Annotate
