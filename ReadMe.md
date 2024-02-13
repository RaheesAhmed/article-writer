# Web Scraping and Article Generation System

This project integrates web scraping, data processing, and AI-driven content creation to automatically generate comprehensive, SEO-optimized articles on specified topics. It leverages Puppeteer for web scraping, OpenAI's GPT for content creation, and Express for potential future expansions such as a web interface.

## Overview

The system is designed to:

1. Scrape Google search results for a specified query.
2. Extract and summarize key information from the top results.
3. Use this summary as input to OpenAI's GPT (specifically, the gpt-3.5-turbo model) to generate an in-depth article on the topic.
4. Save the generated article to an HTML file for easy publication.

## Requirements

- Node.js
- npm (Node Package Manager)
- An OpenAI API Key

## Setup Instructions

1. **Clone the Repository**

   Clone this repository to your local machine using `git clone`.

2. **Install Dependencies**

   Navigate to the project directory and run:

   ```bash
   npm install
   ```

This command installs all necessary dependencies, including `express, puppeteer, puppeteer-extra, puppeteer-extra-plugin-stealth, and dotenv`.

Configure Environment Variables

Create a `.env` file in the root directory of the project and add your OpenAI API Key:

```
OPENAI_API_KEY=your_api_key_here
```

Running the Application
To run the application, execute:

```
npm start
```

## How It Works

`Web Scraping:` The application uses Puppeteer and the Stealth Plugin to scrape Google search results for the specified query. The scrapeGoogleSearchResults function is responsible for this task.

`Data Processing:` Extracted search results are processed and formatted to highlight key points using the formatForGPT function. This summary serves as the basis for content generation.

`Content Generation:` The generateArticle function calls OpenAI's GPT with the formatted summary to produce a comprehensive article on the topic.

`Saving the Article:` The generated article is saved to an HTML file using the fs module for easy publication or further processing

# Customization

You can customize the query and other parameters within the main function to generate articles on different topics.

# Disclaimer

Ensure you comply with Google's Terms of Service when scraping their search results. Additionally, confirm that your use of OpenAI's API adheres to their use case policies.
