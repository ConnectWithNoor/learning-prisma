"use server";

import { db } from "../../../lib/db";

// find all users where name contains {name} OR all users where id is less than 2 but all such users email must contains '@gmail.com'
const getUsersByName = async (name: string) => {
  const users = await db.user.findMany({
    where: {
      OR: [
        {
          name: {
            contains: name,
          },
        },
        {
          id: {
            not: {
              gt: 2,
            },
          },
        },
      ],
      AND: [
        {
          email: {
            contains: "@gmail.com",
          },
        },
      ],
    },
  });

  return users;
};

const getUsersWithPost = async (title: string) => {
  // find all users who have at least one post
  const users = await db.user.findMany({
    where: {
      Posts: {
        some: {},
      },
    },
  });

  return users;
};

export { getUsersByName, getUsersWithPost };
