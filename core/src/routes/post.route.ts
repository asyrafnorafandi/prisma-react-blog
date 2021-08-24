import { Router } from 'express';
import { PostController } from '../controllers';

const router = Router();

/**
 * GET /posts
 * List all public post
 */
router.get('/', async (req, res, next) => {
  const postController = new PostController();
  try {
    const data = await postController.list();
    return res.send(data);
  } catch (e) {
    return next(e);
  }
});

/**
 * GET /posts/:id
 * Get data of specific public post
 */
router.get('/:id', async (req, res, next) => {
  const postController = new PostController();
  try {
    const data = await postController.get(req.params.id);
    return res.send(data);
  } catch (e) {
    return next(e);
  }
});

export default router;
