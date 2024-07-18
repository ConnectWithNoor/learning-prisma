"use server";

import { db } from "../../../lib/db";

async function fetchAllPosts() {
  const posts = await db.post.findMany({});

  return posts;
}

async function fetchFirstPost() {
  const post = await db.post.findFirst({});

  return post;
}

async function fetchPostById(id: number) {
  const post = await db.post.findUnique({
    where: {
      id: id,
    },
  });

  return post;
}

// find all post where title contains 'Github' OR 'Twitter' AND the post are published

async function fetchPostByCondition() {
  const posts = await db.post.findMany({
    where: {
      OR: [
        {
          title: {
            contains: "Github",
            mode: "insensitive", // case-insensitive search for the title
          },
        },
        {
          title: {
            contains: "Twitter",
          },
        },
      ],
      AND: {
        published: true,
      },
    },
  });
  return posts;
}

const fetchAllPostsByJohn = async () => {
  const posts = await db.post.findMany({
    where: {
      Author: {
        is: {
          name: "John",
        },
      },
    },
  });

  return posts;
};

export {
  fetchAllPosts,
  fetchFirstPost,
  fetchPostById,
  fetchPostByCondition,
  fetchAllPostsByJohn,
};
