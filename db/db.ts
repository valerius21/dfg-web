import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client/core"
import fetch from 'cross-fetch'
import _ from "lodash"
import { aggregation, insert_submission, private_images_query, public_images_query } from "./queries"
import { exp_is_uuid_private } from "./exp_submission"
import { checkSubmission, Submission } from "./submission"
import { ImageInterface } from "./types"


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

export const getRandomImageSet = async (): Promise<ImageInterface> => {
	let privateImages = await getPrivateImages()
	let publicImages = await getPublicImages()

	privateImages = _.shuffle(_.uniqBy(privateImages, 'id'))
	publicImages = _.shuffle(_.uniqBy(publicImages, 'id'))

	privateImages = _.take(privateImages, 50)
	publicImages = _.take(publicImages, 50)

	let randoms = _.shuffle([...privateImages, ...publicImages])

	if (randoms.length < 100) {
		throw new Error("Less than 100 images!");
	}

	randoms = randoms.map((image: any) => {
		const url = `${IMAGE_SERVER}/${image.__typename === 'private' ? 'private' : 'public'}/${image.filename}`
		const id = image.id

		return {
			id,
			url
		}
	})

	return { images: randoms }
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

export const getAccumulatedSet = async (): Promise<ImageInterface> => {
	const { data: doc } = await Client.query({
		query: aggregation
	})

	const { private: priv, public: publ } = doc

	// get all images
	let privateImages = await getPrivateImages()
	let publicImages = await getPublicImages()

	// filter for 1 <= submissions <= 40
	let _private = priv.filter((image: any) => (image.submissions_aggregate.aggregate.count) <= 40 && 1 <= image.submissions_aggregate.aggregate.count)
	let _public = publ.filter((image: any) => (image.submissions_aggregate.aggregate.count) <= 40 && 1 <= image.submissions_aggregate.aggregate.count)

	// add the rest of the list to the filtered ones [<filtered>, <rest>]
	_private = _private.concat(priv)
	_public = _public.concat(publ)

	// take the first 50
	_private = _.take(_private, 50)
	_public = _.take(_public, 50)

	// check for uniqueness
	_private = _.uniqBy(_private, 'id')
	_public = _.uniqBy(_public, 'id')

	// shuffle all images
	privateImages = _.shuffle(privateImages)
	publicImages = _.shuffle(publicImages)

	// concatinate randoms with uniques
	_private = _private.concat(privateImages)
	_public = _public.concat(publicImages)

	// take the first 50
	_private = _.take(_private, 50)
	_public = _.take(_public, 50)

	// check for uniqueness
	_private = _.uniqBy(_private, 'id')
	_public = _.uniqBy(_public, 'id')

	if (_private.length < 50 || _public.length < 50) {
		throw new Error("Less than 50 images!")
	}

	const res = _.shuffle([..._private, ..._public]).map(async image => {
		return {
			id: image.id,
			url: await determineURL(image.id, privateImages, publicImages)
		}
	})

	return { images: await Promise.all(res) }
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