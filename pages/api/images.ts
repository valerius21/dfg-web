import { createUser } from "db/user";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (_req: NextApiRequest, res: NextApiResponse<any>) => {
  const result = await createUser();
  if (!result) {
    res.status(500).send("error");
    return;
  }
  res.status(200).json(result);
};

export default handler;
