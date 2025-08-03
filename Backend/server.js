import express from "express";
import "dotenv/config";
import cors from "cors";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

app.post("/test", async (req, res) => {
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
          content: req.body.message,
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
    console.log("Response:", data.choices[0].message.content);
    res.status(200).json(data.choices[0].message.content);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
