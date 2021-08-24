import express from 'express';
import cors from 'cors';
import { AuthRoutes, PostRoutes } from './routes';

// Configs
const app = express();
const PORT = 8000;

// Middlewares
app.use(
  cors({
    origin: '*',
  }),
);
app.use(express.json());

// Register routes
app.get('/', (req, res) =>
  res.send({
    message: 'Server health 😉',
  }),
);
app.use('/posts', PostRoutes);
app.use('/auth', AuthRoutes);

// Error handling
app.use((err, req, res, next) => {
  res.status(500).send({
    message: err.message,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
