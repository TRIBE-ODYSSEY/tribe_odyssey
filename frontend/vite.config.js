import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import * as path from "path";
export default defineConfig({
    plugins: [
        react(), // Simplified configuration
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        port: 3000,
        host: true,
        strictPort: true,
        watch: {
            usePolling: true,
        },
    },
    build: {
        target: "esnext",
        sourcemap: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    "react-vendor": ["react", "react-dom"],
                    router: ["react-router-dom"],
                    query: ["@tanstack/react-query"],
                },
            },
        },
    },
});
