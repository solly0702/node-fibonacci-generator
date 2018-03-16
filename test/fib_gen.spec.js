import request from "supertest";
import nodeServer from "../src/server";

describe("LOADING EXPRESS SERVER", () => {
	let server;
	beforeEach(() => {
		delete require.cache[require.resolve("../src/server")];
		server = nodeServer;
	});
	afterEach(() => {
		server.close();
	});

	it("responds to / with 200", done => {
		request(server)
			.get("/")
			.expect(200, done);
	});
	it("responds to /test with 404", done => {
		request(server)
			.get("/test")
			.expect(404, done);
	});
	// test get with params
	it(`GET /api/fib-gen expect to 200 with message of "generates fib sequence of up to param of fib_sequence"`, done => {
		const response =
			"generates fib sequence of up to param of fib_sequence";
		request(server)
			.get("/api/fib-gen")
			.expect(200, { payload: response }, done);
	});
	it(`GET /api/fib-gen?fib_sequence=5 expect to 200 with '["0", "1", "1", "2", "3"]'`, done => {
		const response = ["0", "1", "1", "2", "3"];
		const param = "5";
		request(server)
			.get(`/api/fib-gen?fib_sequence=${param}`)
			.expect(200, { payload: response }, done);
	});
	it(`GET /api/fib-gen?fib_sequence=abc expect to 400 with "invalid syntax"`, done => {
		const response = "invalid syntax";
		const param = "abc";
		request(server)
			.get(`/api/fib-gen?fib_sequence=${param}`)
			.expect(400, { error: response }, done);
	});
	it(`GET /api/fib-gen?fib_sequence=-1 expect to 400 with "field must be positive number"`, done => {
		const response = "field must be positive number";
		const param = "-1";
		request(server)
			.get(`/api/fib-gen?fib_sequence=${param}`)
			.expect(400, { error: response }, done);
	});
	it(`GET /api/fib-gen?fib_sequence=10000 expect to 400 with "Out of bounds of maximum positive number possible in fibonacci sequence"`, done => {
		const response =
			"Out of bounds of maximum positive number possible in fibonacci sequence";
		const param = "10000";
		request(server)
			.get(`/api/fib-gen?fib_sequence=${param}`)
			.expect(400, { error: response }, done);
	});
	// test post with params
	it(`POST {"fib_sequence": "5"} to /api/fib-gen expect 200 with '["0", "1", "1", "2", "3"]'`, done => {
		const response = ["0", "1", "1", "2", "3"];
		const param = "5";
		request(server)
			.post("/api/fib-gen")
			.send({ fib_sequence: param })
			.expect(200, { payload: response }, done);
	});
	it(`POST {"fib_sequence": ""} to /api/fib-gen expect 400 with 'fib_sequence is required field'`, done => {
		const response = "fib_sequence is required field";
		const param = "";
		request(server)
			.post("/api/fib-gen")
			.send({ fib_sequence: param })
			.expect(400, { error: response }, done);
	});
	it(`POST {"fib_sequence": "abc"} to /api/fib-gen expect 400 with 'fib_sequence is required field'`, done => {
		const response = "invalid syntax";
		const param = "abc";
		request(server)
			.post("/api/fib-gen")
			.send({ fib_sequence: param })
			.expect(400, { error: response }, done);
	});
	it(`POST {"fib_sequence": "-1"} to /api/fib-gen expect 400 with 'field must be positive number'`, done => {
		const response = "field must be positive number";
		const param = "-1";
		request(server)
			.post("/api/fib-gen")
			.send({ fib_sequence: param })
			.expect(400, { error: response }, done);
	});
	it(`POST {"fib_sequence": "10000"} to /api/fib-gen expect 400 with 'Out of bounds of maximum positive number possible in fibonacci sequence'`, done => {
		const response =
			"Out of bounds of maximum positive number possible in fibonacci sequence";
		const param = "10000";
		request(server)
			.post("/api/fib-gen")
			.send({ fib_sequence: param })
			.expect(400, { error: response }, done);
	});
});
