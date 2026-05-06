import { callDashscopeAPI } from './dashscope.js';

export const searchQuestions = async (query, level = 'all') => {
  const systemPrompt = `你是一个英语写作题目专家，专门负责收集和整理四六级英语作文真题。
请根据用户的搜索需求，返回JSON格式的题目列表，包含以下字段：
- id: 唯一标识符
- year: 年份
- level: 考试级别，CET4 或 CET6
- topic: 题目主题
- type: 题目类型，argumentation (议论文), application (应用文), description (描述文)
- description: 题目详细描述
- requirements: 题目要求
- source: 题目来源

示例格式：
{
  "questions": [
    {
      "id": "1",
      "year": "2024",
      "level": "CET4",
      "topic": "The Importance of Reading",
      "type": "argumentation",
      "description": "Write an essay on the importance of reading",
      "requirements": "120-180 words, clear argument, examples",
      "source": "CET4真题，2024年6月"
    }
  ]
}
只返回JSON，不要其他内容。`;

  const levelDescription = level === 'all' ? '全部级别' : level === 'CET4' ? '四级' : '六级';
  
  const userPrompt = `请搜索${levelDescription}英语作文题目，搜索关键词是: ${query}

请返回JSON格式的结果。`;

  try {
    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ];

    const response = await callDashscopeAPI(messages);
    
    let result;
    try {
      result = JSON.parse(response);
    } catch (parseError) {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('无法解析AI返回的JSON');
      }
    }

    return result.questions || [];
  } catch (error) {
    console.error('题目搜索服务错误:', error);
    throw error;
  }
};
