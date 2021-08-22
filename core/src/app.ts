import express from 'express';
import { PostRoutes } from './routes';

// Configs
const app = express();
const PORT = 8000;

// Register routes
app.get('/', (req, res) => res.send('Express + TypeScript Server'));
app.use('/posts', PostRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
