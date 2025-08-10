import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'axios',
      'moment',
      'react-icons'
    ],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true
    },
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          charts: ['recharts'],
          icons: ['react-icons']
        }
      }
    }
  },
  server: {
    port: 5173,
    host: true
  },
  preview: {
    port: 5173,
    host: true
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  }
})











// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   optimizeDeps: {
//     exclude: ['__vite__injectQuery'],
//     entries: [],
//     include: ['react', 'react-dom', 'react-router-dom', 'axios',
//       'moment',
//       'react-icons']
//   },



//   plugins: [react(), tailwindcss()],
// })








// vite.config.js
// import tailwindcss from '@tailwindcss/vite';
// //import autoprefixer from 'autoprefixer';
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';


// export default defineConfig({

// optimizeDeps: {
//   exclude: ['__vite__injectQuery']
// },

//   plugins: [react()],
//   css: {
//     postcss: {
//       plugins: [tailwindcss, autoprefixer],
//     },
//   },
// });

