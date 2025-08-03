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
