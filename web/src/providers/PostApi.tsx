import axios from 'axios';
import { appConfig } from '../configs/Routes';
import { PostsWithAuthor } from '../interfaces';

function list() {
  return axios.get<PostsWithAuthor[]>(`${appConfig.API_URL}/posts`);
}

export default {
  list,
};
