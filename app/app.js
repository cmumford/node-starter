const express = require('express');
const app = express();
const PORT = 80;

app.get('/', (req, res) => {
    res.send({
        "message": "My name is timestamper",
        "timestamp": Date.now(),
        "git-commit-id": process.env.GIT_COMMIT_ID
    });
});

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = server;