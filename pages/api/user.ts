import { getUser } from "db/user";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const id = req.query.id;
  if (!id) {
    res.status(400).json({
      message: "id is required",
    });
    return;
  }

  const result = await getUser(id as string);
  if (!result) {
    res.status(404).json({
      message: "user not found",
    });
    return;
  }

  res.status(200).json({ data: result.data });
};

export default handler;
