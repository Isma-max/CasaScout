import { defineConfig } from 'astro/config';

// build.format "file" genera somos.html, blog.html, etc.: las URLs son las mismas del sitio estático original.
export default defineConfig({
  build: { format: 'file' },
  trailingSlash: 'never',
});
