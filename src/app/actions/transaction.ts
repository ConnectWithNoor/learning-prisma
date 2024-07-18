"use server";

import { db } from "../../../lib/db";

const performTransaction = async () => {
  // Simulating Transaction by transfering 5 likes from post with id 1 to post with id 2

  // we dont use await here because we want to run the update in a transaction
  const withdrawUpdate = db.post.update({
    where: {
      id: 1,
    },
    data: {
      noOfLikes: {
        decrement: 5,
      },
    },
  });

  const depositUpdate = db.post.update({
    where: {
      id: 2,
    },
    data: {
      noOfLikes: {
        increment: 5,
      },
    },
  });

  //   Now we created 2 opearations that will be run in a transaction
  const result = await db.$transaction([withdrawUpdate, depositUpdate]);

  return result;
};
