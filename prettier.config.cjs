// @ts-check

/** @typedef {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig */
/** @typedef {import("prettier").Config} PrettierConfig */

/** @type { PrettierConfig | SortImportsConfig } */
const config = {
  arrowParens: "always",
  printWidth: 80,
  singleQuote: false,
  jsxSingleQuote: false,
  semi: true,
  trailingComma: "all",
  tabWidth: 2,
  plugins: [require.resolve("@ianvs/prettier-plugin-sort-imports")],
  importOrder: [
    "dotenv/config",
    "^(grammy/(.*)$)|^(grammy$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@/commands/(.*)$",
    "",
    "^@/constants/(.*)$",
    "",
    "^@/features/(.*)$",
    "",
    "^@/handlers/(.*)$",
    "",
    "^@/schemas/(.*)$",
    "",
    "^@/store/(.*)$",
    "",
    "^@/types/(.*)$",
    "",
    "^@/utils/(.*)$",
    "",
    "^@/(.*)$",
    "",
    "^[./]",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.0.0",
};

module.exports = config;
