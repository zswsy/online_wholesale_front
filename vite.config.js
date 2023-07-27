import { defineConfig } from 'vite'
// import { createVuePlugin } from 'vite-plugin-vue2'
import vue from '@vitejs/plugin-vue2'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/dist/',
  build: {
    chunkSizeWarningLimit:1500,
    rollupOptions: {
        output:{
            manualChunks(id) {
              if (id.includes('node_modules')) {
                
                  return id.toString().split('node_modules/')[1].split('/')[0].toString();
              }
          }
        }
    }
  },
  css:{
    preprocessorOptions:{
      scss:{
        additionalData: '@import "./src/style/styleConfig.scss";'
      }
    }
  },
  plugins: [
    vue()
  ],
  resolve:{
    alias:{
      '@':path.join(__dirname,'src')
    }
  }
})
