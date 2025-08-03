import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.use("/api", chatRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
  connectDB();
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
};

// app.post("/test", async (req, res) => {
//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${process.env.SIGMAGPT_KEY}`,
//     },
//     body: JSON.stringify({
//       model: "provider-3/gpt-4o-mini",
//       messages: [
//         {
//           role: "user",
//           content: req.body.message,
//         },
//       ],
//     }),
//   };

//   try {
//     const response = await fetch(
//       "https://api.a4f.co/v1/chat/completions",
//       options
//     );
//     const data = await response.json();
//     console.log("Response:", data.choices[0].message.content);
//     res.status(200).json(data.choices[0].message.content);
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
