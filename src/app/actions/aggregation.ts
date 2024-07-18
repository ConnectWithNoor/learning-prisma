"use server";

import { db } from "../../../lib/db";

const count = async () => {
  const aggregate = await db.post.aggregate({
    _sum: {
      noOfLikes: true,
    },
  });
};

export { count };
