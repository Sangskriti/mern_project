
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const scrapeHackerNews = require('./utils/scraper'); 
const authRoutes = require('./routes/auth'); 
const storyRoutes = require('./routes/stories'); 

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json()); 


app.use('/api/auth', authRoutes);
app.use('/api/stories', storyRoutes);


app.post('/api/scrape', async (req, res) => {
    try {
        await scrapeHackerNews();
        res.status(200).json({ message: "Scraping triggered successfully!" });
    } catch (err) {
        res.status(500).json({ error: "Failed to trigger scraper" });
    }
});


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log("Connected to MongoDB");

        
        console.log("Starting initial scrape...");
        await scrapeHackerNews();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });