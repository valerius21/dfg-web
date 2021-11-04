import type { NextApiRequest, NextApiResponse } from "next";
import { AttentionCheck } from "pages/annotate";
import _ from 'lodash'
import { Client } from "db/db";
import { db_attention_state, update_attention_checks } from "db/queries";
import { logger } from "utils/logger";

const oldAttention = async (uid: string, req: NextApiRequest, res: NextApiResponse) => {
	const { data, error } = await Client.query({
		query: db_attention_state,
		variables: {
			uid
		}
	})

	if (error) {
		logger.error(error);
		res.status(500).end();
		return;
	}

	const { users_by_pk } = data;

	if (!users_by_pk) {
		logger.error("No user found");
		res.status(500).end();
		return;
	}

	return {
		data: users_by_pk,
	}
}

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
	if (req.method !== "POST") {
		res.status(405).end();
	}
	try {
		const { uid, checks }: AttentionCheck = req.body
		const { page } = req.body
		const currentPage = page as number

		// get old attention checks
		const oldAttentionChecks = await oldAttention(uid, req, res)

		logger.info(`Page: ${page}`)

		if (!uid || !checks || !page || !oldAttentionChecks) {
			res.status(400).end();
			return
		}

		const { data: oldChecks } = oldAttentionChecks

		const sortedChecks = _.sortBy(checks, ['imageID'])

		const payload = {
			uid,
			...oldChecks,
			// att_0: sortedChecks[0].pass,
			// att_1: sortedChecks[1].pass,
			// att_2: sortedChecks[2].pass,
		}

		let variables

		if (currentPage === 25) {
			variables = {
				...payload,
				att_0: sortedChecks[0].pass
			}
		} else if (currentPage === 50) {
			variables = {
				...payload,
				att_1: sortedChecks[1].pass
			}
		} else if (currentPage === 75) {
			variables = {
				...payload,
				att_2: sortedChecks[2].pass
			}
		} else {
			variables = {
				...payload,
			}
		}

		const { errors, data } = await Client.mutate({
			mutation: update_attention_checks,
			variables,
		})

		if (errors) {
			res.status(500).json({ errors })
			return
		}

		res.json({ data })
	} catch (e) {
		res.status(500).end();
	}
};

export default handler;

