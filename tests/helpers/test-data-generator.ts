import { faker } from '@faker-js/faker';

/**
 * Test Data Generator using Faker
 * Provides realistic random test data
 */
export const testDataGenerator = {
  /**
   * Generate random valid name
   */
  getName: (): string => {
    return faker.person.fullName();
  },

  /**
   * Generate random valid email
   */
  getEmail: (): string => {
    return faker.internet.email();
  },

  /**
   * Generate random valid US phone number (10 digits)
   */
  getPhone: (): string => {
    // Generate 10 digit number that formats correctly
    // Format: (XXX)XXX-XXXX
    const areaCode = faker.number.int({ min: 200, max: 999 });
    const exchange = faker.number.int({ min: 200, max: 999 });
    const subscriber = faker.number.int({ min: 1000, max: 9999 });
    return `${areaCode}${exchange}${subscriber}`;
  },

  /**
   * Generate complete random valid form data
   */
  getCompleteFormData: () => {
    return {
      zipCode: '48823',
      name: testDataGenerator.getName(),
      email: testDataGenerator.getEmail(),
      phone: testDataGenerator.getPhone(),
    };
  }
};
