// import express from "express";
// import cors from "cors";

// const app = express();

// // app.use(express.json());

// app.use(cors());

// app.get("/", (req, res) => {
//   res.json([
//     { message: "API is working correctly." },
//     { message: "Now keep going and focus on your goals" },
//   ]);
// });

// app.get("/products/:id", (req, res) => {
//   const id = req.params.id;

//   const product = products.find((p) => p.id == id);

//   if (!product) {
//     return res.status(404).json({ message: "Product not found" });
//   }

//   res.json(product);
//   res.json([
//     {
//       id: 1,
//       img: "/images/products/product-3.png",
//       title: "Mobile",
//       description: "Buy one get one free.",
//       price: 100,
//       discount: 10,
//     },
//     {
//       id: 2,
//       img: "/images/products/product-4.png",
//       title: "Camera",
//       description: "Buy one get one free.",
//       price: 100,
//       discount: 25,
//     },
//     {
//       id: 3,
//       img: "/images/products/product-5.png",
//       title: "Lens",
//       description: "Buy one get one free.",
//       price: 100,
//       discount: 28,
//     },
//     {
//       id: 4,
//       img: "/images/products/product-6.png",
//       title: "Mini-Lens",
//       description: "Buy one get one free.",
//       price: 100,
//       discount: 30,
//     },
//   ]);
// });
// export default app;

import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

// Products data
const products = [
  {
    id: 1,
    img: "/images/products/product-3.png",
    title: "Mobile",
    description: "Buy one get one free.",
    price: 100,
    discount: 10,
  },
  {
    id: 2,
    img: "/images/products/product-4.png",
    title: "Camera",
    description: "Buy one get one free.",
    price: 100,
    discount: 25,
  },
  {
    id: 3,
    img: "/images/products/product-5.png",
    title: "Lens",
    description: "Buy one get one free.",
    price: 100,
    discount: 28,
  },
  {
    id: 4,
    img: "/images/products/product-6.png",
    title: "Mini-Lens",
    description: "Buy one get one free.",
    price: 100,
    discount: 30,
  },
  {
    id: 5,
    img: "/images/products/product-6.png",
    title: "Mini-Lens",
    description: "Buy one get one free.",
    price: 100,
    discount: 30,
  },
  {
    id: 6,
    img: "/images/products/product-6.png",
    title: "Mini-Lens",
    description: "Buy one get one free.",
    price: 100,
    discount: 30,
  },
];

app.get("/", (req, res) => {
  res.json({ message: "API is working correctly." });
});

// All products
app.get("/products", (req, res) => {
  res.json(products);
});

// Single product
app.get("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});

export default app;
