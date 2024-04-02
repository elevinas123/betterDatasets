import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            // Use a prefix that your API requests will use, e.g., '/api'
            "/api": {
                // Target API server
                target: "https://catalog.data.gov/api/3/action",
                // If the API server is on https and you have invalid SSL certificates, you might need this
                secure: false,
                // Change the origin of the host header to the target URL
                changeOrigin: true,
                // To rewrite the API request path, use rewrite
                // This is useful if your API does not have a '/api' prefix
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },
});
