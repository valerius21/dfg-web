import type { NextApiRequest, NextApiResponse } from 'next'
import { getAccumulatedSet } from '../../db/db'

type Data = {
	images: {
		id: string
		url: string
	}[]
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	res.status(200).json({
		images: await getAccumulatedSet()
	})
}

export default handler
