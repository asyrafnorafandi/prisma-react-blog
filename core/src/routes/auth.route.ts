import { Router } from 'express';
import { AuthController } from '../controllers';

const router = Router();

/**
 * POST /auth/login
 * User login
 */
router.post('/login', async (req, res, next) => {
  const authController = new AuthController();
  try {
    const data = await authController.login(req.body);
    res.send(data);
  } catch (e) {
    next(e);
  }
});

export default router;
