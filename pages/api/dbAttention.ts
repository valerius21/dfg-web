import type { NextApiRequest, NextApiResponse } from "next";
import { Client } from "db/db";
import { db_attention_state } from "db/queries";
import { logger } from "utils/logger";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
	if (req.method !== "GET") {
		res.status(405).end();
		return;
	}

	const uid = req.query.uid as string;

	if (!uid) {
		res.status(400).end();
		return;
	}

	const { data, error } = await Client.query({
		query: db_attention_state,
		variables: {
			uid: req.query.uid,
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

	res.status(200).json({
		data: users_by_pk,
	})
}

export default handler;

