const express = require('express');
const app = express();
const PORT = 80;

app.get('/', (req, res) => {
    const now = new Date();
    const response = {
        "message": "My name is timestamper",
        "timestamp": now.valueOf() - 1 * 1000
    };
    res.send(response);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
