# 🚀 MERN Stack Hacker News Scraper

A full-stack web application that scrapes the top 10 stories from Hacker News, provides user authentication, and allows users to bookmark their favorite stories.


## ✨ Features
* **Web Scraping:** Automatically scrapes top 10 stories using Cheerio.
* **Authentication:** Secure Login/Register system using JWT and Bcrypt.
* **Bookmarks:** Users can save stories to their personal bookmark list.
* **Modern UI:** Built with React and styled with a Hacker News-inspired theme.



## 🛠️ Tech Stack
* **Frontend:** React.js, Axios, React Router
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas
* **Scraping:** Cheerio & Axios



## ⚙️ Environment Variables

PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=secret_key_here

Backend Setup

cd backend
npm install
nodemon server.js

Frontend Setup

cd ../frontend
npm install
npm start