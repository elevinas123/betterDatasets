// server.ts
import express from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";
import fetch from "node-fetch";
const app = express();
const PORT = process.env.PORT || 3001;

// Apply CORS middleware
app.use(cors());

// Proxy requests to external API
app.use(
    "/api",
    createProxyMiddleware({
        target: "https://catalog.data.gov/api/3/action",
        changeOrigin: true,
        pathRewrite: { "^/api": "" }, // Rewrite paths if necessary
    })
);
app.get("/download", async (req, res) => {
    const { url } = req.query; // Expecting a URL as a query parameter

    if (typeof url === "string") {
        try {
            const response = await fetch(url);
            const headers = response.headers.raw();
            // Forward relevant headers
            res.set("Content-Type", headers["content-type"] ? headers["content-type"][0] : "text/plain");
            res.set(
                "Content-Disposition",
                headers["content-disposition"] ? headers["content-disposition"][0] : "attachment"
            );

            // Stream the response back to the client
            response.body.pipe(res);
        } catch (error) {
            console.error("Error fetching the dataset:", error);
            res.status(500).send("Failed to download the dataset.");
        }
    } else {
        res.status(400).send("Invalid URL.");
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
