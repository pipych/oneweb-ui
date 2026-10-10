import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function inlineCssPlugin(): Plugin {
  return {
    name: 'inline-css-plugin',
    apply: 'build',
    enforce: 'post',
    transformIndexHtml(html, { bundle }) {
      if (!bundle) return html;
      let cssContent = '';
      for (const [fileName, asset] of Object.entries(bundle)) {
        if (fileName.endsWith('.css') && 'source' in asset) {
          cssContent += asset.source;
          delete bundle[fileName];
        }
      }
      if (!cssContent) return html;
      // Remove external stylesheet link tags
      const cleanHtml = html.replace(/<link rel="stylesheet"[^>]*href="[^"]*\.css"[^>]*>/g, '');
      // Inject CSS directly into HTML head
      return cleanHtml.replace('</head>', `<style id="oneweb-inlined-css">\n${cssContent}\n</style></head>`);
    },
  };
}

export default defineConfig({
  plugins: [react(), inlineCssPlugin()],
  resolve: {
    alias: {
      '@one/web-ui': path.resolve(__dirname, './src/design-system'),
      '@': path.resolve(__dirname, './src'),
    },
  },
});
