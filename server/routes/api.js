import express from 'express';
import { polishEssay } from '../services/polishService.js';
import { searchQuestions } from '../services/questionService.js';

const router = express.Router();

// 作文润色接口
router.post('/polish', async (req, res) => {
  try {
    const { essay, question } = req.body;

    if (!essay || !question) {
      return res.status(400).json({
      error: '请提供作文内容和题目'
    });
    }

    const result = await polishEssay(essay, question);
    res.json(result);
  } catch (error) {
    console.error('润色接口错误:', error);
    res.status(500).json({
      error: error.message || '作文润色失败，请稍后重试'
    });
  }
});

// 题目搜索接口
router.get('/questions', async (req, res) => {
  try {
    const { q, level = 'all' } = req.query;
    const questions = await searchQuestions(q || '', level);
    res.json({ questions });
  } catch (error) {
    console.error('题目搜索接口错误:', error);
    res.status(500).json({
      error: error.message || '题目搜索失败，请稍后重试'
    });
  }
});

export default router;
