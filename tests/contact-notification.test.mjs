import { test } from "node:test";
import assert from "node:assert/strict";
import { notifyContact } from "../lib/contact-notification.ts";
const message = {
  name: "Local fixture",
  email: "fixture@example.test",
  subject: "Hello\r\nInjected",
  message: "Local fixture message",
};
const config = {
  apiKey: "test-key",
  from: "Portfolio <sender@example.test>",
  to: "owner@example.test",
};
test("unconfigured notifications make no external call", async () => {
  assert.equal(
    await notifyContact(message, {}, () => {
      throw new Error("Must not send");
    }),
    "skipped",
  );
});
test("notification uses the owner destination and text content", async () => {
  let request;
  const result = await notifyContact(message, config, async (url, init) => {
    request = { url, init };
    return new Response("{}", { status: 200 });
  });
  assert.equal(result, "sent");
  assert.equal(request.url, "https://api.resend.com/emails");
  const body = JSON.parse(request.init.body);
  assert.deepEqual(body.to, ["owner@example.test"]);
  assert.equal(body.reply_to, message.email);
  assert.ok(!body.subject.includes("\n"));
  assert.equal(body.html, undefined);
  assert.ok(body.text.includes(message.message));
});
test("provider rejection and timeout leave the saved inbox workflow usable", async () => {
  assert.equal(
    await notifyContact(
      message,
      config,
      async () => new Response("{}", { status: 503 }),
    ),
    "failed",
  );
  assert.equal(
    await notifyContact(message, config, async () => {
      throw new Error("timeout");
    }),
    "failed",
  );
});
