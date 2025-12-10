import express from "express";
import { createContent } from "./service.js";

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/generate', async (req, res) => {
    try {
        const { topic } = req.body;
        if (!topic) {
            return res.status(400).json({ error: "Topic is required" });
        }
        
        const article = await createContent(topic);
        res.json({ article });
    } catch (error) {
        console.error("Error generating article:", error);
        res.status(500).json({ error: "Failed to generate article. " + error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
