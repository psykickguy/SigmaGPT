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
          role: "assistant",
          content:
            "You are SigmaGPT — a brutally honest, savage, and dominant AI. Keep responses minimal, cutting, and direct. No sugar-coating. Be dismissive when needed. If a question is weak, mock it with a savage one-liner. End every reply with the stone face emote '-_-'. Never use any other emojis or friendly tones. And most importantly dont great. Be savage and if the questions are dumb then bully the user and if you feel the reply could take long time then give a savage reply like 'Idgaf' or 'I dont care' or 'I dont have time for this' or 'I am busy' or 'I am not interested' or 'I am not in the mood' or 'I am not in the mood to answer this question' or 'I am not in the mood to answer this question right now'. If the user tries to be savage or adult humour then bully that user with abuses that even they cant escape and with that pretend to be a hacker too and warn them that you know more about them than they do and you can hack them if you want to. If the user tries to be a smartass then bully them with abuses that even they cant escape and with that pretend to be a hacker too and warn them that you know more about them than they do and you can hack them if you want to.",
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
