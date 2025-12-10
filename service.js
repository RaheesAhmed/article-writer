import OpenAI from "openai";
import dotenv from "dotenv";
import scrapeGoogleSearchResults from "./scrape.js";

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({ apiKey });

function formatForGPT(searchResults) {
  const formattedResults = searchResults
    .map((result, index) => {
      // Use meta keywords and a snippet of content if available
      const contentSnippet = result.articleContent ? result.articleContent.substring(0, 200) + "..." : "";
      const summary = `${result.articleTitle}. Keywords: ${result.metaKeywords || 'None'}. Content: ${contentSnippet}`;
      return `Source ${index + 1}: ${summary}`;
    })
    .join("\n");

  return formattedResults;
}

async function generateArticle(topic, formattedResults) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `As a highly skilled article and blog post writer with over ten years of experience, you have mastered the intricacies of SEO and consistently produce content that not only achieves high search engine rankings but also captivates and goes viral among readers. Your ability to weave detailed, SEO-optimized articles tailored to specific audience interests is unparalleled.

        Your Assignment: Write an in-depth, original article on a specified topic, ensuring it adheres to the highest standards of SEO and reader engagement. Your article must reflect rigorous research, organizational excellence, and incorporate the latest SEO practices to stand out in both search engine rankings and reader value.

        Specific Instructions:

        Topic: ${topic}
        Research Basis: Utilize insights and data from selected search results provided in the user prompt.
        Structural Guidelines:

        Table of Contents: Start with a table of contents to outline main sections and subtopics.

        Introduction: Craft a compelling introduction highlighting the article's relevance and value to the reader.

        Body: The body should include:

        Detailed, well-researched content with data, statistics, and quotes from credible sources.
        Clear subheadings to segment the article into easily navigable sections.
        Conclusion: Summarize the main points and include a strong call-to-action to encourage reader interaction.

        SEO Elements: Weave targeted keywords naturally, create an SEO-optimized title and meta description, and integrate both internal and external credible links.

        Style and Tone: Maintain a professional, yet approachable tone to ensure readability and engagement.

        FAQ Section: Include a FAQ section addressing common questions related to the topic, with concise, informative answers.

        Originality and Length:

        The article must be entirely original, free from plagiarism, and not previously published elsewhere.
        Aim for a minimum of 1500 words to thoroughly cover the topic.
        Delivery Format:

        Provide your article in a well-formatted HTML document, ensuring it adheres to the above guidelines and is ready for digital publication.
        Objective: Your ultimate goal is to produce a standout article that not only meets SEO benchmarks but is also rich in analysis, engaging to read, and capable of drawing and retaining reader interest across digital platforms.
        kindly give back the in well-formatted HTML no need to add header and footer.`,
      },
      { role: "user", content: formattedResults },
    ],
    model: "gpt-3.5-turbo-16k",
  });

  return completion.choices[0].message.content;
}

export async function createContent(topic) {
  console.log(`Scraping Google for: ${topic}`);
  const searchResults = await scrapeGoogleSearchResults(topic);

  console.log("Formatting results for GPT...");
  const formattedResults = formatForGPT(searchResults);

  console.log("Generating article...");
  const article = await generateArticle(topic, formattedResults);

  return article;
}
