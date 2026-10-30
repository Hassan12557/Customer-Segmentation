// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: true,
//     port: 5173,
//     proxy: {
//       '/api': {
//         target: 'http://backend:8000',
//         changeOrigin: true,
//         secure: false,
//         // Optional: uncomment the line below if your backend routes don't include /api prefix physically
//         // rewrite: (path) => path.replace(/^\/api/, '')
//       }
//     }
//   }
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://backend:8000',
        changeOrigin: true,
        secure: false,
        // Optional: uncomment the line below if your backend routes don't include /api prefix physically
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})