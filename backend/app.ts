import express from "express";
import cors from "cors";

const app = express();

// app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.json([
    { message: "API is working correctly." },
    { message: "Now keep going and focus on your goals" },
  ]);
});

app.get("/products", (req, res) => {
  res.json([
    {
      id: 1,
      img: "/images/products/shoes1.jpg",
      title: "Shoes",
      description: "Buy one get one free.",
      price: 100,
    },
    {
      id: 2,
      img: "/images/products/shoes1.jpg",
      title: "Shoes",
      description: "Buy one get one free.",
      price: 100,
    },
    {
      id: 3,
      img: "/images/products/shoes1.jpg",
      title: "Shoes",
      description: "Buy one get one free.",
      price: 100,
    },
  ]);
});
export default app;
