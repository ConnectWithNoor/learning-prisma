import { fetchAllPosts } from "./actions/posts";
import { getUsersByName } from "./actions/users";

export default async function Home() {
  const users = await getUsersByName("John");

  return users.map((post) => {
    return (
      <div key={post.id} className="text-black">
        {post.name} - {post.email}
      </div>
    );
  });
}
