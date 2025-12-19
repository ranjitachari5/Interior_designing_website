import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Simple WhatsApp backend running ✅");
});

// Send message route
app.post("/send-message", (req, res) => {
  const { name, phone, message } = req.body;

  const whatsappNumber = "918073362052";

  const text =
    `New Contact Message\n\n` +
    `Name: ${name}\n` +
    `Phone: ${phone}\n` +
    `Message: ${message}`;

  const whatsappURL =
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

  // Redirect user to WhatsApp
  res.json({ redirectUrl: whatsappURL });
});

// Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});