import axios from 'axios'
import { useRouter } from 'next/router'
import Link from 'next/link'
import React, { FC } from 'react'
import { GetServerSideProps } from 'next'
import Progress from '../../components/Progress'

const fetcher = (url: string, uid: string) => axios.post(url, { uid }).then(res => res.data)

export const getServerSideProps: GetServerSideProps = async context => {
	return {
		props: {
			imgURL: Math.random(),
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
		<div>
			<Progress value={+number} />
			<pre>{JSON.stringify({ user, number, value, imgURL })}</pre>
			{(+number < 100 ? <Link href={{
				pathname: '/[user]/[number]',
				query: {
					user,
					number: (+number) + 1
				}
			}}>
				Continue
			</Link> : <Link href="/done">Continue</Link>)}
		</div>
	)
}

export default Eval
