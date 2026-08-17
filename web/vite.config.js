import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // GitHub Pages serves project sites beneath /<repository-name>/.
  // Set GITHUB_PAGES=true when creating the static gh-pages branch.
  // Local development and independent static hosts continue to use /.
  base: process.env.GITHUB_PAGES === 'true' ? '/ultimate-phoenix-protocol-ssi/' : '/',
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
