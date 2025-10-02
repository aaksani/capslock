import { test, expect, testData } from './fixtures';
import { testDataGenerator } from './helpers/test-data-generator';

test.describe('Walk-In Bath Form Tests', () => {

  //Verify positive flows based on property type with Faker data
  testData.propertyTypes.forEach(propertyType => {
    test(`Complete form submission with ${propertyType} property type`, async ({ formPage }) => {
      // Use Faker to generate realistic random data
      const randomData = testDataGenerator.getCompleteFormData();
      
      await formPage.fillCompleteForm({
        zipCode: randomData.zipCode,
        propertyType: propertyType,
        name: randomData.name,
        email: randomData.email,
        phone: randomData.phone,
      });
      
      await formPage.verifyThankYouPage();
    });
  });

  // Email Validation - Invalid Emails Should Not Progress to Phone Step
  testData.invalidEmails.forEach(invalidData => {
    test(`Email validation rejects ${invalidData.description}`, async ({ formPage }) => {
      await formPage.navigateToEmailStep(testData.validZipCodes[0]);
      
      // Use Faker for random name
      await formPage.nameInput.fill(testDataGenerator.getName());
      await formPage.emailInput.fill(invalidData.email);
      await formPage.goToEstimateButton.click();
      await formPage.page.waitForTimeout(1500);
      
      const phoneVisible = await formPage.phoneInput.isVisible({ timeout: 3000 }).catch(() => false);
      expect(phoneVisible, `Form should reject ${invalidData.description} and not show phone field`).toBe(false);
    });
  });

  // Phone Validation Tests - Data-Driven by Invalid Phone Types
  testData.invalidPhones.forEach(invalidData => {
    test(`Phone validation rejects ${invalidData.description}`, async ({ formPage }) => {
      // Use Faker for random name and email
      await formPage.navigateToPhoneStep(
        '48823',
        testDataGenerator.getName(),
        testDataGenerator.getEmail()
      );
      
      await formPage.phoneInput.fill(invalidData.phone);
      await formPage.submitYourRequestButton.click();
      await formPage.page.waitForTimeout(2000);
      
      const reachedThankYou = await formPage.page.url().includes('/thankyou');
      expect(reachedThankYou, `Form should reject ${invalidData.description} and not redirect to thank you page`).toBe(false);
    });
  });
});
