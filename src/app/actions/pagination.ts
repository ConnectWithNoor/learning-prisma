"use server";

import { db } from "../../../lib/db";

// size of the page = 10

const offsetPagination = async (
  pageSize: number = 10,
  pageNumber: number = 1
) => {
  const posts = await db.post.findMany({
    // skip: 0,
    // take: 10,  // on first fetch
    // skip: 10,
    // take: 10, // on second fetch

    skip: (pageNumber - 1) * pageSize, // user is on page 3 but we want to skip first 20 to get from 21 to 30 records
    take: pageSize,
  });
};

const cursorPagination = async (cursor: number = 0, pageSize: number = 10) => {
  // cursor based pagination is good on performance as it doesn't need to skip records
  //   to use cursor, data must be sorted, or first sort the result by Orderby and then use cursor

  const posts = await db.post.findMany({
    cursor: {
      id: cursor, // starts from this point, post with Id 0 by default.
    },
    take: pageSize,
  });
};

export { offsetPagination, cursorPagination };
