import { defineConfig } from "eslint/config";
import next from "eslint-config-next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig([{
    extends: [...next],
}, {
    rules: {
        "no-irregular-whitespace": "error",
        "no-restricted-syntax": ["error", {
            selector: "Literal[value=/\\u2014|\\u2013/]",
            message: "Em dash and en dash are forbidden. Use hyphen - instead."
        }]
    }
}]);
