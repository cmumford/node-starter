const express = require('express');
const app = express();
const PORT = 80;

app.get('/', (req, res) => {
    const now = new Date();
    res.send({
        "message": "My name is timestamper",
        "timestamp": now.valueOf() - 10000
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
