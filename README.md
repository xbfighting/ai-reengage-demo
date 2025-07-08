# AI ReEngage Demo

AI驱动的个性化复购邮件营销系统
🧠 基于用户画像 + 手术历史 + 场景构建，自动生成高质量营销文案

👉 在线预览：[Vercel 部署地址](https://ai-reengage-demo-an6t.vercel.app/)

GitHub: <https://github.com/xbfighting/ai-reengage-demo>

---

## ✨ 项目背景

本项目是为一家聚焦美国医美市场的垂类AI SaaS创业项目所设计的 PoC Demo，目标是展示 AI 如何根据用户行为特征和医疗历史生成“千人千面”的营销邮件，提升复购率。

---

## 🎯 Demo 展示功能

| 模块 | 描述 |
|------|------|
| ✅ 用户画像输入 | 模拟用户：性别、年龄、个性标签、手术历史 |
| ✅ 快速模板切换 | 提供多组典型用户：怕老、重颜值、攀比、极简理性等 |
| ✅ 营销场景切换 | 支持复购提醒 / 新品推荐 / 节日祝福等不同生成策略 |
| ✅ 自动生成文案 | 使用 GPT-4 API 生成高度个性化邮件 |
| ✅ 邮件评分预测 | 模拟“复购潜力评分”，展示AI判断力 |
| ✅ Prompt 调试查看 | 实时展示完整Prompt内容，便于产品策略优化 |
| ✅ 复制 & 使用 | 支持一键复制文案，后续可扩展导出/发送邮件功能 |

---

## 🧠 技术栈

- **Next.js 14 App Router + Tailwind CSS**
- **OpenAI GPT-4 API**
- **TypeScript**
- **Node.js API Route**
- 可扩展集成：FAISS、Pinecone、LangChain、SMTP邮件发送等

---

## 📦 本地运行方式

```bash
git clone https://github.com/xbfighting/ai-reengage-demo.git
cd ai-reengage-demo
npm install
# 设置环境变量
echo "OPENAI_API_KEY=sk-xxx" > .env.local
npm run dev
