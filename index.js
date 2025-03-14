const express = require('express');
const app = express();
const PORT = 80;
const date = new Date();

app.get('/', (req, res) => {
    const response = {
        "message": "My name is timestamper",
        "timestamp": date.valueOf() + 2 * 1000
    };
    res.send(response);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
