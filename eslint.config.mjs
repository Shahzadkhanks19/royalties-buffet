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
      // This app intentionally performs API synchronization in effects. Several
      // loaders and derived reservation-state effects have deliberately stable
      // trigger lists; forcing every referenced helper/object into dependencies
      // would create duplicate requests or unnecessary effect loops.
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/exhaustive-deps": "off",
      // Context/provider and application entry modules legitimately export or
      // contain non-component values alongside React components.
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
