import { Router } from 'express';
import { PostController } from '../controllers';

const router = Router();

/**
 * GET /posts
 * List all public post
 */
router.get('/', async (req, res) => {
  const postController = new PostController();
  const data = await postController.list();
  res.send(data);
});

/**
 * GET /posts/:id
 * Get data of specific public post
 */
router.get('/:id', async (req, res) => {
  const postController = new PostController();
  const data = await postController.get(req.params.id);
  res.send(data);
});

export default router;
