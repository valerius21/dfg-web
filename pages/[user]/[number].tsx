import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { Flex, Box, Spinner, Center, useColorModeValue, Image } from "@chakra-ui/react";
import Progress from '../../components/Progress'
import Form from '../../components/Form'
import { useQuery } from 'react-query';
import { config } from 'config';

const Eval: FC<any> = () => {
	const router = useRouter()
	const colorMode = useColorModeValue('white', 'gray.800')
	const { user, number } = router.query
	const { isLoading, error, data } = useQuery('images', () => {
		return fetch(`${config.API_URL}/api/images/${user}`).then(res => res.json())
	})

	if (isLoading) {
		return <Center mt="24">
			<Spinner size="xl" />
		</Center>
	}


	if (!user || !number || error || !data) {
		console.error('Invalid site parameters!', { user, number })
		return <pre>{JSON.stringify(error)}</pre>
	}

	return (
		<>
			<Progress value={+number} isLoading={isLoading} />
			<Flex w="full" alignItems="center" justifyContent="center">
				<Box
					bg={colorMode}
					w="lg"
					maxW="xl"
					borderWidth="1px"
					rounded="lg"
					shadow="lg"
					mt={5}
					position="relative">
					<Center p={5}>
						{
							isLoading ? <Spinner size="xl" /> :
								// eslint-disable-next-line @next/next/no-img-element
								<Image boxShadow={'md'} borderRadius={'md'} src={data.images[+number - 1].gwdg_url} alt="image" />
						}
					</Center>
					<Form uid={user as string} isPrivate={data.images[+number - 1].is_private} imageID={data.images[+number - 1].image_id} pageNumber={+number} />
				</Box>
			</Flex>
		</>
	)
}

export default Eval
