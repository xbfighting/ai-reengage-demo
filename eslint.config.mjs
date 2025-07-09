import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // 放宽 TypeScript 规则
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off", 
      "@typescript-eslint/no-empty-object-type": "off",
      
      // 放宽 React 规则
      "react-hooks/exhaustive-deps": "warn",
      
      // 放宽其他规则
      "prefer-const": "warn",
      "no-unused-vars": "off",
      
      // 允许console.log在开发环境
      "no-console": "off",
    },
  },
];

export default eslintConfig;