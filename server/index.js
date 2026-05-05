import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件
app.use(cors());
app.use(express.json());

// API路由
app.use('/api', apiRoutes);

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: '英语写作助手服务正常运行' });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`
  ======================================
  🚀 英语写作助手服务已启动
  📍 服务地址: http://localhost:${PORT}
  📡 API根路径: http://localhost:${PORT}/api
  ======================================
  `);
});
