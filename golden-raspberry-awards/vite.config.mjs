import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  resolve: {
    alias: {
      '@/app': '/src/app',
      '@/assets': '/src/assets',
      '@/components': '/src/components',
      '@/features': '/src/features',
      '@/hooks': '/src/hooks',
      '@/pages': '/src/pages',
      '@/routes': '/src/routes',
      '@/themes': '/src/themes',
      '@/styles': '/src/styles',
      '@/utils': '/src/utils',
      '@/services': '/src/services',
      '@/config': '/src/config',
      '@/types': '/src/types',
      '@/store': '/src/store',
      '@/layouts': '/src/layouts',
      '@/data': '/src/data',
      '@/helper': '/src/helper',
      '@/i18n': '/src/i18n',
    },
  },
})
