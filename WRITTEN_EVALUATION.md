# Written Evaluation

## 1. Automating Change Detection for Landing Pages

For multiple landing pages, I'd focus on triggering the right tests when specific parts change.

**My approach:**

First, use **CI/CD triggers based on file paths**. If the contact form component changes, run only the form tests. This is simple to set up with GitHub Actions and gives fast feedback.

Second, add **visual regression testing** with Playwright's screenshot comparison. Take baseline screenshots and compare them on each deployment. Not every pixel difference is a bug, but it catches unintended visual changes.

Third, **monitor the DOM structure**. Set up alerts when major HTML changes happen in critical components. This helps catch breaking changes early.

For API-driven pages, add basic contract tests to catch when backend responses change structure.

The key is automation that's smart enough to only run relevant tests, not the entire suite every time.

## 2. Project Ownership: Tools & Processes

**Testing stack:**
- **Playwright** – reliable, great TypeScript support, excellent debugging
- **TypeScript** – catches bugs before they reach tests
- **Faker** – generates realistic test data, prevents conflicts in parallel tests
- **Page Object Model** – keeps tests maintainable

**CI/CD:**
- **GitHub Actions** – run tests on every PR, generate reports, block merges on failures

**AI tools I actually use:**
- **Playwright Codegen** – for getting accurate locators quickly (used it extensively in this project)
- **GitHub Copilot** – speeds up test writing, good for generating test variations
- **ChatGPT/Claude** – brainstorming edge cases and test scenarios

**Process:**
- Keep tests fast and reliable
- Fix flaky tests immediately – they kill trust
- Treat test code like production code
- Use detailed error messages in assertions

## 3. Most Challenging Situation

**The problem:**

At a previous role, our E2E test suite had a 30% flakiness rate. Tests would randomly fail, developers stopped trusting them, and bugs started slipping through.

**Root causes:**
- Race conditions between services
- Tests sharing data and overwriting each other
- Arbitrary `waitForTimeout()` calls everywhere

**How I fixed it:**

1. **Replaced arbitrary waits** – used Playwright's auto-waiting instead of hardcoded timeouts
2. **Test isolation** – made each test generate unique data with Faker (exactly what I did in this project)
3. **Browser interception** – intercepted network requests to mock slow APIs and eliminate external dependencies
4. **Component/Widget Objects** – created reusable component objects alongside page objects for complex UI elements (modals, dropdowns, etc.)
5. **Added service health checks** – wait for all dependencies before running tests
6. **Better logging** – detailed logs, screenshots, and videos for every failure

**Results:**
- Flakiness: 30% → <2%
- Execution time: -40%
- Team started trusting the tests again

**What I learned:**

Flaky tests are worse than no tests. They waste time and erode confidence. The fix isn't glamorous but it's critical: proper waits, test isolation, and unique data for every test run.

This experience directly influenced this project – that's why you'll see Faker generating unique data for every test, minimal use of arbitrary waits, and clear error messages in every assertion.
