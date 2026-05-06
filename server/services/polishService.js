import { callDashscopeAPI } from './dashscope.js';

export const polishEssay = async (essay, question) => {
  const systemPrompt = `你是一个专业的英语写作助手，帮助用户润色英语作文，特别是针对四六级考试的写作要求。
请返回JSON格式的结果，包含以下字段：
- wordSuggestions: 高级词汇替换建议，数组，每个对象包含 original, suggestion, meaning, examples, position
- sentenceSuggestions: 高级句式替换建议，数组，每个对象包含 original, suggestion, explanation, examples
- overallFeedback: 整体评价，中文
- polishedText: 润色后的完整作文

示例格式：
{
  "wordSuggestions": [
    {
      "original": "very important",
      "suggestion": "crucial",
      "meaning": "极其重要的，关键的",
      "examples": ["Reading is crucial for personal growth", "This decision is crucial for our future"],
      "position": { "start": 0, "end": 12 }
    }
  ],
  "sentenceSuggestions": [
    {
      "original": "I think reading is important.",
      "suggestion": "From my perspective, reading holds great significance.",
      "explanation": "使用更正式的表达和句式",
      "examples": ["From my perspective, this is a valuable opportunity"]
    }
  ],
  "overallFeedback": "这篇作文结构清晰，观点明确。建议多使用高级词汇和复杂句式来提升文章质量。",
  "polishedText": "润色后的完整作文内容"
}
只返回JSON，不要其他内容。`;

  const userPrompt = `请润色以下英语作文：
作文题目: ${question}
用户作文: ${essay}

请返回JSON格式的润色结果。`;

  try {
    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ];

    const response = await callDashscopeAPI(messages);
    
    // 尝试解析JSON响应
    let result;
    try {
      result = JSON.parse(response);
    } catch (parseError) {
      // 如果解析失败，尝试从响应中提取JSON部分
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('无法解析AI返回的JSON');
      }
    }

    return result;
  } catch (error) {
    console.error('作文润色服务错误:', error);
    throw error;
  }
};
