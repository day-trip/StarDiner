# SpaceBurger

SpaceBurger greatly innovates in the field of food-sustainability in space by allowing users to ... `todo`

## Process

### Step 1 - Gathering a list of ingredients

Evaluating the code:
```javascript
JSON.stringify([...document.querySelectorAll("a.list-group-item")].map(item => item.text).filter(item => !item.startsWith(" ")))
```
on the site https://upcfoodsearch.com/food-ingredients outputs a list of most commonly known ingredients. It contains ~2500 items. However, as of September 2024, this list uses ~12k tokens on the gpt-4 tokenizer. In order to solve this issue, we implemented further scraping logic in the `scrape` directory to sort ingredients by their usage and choose the top 500. Some ingredients were then manually added and removed until the quality met our standards.

### Step 2 - Building the user facing frontend
We used NextJS (+ React) and TailwindCSS to build our frontend. The code is based on the SPA (Single Page Application) architecture and is written in TypeScript. All of our code is organized in the `frontend` package of the monorepo and formatted using ESLint and Prettier.

Attribution for the background image: `todo`

### Step 3 - Building the primary backend
We build our backend on AWS (Amazon Web Services) using API  Gateway, Lambda, and DynamoDB. It is designed to scale to millions of users while operating at a near-zero cost. We deploy our frontend on AWS Amplify (a frontend hosting service).

The AI itself is build on the OpenAI platform, but we plan to also support Groq for better performance and pricing. Currently, 4 separate "agents" are in use, each serving a different purpose in the conversation/RAG pipeline. We use a custom implementation of tools/function calling instead of a vector database, as doing so results in increased accuracy.


## Note
SpaceBurger was developed as a prototype and lacks multiple features such as supply API connection and better optimized prompts. We had to balance the quality and quantity of features as we only had 2 days.
