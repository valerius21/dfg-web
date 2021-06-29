import axios from 'axios'
import { useRouter } from 'next/router'
import Link from 'next/link'
import React, { FC } from 'react'
import { GetServerSideProps } from 'next'
import { Flex, Box, Image, useColorModeValue } from "@chakra-ui/react";
import Progress from '../../components/Progress'

const fetcher = (url: string, uid: string) => axios.post(url, { uid }).then(res => res.data)

export const getServerSideProps: GetServerSideProps = async context => {
	const images = [
		'https://live.staticflickr.com/4008/4376990620_04506b9d6a.jpg',
		'https://live.staticflickr.com/4010/4376814188_366039075a.jpg',
	]
	return {
		props: {
			imgURL: images[Math.round(Math.random())],
			value: Math.floor(Math.random() * 100)
		}
	}
}

const Eval: FC<any> = ({ imgURL, value }) => {
	const router = useRouter()
	const { user, number } = router.query
	if (!user || !number) {
		console.error('Invalid site parameters!', { user, number })
		return <></>
	}
	return (
		<>
			<Progress value={+number} />
			<Flex p={50} w="full" alignItems="center" justifyContent="center">

				<Box
					bg={useColorModeValue('white', 'gray.800')}
					maxW="sm"
					borderWidth="1px"
					rounded="lg"
					shadow="lg"
					position="relative">
					<Image
						src={imgURL}
						alt={`Picture of a based thing`}
						roundedTop="lg"
					/>
					<pre>{JSON.stringify({ user, number, value, imgURL }, null, 2)}</pre>
					{(+number < 100 ? <Link href={{
						pathname: '/[user]/[number]',
						query: {
							user,
							number: (+number) + 1
						}
					}}>
						Continue
					</Link> : <Link href="/done">Continue</Link>)}

				</Box>
			</Flex>
		</>
	)
}

export default Eval
