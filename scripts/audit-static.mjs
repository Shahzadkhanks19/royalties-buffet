import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";

const roots = ["src", "server"];
const sourceExtensions = new Set([".js", ".jsx"]);
const failures = [];
const warnings = [];
let checkedSourceFiles = 0;

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(fullPath));
    else files.push(fullPath);
  }
  return files;
}

function addFailure(file, rule, detail) {
  failures.push({ file, rule, detail });
}

function addWarning(file, rule, detail) {
  warnings.push({ file, rule, detail });
}

for (const root of roots) {
  for (const file of await walk(root)) {
    const extension = extname(file);
    const display = relative(process.cwd(), file).replaceAll("\\", "/");

    if ([".ts", ".tsx"].includes(extension)) {
      addFailure(display, "no-typescript", "Project policy requires JavaScript/JSX only.");
      continue;
    }
    if (!sourceExtensions.has(extension)) continue;

    checkedSourceFiles += 1;
    const content = await readFile(file, "utf8");

    if (display.startsWith("src/") && /\sstyle\s*=\s*\{/.test(content)) {
      addFailure(display, "no-inline-css", "Use Tailwind utilities instead of JSX inline styles.");
    }
    if (display.startsWith("src/") && /window\.(alert|confirm|prompt)\s*\(/.test(content)) {
      addFailure(display, "no-native-dialogs", "Use the custom Royalties modal/UI system instead of browser dialogs.");
    }
    if (display.startsWith("src/") && /<select\b/i.test(content)) {
      addFailure(display, "no-native-select", "Use CustomSelect/AdminSelect instead of native select elements.");
    }
    if (display.startsWith("src/") && /<img\b(?![^>]*\balt=)[^>]*>/i.test(content)) {
      addFailure(display, "image-alt", "Every img element must include alt text.");
    }
    if (/console\.log\s*\(/.test(content) && !display.startsWith("server/")) {
      addWarning(display, "console-log", "Remove client-side debug logging before production.");
    }
  }
}

const packageJson = JSON.parse(await readFile("package.json", "utf8"));
for (const dependency of Object.keys(packageJson.dependencies || {})) {
  if (dependency.includes("typescript") || dependency === "ts-node") {
    addFailure("package.json", "no-typescript-dependency", `Unexpected TypeScript dependency: ${dependency}`);
  }
}

const result = {
  passed: failures.length === 0,
  failures,
  warnings,
  checkedSourceFiles,
};

console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exit(1);
