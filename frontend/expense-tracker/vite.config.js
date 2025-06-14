import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
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
    // Helps prevent double transformation of deps
    commonjsOptions: {
      transformMixedEsModules: true
    }
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

