const express = require('express');
const app = express();
const PORT = 4000;

app.get('/api/analytics', (req, res) => {
  res.json({ message: "Analytics data" });
});

app.listen(PORT, () => {
  console.log(`Analytics service running on http://localhost:${PORT}`);
});
