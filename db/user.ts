import { logger } from "utils/logger";
import { v4 as uuid } from "uuid";
import { Client, getAccumulatedSet, getRandomImageSet } from "./db";
import { add_user, get_user_info, increment_user_submissions } from "./queries";
import type { ImageInterface } from "./types";

interface User {
  id: string;
  next_index: number;
}

if (!process.env.NEXT_PUBLIC_ACCUMULATE_API_URL) {
  logger.error("NEXT_PUBLIC_ACCUMULATE_API_URL is not set");
  process.exit(1);
}

const isAccumulating = process.env.NEXT_PUBLIC_ACCUMULATE_API_URL == "true";

logger.info(`Using ${isAccumulating ? "accumulating" : "random"} API`);

const generateId = () => uuid();

export const createUser = async () => {
  const { images } = isAccumulating
    ? await getAccumulatedSet()
    : await getRandomImageSet();

  const payload: User & ImageInterface = {
    id: generateId(),
    next_index: 1,
    images,
  };

  const { data, errors } = await Client.mutate({
    mutation: add_user,
    variables: {
      uid: payload.id,
      ...payload,
    },
  });

  if (errors) {
    logger.error(errors);
    return null;
  }

  return { data };
};

export const inrementSubmissionIndex = async (uid: string) => {
  const payload = {
    id: uid,
  };

  const { data, errors } = await Client.mutate({
    mutation: increment_user_submissions,
    variables: payload,
  });

  if (errors) {
    logger.error(errors);
    return null;
  }

  return { data };
};

export const getUser = async (uid: string) => {
  const { data, error, errors } = await Client.query({
    query: get_user_info,
    variables: {
      id: uid,
    },
  });

  if (error || errors) {
    logger.error(error || errors);
    return null;
  }

  return { data };
};
