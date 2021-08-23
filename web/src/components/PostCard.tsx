import { PostCardData, PostsWithAuthor } from '../interfaces';
import moment from 'moment';

export function PostCard(data: PostsWithAuthor) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md m-3 max-w-md transition duration-200 hover:shadow-2xl">
      <div className="my-2 flex justify-between items-center">
        <div className="bg-blue-400 text-white p-2 rounded capitalize">{data.categories[0].category.name}</div>
        <div className="text-gray-500">{moment(data.createdAt).fromNow()}</div>
      </div>
      <div className="my-4 text-2xl font-bold truncate ...">{data.title}</div>
      <div className="my-4 line-clamp-3">{data.content}</div>
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
