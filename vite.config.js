// SPDX-FileCopyrightText: 2024 The Forkbomb Company
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { defineConfig } from "vite";
import UnoCSS from "unocss/vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import fs from 'fs';
import path from 'path';

const manifestPath = path.resolve(__dirname, 'src/manifest.json');
const manifestJSON = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const serviceWorkerPath = path.resolve(__dirname, 'src/service-worker.js');
const serviceWorkerCode = fs.readFileSync(serviceWorkerPath, 'utf8');

export default defineConfig({
  plugins: [UnoCSS(), viteSingleFile(), {
      name: 'inline-manifest',
      transformIndexHtml(html) {
        return html.replace(
          '</head>',
          `<script type="application/manifest+json">
            ${JSON.stringify(manifestJSON)}
            </script>
          </head>`
        );
      }},
      {
      name: 'inline-service-worker',
      apply: 'build',
      transformIndexHtml(html) {
        return html.replace(
          '</body>',
          `
          <script>
            if ('serviceWorker' in navigator) {
              const swCode = \`${serviceWorkerCode.replace(/`/g, '\\`')}\`;
              const blob = new Blob([swCode], { type: 'application/javascript' });
              const swURL = URL.createObjectURL(blob);
              navigator.serviceWorker.register(swURL)
                .then(() => console.log('[Service Worker] Registered successfully'))
                .catch((err) => console.error('[Service Worker] Registration failed', err));
            }
          </script>
          </body>`
        );
      }}],
});
