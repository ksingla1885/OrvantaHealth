const dotenv = require('dotenv');
dotenv.config();

const query = "how to control high blood pressure";
const apiKey = process.env.OPENROUTER_API_KEY;
const model = process.env.OPENROUTER_MODEL || "poolside/laguna-s-2.1:free";

console.log("API Key:", apiKey ? apiKey.substring(0, 15) + "..." : "undefined");
console.log("Model:", model);

async function run() {
  try {
    const { OpenRouter } = await import('@openrouter/sdk');
    const openrouter = new OpenRouter({ apiKey });
    
    console.log("Attempting chat send...");
    const response = await openrouter.chat.send({
      chatRequest: {
        model: model,
        messages: [
          {
            role: "user",
            content: query
          }
        ],
        temperature: 0.3,
        max_tokens: 500
      }
    });
    console.log("Success! Response:", JSON.stringify(response, null, 2));
  } catch (error) {
    console.error("Failed with error:", error);
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
    }
  }
}

run();
