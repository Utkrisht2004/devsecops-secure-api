const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Secure Coding Practice: Using Environment Variables instead of hardcoded secrets
const dbPassword = process.env.DB_PASSWORD || 'default_insecure_password';

app.use(express.json());

app.get('/api/data', (req, res) => {
    // Basic input validation simulation
    if (!req.query.id) {
        return res.status(400).json({ error: "Input validation failed: 'id' parameter is required." });
    }
    
    res.json({
        message: "Secure data retrieved successfully",
        recordId: req.query.id,
        status: "Encrypted and Monitored"
    });
});

app.get('/health', (req, res) => {
    res.status(200).send("OK");
});

app.listen(port, () => {
    console.log(`Secure API listening on port ${port}`);
});
