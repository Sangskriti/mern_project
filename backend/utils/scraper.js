const axios = require('axios');
const cheerio = require('cheerio');
const Story = require('../models/Story');

const scrapeHackerNews = async () => {
    try {
        const { data } = await axios.get('https://news.ycombinator.com/');
        const $ = cheerio.load(data);
        const stories = [];

        $('.athing').slice(0, 10).each((i, el) => {
            const title = $(el).find('.titleline > a').text();
            const url = $(el).find('.titleline > a').attr('href');
            const subtext = $(el).next();
            const points = parseInt(subtext.find('.score').text()) || 0;
            const author = subtext.find('.hnuser').text();
            const postedAt = subtext.find('.age').attr('title');

            stories.push({ title, url, points, author, postedAt });
        });

        for (let story of stories) {
            await Story.findOneAndUpdate({ url: story.url }, story, { upsert: true });
        }
        console.log("Scraping completed!");
    } catch (err) {
        console.error("Scraping failed", err);
    }
};

module.exports = scrapeHackerNews;