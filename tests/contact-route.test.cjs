const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");

// Exercise the route with a fake mail provider so tests never send email.
function loadRoute(providerResult) {
	let calls = 0;
	const routeModule = { exports: {} };
	const source = fs.readFileSync(
		path.join(__dirname, "../app/api/contact/route.ts"),
		"utf8",
	);
	const compiled = ts.transpileModule(source, {
		compilerOptions: { module: ts.ModuleKind.CommonJS },
	}).outputText;
	vm.runInNewContext(compiled, {
		exports: routeModule.exports,
		require: (name) =>
			name === "resend"
				? {
						Resend: class {
							emails = {
								send: async () => {
									calls++;
									return providerResult;
								},
							};
						},
					}
				: require(name),
		process: { env: { RESEND_API_KEY: "test-key" } },
		console: { error() {} },
	});
	return { post: routeModule.exports.POST, calls: () => calls };
}

function request(values = {}) {
	const data = new FormData();
	for (const [key, value] of Object.entries({
		name: "Test",
		email: "test@example.com",
		message: "Test message",
		...values,
	}))
		data.set(key, value);
	return new Request("http://localhost/api/contact", {
		method: "POST",
		body: data,
	});
}

test("provider rejection returns an error instead of a success message", async () => {
	const route = loadRoute({ data: null, error: { name: "validation_error" } });
	const response = await route.post(request());
	assert.equal(response.status, 502);
	assert.deepEqual(await response.json(), { error: "Email delivery failed" });
	assert.equal(route.calls(), 1);
});

test("accepted mail returns success", async () => {
	const route = loadRoute({ data: { id: "test-id" }, error: null });
	const response = await route.post(request());
	assert.equal(response.status, 200);
	assert.deepEqual(await response.json(), { success: true });
});

test("invalid input and honeypot never reach the provider", async () => {
	const route = loadRoute({ error: null });
	for (const values of [
		{ email: "invalid" },
		{ message: " " },
		{ nickname: "bot" },
	]) {
		assert.equal((await route.post(request(values))).status, 400);
	}
	assert.equal(route.calls(), 0);
});
