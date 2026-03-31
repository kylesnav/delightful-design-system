/**
 * Delightful Design System — Central Token Engine
 *
 * Extracts OKLCH tokens from delightful-design-system.html and provides
 * them as a structured object with Hex and RGB equivalents.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { formatHex, parse, clampChroma } from 'culori';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const HTML_FILE = path.join(ROOT_DIR, 'delightful-design-system.html');

/**
 * Converts an OKLCH string to Hex.
 * Handles both plain 'oklch(...)' and 'oklch(...) / alpha' formats.
 */
export function toHex(oklchStr) {
  if (!oklchStr) return null;

  // Handle CSS variable references (e.g., var(--accent-primary))
  if (oklchStr.includes('var(')) {
    // Note: This resolver is simple and doesn't handle nested lookups.
    // Real-world implementation should resolve recursively.
    return oklchStr;
  }

  // Handle alpha shorthand (e.g. oklch(...) / 0.5)
  let alpha = 1;
  let cleanStr = oklchStr;
  if (oklchStr.includes('/')) {
    const parts = oklchStr.split('/');
    cleanStr = parts[0].trim();
    alpha = parseFloat(parts[1].trim());
  }

  const color = parse(cleanStr);
  if (!color) return oklchStr; // Fallback to raw string if parsing fails

  // Clamp to sRGB gamut and format as Hex
  const hex = formatHex(clampChroma(color, 'oklch'));

  // If we have alpha, append it to the hex (VSCode format)
  if (alpha < 1) {
    const a = Math.round(alpha * 255).toString(16).padStart(2, '0');
    return hex + a;
  }

  return hex;
}

/**
 * Extracts tokens from the source HTML.
 */
export function getTokens() {
  const html = fs.readFileSync(HTML_FILE, 'utf8');

  const tokens = {
    primitives: {},
    semantic: {
      light: {},
      dark: {}
    },
    component: {}
  };

  // --- Regex extraction ---
  // Primitives
  const primitiveRegex = /--primitive-([a-z0-9-]+):\s*(oklch\([^;]+\));/g;
  let match;
  while ((match = primitiveRegex.exec(html)) !== null) {
    const [_, name, val] = match;
    tokens.primitives[name] = {
      oklch: val,
      hex: toHex(val)
    };
  }

  // Semantic (Light)
  const semanticLightRegex = /(?::root|\[data-theme="light"\])[^\{]*\{([\s\S]*?)\n\s{4}\}/;
  const lightContent = html.match(semanticLightRegex)?.[1] || '';
  const lightVarRegex = /--([a-z0-9-]+):\s*([^;]+);/g;
  while ((match = lightVarRegex.exec(lightContent)) !== null) {
    const [_, name, val] = match;
    tokens.semantic.light[name] = {
      oklch: val.trim(),
      hex: toHex(val.trim())
    };
  }

  // Semantic (Dark)
  const semanticDarkRegex = /\[data-theme="dark"\]\s*\{([\s\S]*?)\n\s{4}\}/;
  const darkContent = html.match(semanticDarkRegex)?.[1] || '';
  const darkVarRegex = /--([a-z0-9-]+):\s*([^;]+);/g;
  while ((match = darkVarRegex.exec(darkContent)) !== null) {
    const [_, name, val] = match;
    tokens.semantic.dark[name] = {
      oklch: val.trim(),
      hex: toHex(val.trim())
    };
  }

  // Component
  const componentRegex = /@layer component\s*\{\s*:root\s*\{([\s\S]*?)\n\s{4}\}/;
  const componentContent = html.match(componentRegex)?.[1] || '';
  const componentVarRegex = /--([a-z0-9-]+):\s*([^;]+);/g;
  while ((match = componentVarRegex.exec(componentContent)) !== null) {
    const [_, name, val] = match;
    // Skip common non-color tokens if we only want colors, or include everything
    tokens.component[name] = {
      value: val.trim(),
      hex: val.trim().includes('oklch') ? toHex(val.trim()) : null
    };
  }

  return tokens;
}

// If run directly, output the tokens as JSON
if (process.argv[1] === import.meta.url) {
  console.log(JSON.stringify(getTokens(), null, 2));
}
