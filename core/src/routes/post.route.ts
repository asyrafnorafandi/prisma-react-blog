import { Router } from 'express';
import { PostController } from '../controllers';

const router = Router();

router.get('/', async (req, res) => {
  const postController = new PostController();
  const data = await postController.get();
  res.send(data);
});

export default router;
