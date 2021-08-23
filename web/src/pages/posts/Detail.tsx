import { useEffect, useState } from 'react';
import { PostsWithAuthor } from '../../interfaces';

export function PostDetail({ id }: { id: string }) {
  const [post, setPost] = useState<PostsWithAuthor>();

  useEffect(() => {}, []);

  async function fetchPostData() {}

  return <div>Post Data</div>;
}
