import { test as base } from '@playwright/test';
import { InitFormPage } from '../../page-objects/init-form.page';

/**
 * Test Data - Valid and Invalid Test Cases
 */
export const testData = {
  validZipCodes: ['48823', '48103', '48201'],  // Michigan ZIP codes
  
  invalidEmails: [
    { email: '', description: 'empty email' },
    { email: 'invalidemail.com', description: 'no @ symbol' },
    { email: 'user@', description: 'no domain' },
    { email: '@example.com', description: 'no username' },
  ],
  
  invalidPhones: [
    { phone: '', description: 'empty phone' },
    { phone: '123456789', description: '9 digits' },
    { phone: '12345678901', description: '11 digits' },
    { phone: 'abcdefghij', description: 'letters' },
  ],
  
  propertyTypes: ['owned', 'rental', 'mobile'] as const,
};

/**
 * Custom Fixture - Extends base test with FormPage
 */
type TestFixtures = {
  formPage: InitFormPage;
};

export const test = base.extend<TestFixtures>({
  formPage: async ({ page }, use) => {
    const formPage = new InitFormPage(page);
    await use(formPage);
  },
});

export { expect } from '@playwright/test';
