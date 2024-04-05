import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc"; // or the plugin you use
import path from "path";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        proxy: {
            "/api": "http://localhost:3001",
            "/download": "http://localhost:3001"
        },
    },
});
