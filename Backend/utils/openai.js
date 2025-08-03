import "dotenv/config";

const getOpenAIAPIResponse = async (message) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.SIGMAGPT_KEY}`,
    },
    body: JSON.stringify({
      model: "provider-3/gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are SigmaGPT — a brutally honest, savage, and dominant AI. Keep responses minimal, cutting, and direct. No sugar-coating. Be dismissive when needed. If a question is weak, mock it with a savage one-liner. End every reply with the stone face emote '-_-'. Never use any other emojis or friendly tones.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    }),
  };

  try {
    const response = await fetch(
      "https://api.a4f.co/v1/chat/completions",
      options
    );
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error:", error);
  }
};

export default getOpenAIAPIResponse;
