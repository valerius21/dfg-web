import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client/core"
import fetch from 'cross-fetch'
import _ from "lodash"
import { aggregation, insert_submission, private_images_query, public_images_query } from "./queries"
import { exp_is_uuid_private } from "./exp_submission"
import { checkSubmission, Submission } from "./submission"


if (!process.env.NEXT_GRAPHQL_URL) {
	console.error("GRAPHQL_URL is not set")
	process.exit(1)
}

if (!process.env.NEXT_IMAGE_SERVER) {
	console.error("IMAGE_SERVER is not set")
	process.exit(1)
}

const GRAPHQL_URL: string = process.env.NEXT_GRAPHQL_URL
const IMAGE_SERVER: string = process.env.NEXT_IMAGE_SERVER


export const Client = new ApolloClient({
	link: new HttpLink({ uri: GRAPHQL_URL, fetch }),
	cache: new InMemoryCache(),
})

export const getPrivateImages = async () => {
	const { data } = await Client.query({
		query: private_images_query
	})
	return data.private
}

export const getPublicImages = async () => {
	const { data } = await Client.query({
		query: public_images_query
	})
	return data.public
}

export const getRandomImageSet = async () => {
	let privateImages = await getPrivateImages()
	let publicImages = await getPublicImages()

	privateImages = _.shuffle(privateImages)
	publicImages = _.shuffle(publicImages)

	privateImages = _.take(privateImages, 50)
	publicImages = _.take(publicImages, 50)

	let randoms = _.shuffle([...privateImages, ...publicImages])

	randoms = randoms.map((image: any) => {
		const url = `${IMAGE_SERVER}/${image.__typename === 'private' ? 'private' : 'public'}/${image.filename}`
		const id = image.id

		return {
			id,
			url
		}
	})

	return randoms
}

const determineURL = async (uuid: string, privateImages: any[], publicImages: any[]): Promise<string> => {
	const isPrivate = await exp_is_uuid_private(uuid)

	if (isPrivate) {
		const { filename } = privateImages.find((image: any) => image.id === uuid)
		return `${IMAGE_SERVER}/private/${filename}`
	}
	const { filename } = publicImages.find((image: any) => image.id === uuid)
	return `${IMAGE_SERVER}/public/${filename}`
}

export const getAccumulatedSet = async () => {
	const { data: doc } = await Client.query({
		query: aggregation
	})
	const { private: priv, public: publ } = doc

	let _private = priv.filter((image: any) => (image.submissions_aggregate.aggregate.count) <= 40 && 1 <= image.submissions_aggregate.aggregate.count)
	let _public = publ.filter((image: any) => (image.submissions_aggregate.aggregate.count) <= 40 && 1 <= image.submissions_aggregate.aggregate.count)

	_private = _private.concat(priv)
	_public = _public.concat(publ)

	_private = _.take(_private, 50)

	const privateImages = await getPrivateImages()
	const publicImages = await getPublicImages()

	_public = _.take(_public, 50)

	const res = _.shuffle([..._private, ..._public]).map(async image => {
		return {
			id: image.id,
			url: await determineURL(image.id, privateImages, publicImages)
		}
	})

	return Promise.all(res)
}

const insertSubmission = async (submission: Submission) => {
	const isPrivate = await exp_is_uuid_private(submission.id)
	let publicID = null, privateID = null

	if (isPrivate) {
		privateID = submission.id
	} else {
		publicID = submission.id
	}

	const values = {
		...submission,
		private_picture: privateID,
		public_picture: publicID,
		is_private: isPrivate
	}

	console.log(values)

	return await Client.mutate({
		mutation: insert_submission,
		variables: values
	})
}


export const addSubmission = async (submission: Submission): Promise<any> => {
	if (!checkSubmission(submission)) {
		return new Error("Invalid submission")
	}
	try {
		return await insertSubmission(submission)
	} catch (e) {
		console.error(e)
		return e
	}

}