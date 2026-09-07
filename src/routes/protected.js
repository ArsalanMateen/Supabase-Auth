import { Router } from 'express';

const router = Router();

// GET /protected/profile
router.get('/profile', (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access token required' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  return res.status(200).json({
    message: 'Access token received',
    token_preview: `${token.substring(0, 10)}...`,
  });
});

export default router;
