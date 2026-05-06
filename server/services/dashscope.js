import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const callDashscopeAPI = async (messages, model = 'qwen-plus') => {
  const apiKey = process.env.DASHSCOPE_API_KEY;
  const baseUrl = process.env.DASHSCOPE_BASE_URL;
  
  if (!apiKey || apiKey === 'your_api_key_here') {
    throw new Error('请先配置阿里云百炼API密钥');
  }

  try {
    const response = await axios.post(baseUrl, {
      model: model,
      messages: messages,
      temperature: 0.7,
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('调用阿里云百炼API错误:', error.response?.data || error.message);
    throw new Error(`API调用失败: ${error.message}`);
  }
};
