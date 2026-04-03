import app from "./app.ts";
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port no ${PORT}`);
  console.log("Api is working.");
  console.log(`Local URL: http://localhost:${PORT}`);
});
