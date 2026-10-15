// Keep fixture checks isolated even if a prior build embedded a hosted backend.
const originalFetch = globalThis.fetch;
globalThis.fetch = (input, init) => {
  const url = new URL(
    typeof input === "string" || input instanceof URL ? input : input.url,
  );
  if (
    !["http://127.0.0.1:3018", "http://127.0.0.1:3019"].includes(url.origin)
  ) {
    throw new Error(
      "SEO fixture checks refuse non-fixture network destinations. Build with the documented local test configuration.",
    );
  }
  return originalFetch(input, init);
};
