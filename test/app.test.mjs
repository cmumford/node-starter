import axios from 'axios';
import { expect } from 'chai';
import app from '../app/app.cjs';
const server = app;

const dockerBridgeIP = "127.0.0.1";

// Determine if a valid JSON string is minified. Minified typically means
// (at a minimum) the elinination of all whitespace.
function isJsonMinified(jsonString) {
    try {
        const minified = JSON.stringify(JSON.parse(jsonString));
        // JSON.stringify does not guarantee the stable order of keys.
        // Furthermore JSON created by other means (Go, Rust, ...) may have
        // no (or different) guarantees of stability. For example an object
        // is converted to the JSON string '{"b":2,"a":1}' by one program
        // may be converted to '{"a":1,"b":2}' in another. Comparing the
        // length is a workaround for this. It won't work for "relaxed"
        // JSON, but it will for "strict" JSON.
        return minified.length == jsonString.length;
    } catch (error) {
        return false;
    }
}

describe("Tests to the \"/\" endpoint", () => {
    it("shall be minimized ('a' key first)", async () => {
        expect(isJsonMinified('{"a":1,"b":2}')).to.be.true;
    });
    it("shall be minimized ('a' key last)", async () => {
        expect(isJsonMinified('{"b":2,"a":1}')).to.be.true;
    });
    it("is not minimized", async () => {
        expect(isJsonMinified('{"b":2, "a":1}')).to.be.false;
    });
    it("Invalid JSON", async () => {
        expect(isJsonMinified('{"b"')).to.be.false;
    });

    it("should return a 200 status code", async () => {
        const res = await axios(`http://${dockerBridgeIP}:3000/`);
        expect(res.status).to.equal(200);
    });

    it("should return a JSON object with a Message", async () => {
        const res = await axios(`http://${dockerBridgeIP}:3000/`);
        expect(res.data).to.haveOwnProperty("message");
    });

    it("should return a JSON object with a Timestamp", async () => {
        const res = await axios(`http://${dockerBridgeIP}:3000/`);
        expect(res.data).to.haveOwnProperty("timestamp");
    });

    it("should return a Message saying \"My name is ...\"", async () => {
        const res = await axios(`http://${dockerBridgeIP}:3000/`);
        expect(res.data.message).to.contain("My name is");
    });

    it("should return a UNIX style timestamp (numerical values only)", async () => {
        const res = await axios(`http://${dockerBridgeIP}:3000/`);
        expect(res.data.timestamp).to.be.a("number");
    });
    it("should return a timestamp within a few seconds of now", async () => {
        const res = await axios(`http://${dockerBridgeIP}:3000/`);
        const now = Date.now();
        expect(res.data.timestamp).to.be.within(now - 5000, now);
    });
    it("should return minified JSON", async () => {
        const res = await axios(`http://${dockerBridgeIP}:3000/`, { responseType: 'text' });
        expect(res.headers["content-type"]).to.contain("application/json");
        expect(isJsonMinified(res.data)).to.be.true;
    });
});

after(() => {
    server.close();
});
