import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  { ignores: ["dist", "node_modules"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      // The app intentionally starts async API synchronization from effects.
      // State updates are performed by the async callbacks, not during render.
      "react-hooks/set-state-in-effect": "off",
      // Context/provider and entry-point modules legitimately export non-components.
      "react-refresh/only-export-components": "off",
    },
  },
  {
    files: ["server/**/*.js", "vite.config.js"],
    languageOptions: {
      globals: globals.node,
    },
  },
];
