# Capslock QA Test Automation

Automated test suite for Walk-In Bath form at https://test-qa.capslock.global using Playwright + TypeScript.

## 🚀 Quick Start

```bash
npm install
npx playwright install
npm test
```

### Run Options
```bash
npm test              # Run all tests (headless)
npm run test:headed   # Run with visible browser
npm run test:ui       # Run in interactive UI mode
```

## 📁 Project Structure

```
capslock/
├── page-objects/
│   └── init-form.page.ts          # Page Object Model
├── tests/
│   ├── helpers/
│   │   └── test-data-generator.ts # Faker-based test data
│   ├── fixtures.ts                # Playwright fixtures
│   └── init-form.spec.ts          # 11 test scenarios
├── playwright.config.ts
└── BUGS_FOUND.md                  # Bug report
```

## 🧪 Test Scenarios (11 Total)

### Complete Form Submission (3 tests)
- ✅ Owned property type
- ✅ Rental property type  
- ✅ Mobile property type

_Uses Faker for random names, emails, phone numbers_

### Email Validation (4 tests)
- ✅ Rejects empty email
- ✅ Rejects email without @ symbol
- ✅ Rejects email without domain
- ✅ Rejects email without username

### Phone Validation (4 tests)
- ✅ Rejects empty phone
- ✅ Rejects 9 digits
- ❌ **Rejects 11 digits** — **BUG FOUND**
- ✅ Rejects letters

## 🐛 Bugs Found

**Bug #1: Form accepts 11-digit phone numbers**  
Requirements specify exactly 10 digits, but form accepts 11 digits and redirects to thank you page.

📄 **Full details:** [BUGS_FOUND.md](BUGS_FOUND.md)

## 📝 Written Evaluation

### 1. Change Detection for Landing Pages

**Approach:**
- **Visual regression**: Playwright screenshots + Percy/Applitools
- **DOM monitoring**: Git hooks trigger tests on component changes
- **CI/CD**: Auto-run affected tests based on file paths
- **API contracts**: Trigger E2E tests when backend changes

### 2. Tools & Processes

**Testing:**
- Playwright (cross-browser, TypeScript, reliable)
- Faker (realistic random data)
- Page Object Model (maintainable, reusable)

**CI/CD:**
- GitHub Actions (native integration)

**AI Integration:**
- Copilot for test writing
- Playwright Codegen for locators
- ChatGPT/Claude for test planning

### 3. Most Challenging Situation

**Challenge:** 30% flaky E2E tests in microservices suite

**Resolution:**
1. Replaced arbitrary waits with Playwright auto-waiting
2. Test isolation using unique data per test (Faker)
3. Service health checks before tests
4. Detailed logging for debugging

**Result:** Flakiness reduced from 30% → <2%, execution time -40%

## 🎯 Key Features

- **Page Object Model** — All locators centralized
- **TypeScript** — Full type safety
- **Faker** — Realistic random test data
- **Data-driven** — forEach loops for test variations
- **Playwright Fixtures** — Clean, reusable test setup

## 📊 Results

- **Tests:** 11 total
- **Passing:** 10/11 (90.9%)
- **Bugs found:** 1 (documented)
- **Coverage:** 100% of critical flows

---

**Status:** ✅ Ready for review
