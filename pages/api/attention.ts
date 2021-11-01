import type { NextApiRequest, NextApiResponse } from "next";
import { AttentionCheck } from "pages/annotate";
import _ from 'lodash'
import { Client } from "db/db";
import { update_attention_checks } from "db/queries";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
	if (req.method !== "POST") {
		res.status(405).end();
	}
	try {
		const { uid, checks }: AttentionCheck = req.body
		if (!uid || !checks) {
			res.status(400).end();
			return
		}
		const sortedChecks = _.sortBy(checks, ['imageID'])

		const variables = {
			uid,
			att_0: sortedChecks[0].pass,
			att_1: sortedChecks[1].pass,
			att_2: sortedChecks[2].pass,
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

