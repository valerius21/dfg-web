import type { NextApiRequest, NextApiResponse } from 'next'
import { addSubmission } from '../../db/db'
import type { Submission } from '../../db/submission'


const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
	if (req.method !== 'POST') {
		res.status(405).end()
	}
	const subm: Submission = req.body
	try {
		const result = await addSubmission(subm)
		if (!result.data) {
			res.status(400).json({ error: "Contradiction in demographic selection" })
		}

		return res.status(200).json(result)
	}
	catch (e) {
		res.status(500).end()
	}
}

export default handler