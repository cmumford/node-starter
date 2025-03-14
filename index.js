const express = require('express');
const app = express();
const PORT = 80;

const date = new Date();
const response = {
    "message": "My name is timestamper",
    "timestamp": date.valueOf()
};

app.get('/', (req, res) => {
    res.send(JSON.stringify(response));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
