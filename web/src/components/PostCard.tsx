import { PostsWithAuthor } from '../interfaces';
import moment from 'moment';
import { useRef, useState } from 'react';

export function PostCard(data: PostsWithAuthor) {
  const myRef: any = useRef(null);
  const [expand, setExpand] = useState({ width: '400px', height: '300px' });
  const [clamp, setClamp] = useState('line-clamp-3');
  const executeScroll = () => myRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });

  function toggleExpand() {
    if (expand.width === '400px') {
      setExpand({ width: '95vw', height: '95vh' });
      setTimeout(executeScroll, 300);
      setClamp('');
      document.body.style.overflow = 'hidden';
    } else {
      setExpand({ width: '400px', height: '300px' });
      setTimeout(executeScroll, 300);
      setClamp('line-clamp-3');
      document.body.style.overflow = 'scroll';
    }
  }

  return (
    <div
      className={`p-6 bg-white rounded-xl shadow-md m-3 transition-all duration-300 hover:shadow-2xl cursor-pointer`}
      style={expand}
      onClick={toggleExpand}
      ref={myRef}
    >
      <div className="my-2 flex justify-between items-center">
        <div className="bg-blue-400 text-white p-2 rounded capitalize">{data.categories[0].category.name}</div>
        <div className="text-gray-500">{moment(data.createdAt).fromNow()}</div>
      </div>
      <div className="my-4 text-2xl font-bold truncate ...">{data.title}</div>
      <div className={`my-4 ${clamp}`} dangerouslySetInnerHTML={{ __html: data.content }}></div>
      <div className="flex items-center my-4">
        <div className="mr-6">
          <img className="h-12 w-12 rounded-full" src={data.author.profile.avatar} alt="ChitChat Logo" />
        </div>
        <div>
          By <span className="text-blue-500 capitalize">{data.author.name}</span>
        </div>
      </div>
    </div>
  );
}
