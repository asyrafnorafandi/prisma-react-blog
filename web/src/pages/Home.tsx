import { useEffect, useState } from 'react';
import { PostCard } from '../components';
import { PostsWithAuthor } from '../interfaces';
import { PostApi } from '../providers';

export function Home() {
  const [posts, setPosts] = useState<PostsWithAuthor[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const { data } = await PostApi.list();
      setPosts(data);

      console.log(posts);
    } catch (e) {}
  }

  if (posts) {
    return (
      <div className="flex flex-wrap justify-evenly">
        {posts.map(p => {
          return (
            <div className="flex-initial" key={p.id}>
              <PostCard {...p}></PostCard>
            </div>
          );
        })}
      </div>
    );
  }

  return <div>Loading...</div>;
}
