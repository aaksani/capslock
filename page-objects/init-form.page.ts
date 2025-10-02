import { Page, Locator } from '@playwright/test';

/**
 * Page Object for Walk-In Bath Multi-Step Form
 */
export class InitFormPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Step 1: ZIP Code
  get zipCodeInput(): Locator {
    return this.page.locator('input[name="zipCode"]:visible').first();
  }

  get zipCodeNextButton(): Locator {
    return this.page.locator('button[type="submit"]:visible').first();
  }

  // Step 2: Why Interested
  get independenceLabel(): Locator {
    return this.page.locator('label[for="why-interested-independence-1"]');
  }

  get safetyLabel(): Locator {
    return this.page.locator('label[for="why-interested-safety-1"]');
  }

  get therapyLabel(): Locator {
    return this.page.locator('label[for="why-interested-therapy-1"]');
  }

  get otherLabel(): Locator {
    return this.page.locator('label[for="why-interested-other-1"]');
  }

  get whyInterestedNextButton(): Locator {
    return this.page.locator('button[type="submit"]:visible:has-text("Next")').first();
  }

  // Step 3: Property Type
  get ownedHouseLabel(): Locator {
    return this.page.locator('label[for="homeowner-owned-1"]');
  }

  get rentalPropertyLabel(): Locator {
    return this.page.locator('label[for="homeowner-rental-1"]');
  }

  get mobileHomeLabel(): Locator {
    return this.page.locator('label[for="homeowner-mobile-1"]');
  }

  get propertyTypeNextButton(): Locator {
    return this.page.locator('button[type="submit"]:visible:has-text("Next")').first();
  }

  // Step 4: Name & Email
  get nameInput(): Locator {
    return this.page.locator('input[name="name"]:visible').first();
  }

  get emailInput(): Locator {
    return this.page.locator('input[name="email"][type="email"]:visible').first();
  }

  get goToEstimateButton(): Locator {
    return this.page.locator('button[type="submit"]:visible:has-text("Go To Estimate")').first();
  }

  // Step 5: Phone
  get phoneInput(): Locator {
    return this.page.locator('input[name="phone"]:visible').first();
  }

  get submitYourRequestButton(): Locator {
    return this.page.locator('button[type="submit"]:visible:has-text("Submit Your Request")').first();
  }

  /**
   * Navigate to the form
   */
  async goto() {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Select random number of interests (1-4)
   * Returns the number of interests selected
   */
  async selectRandomInterests(): Promise<number> {
    const allLabels = [
      this.independenceLabel,
      this.safetyLabel,
      this.therapyLabel,
      this.otherLabel
    ];
    
    // Randomly select how many interests to choose (1-4)
    const numToSelect = Math.floor(Math.random() * 4) + 1;
    
    // Shuffle and select first N
    const shuffled = allLabels.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, numToSelect);
    
    await this.independenceLabel.waitFor({ state: 'visible' });
    
    for (const label of selected) {
      await label.click();
    }
    
    return numToSelect;
  }

  /**
   * Navigate to email input step (Step 4)
   * Fills ZIP, selects all interests, selects owned property, and navigates to name/email form
   */
  async navigateToEmailStep(zipCode: string = '48823') {
    await this.goto();
    
    // Step 1: ZIP Code
    await this.zipCodeInput.fill(zipCode);
    await this.zipCodeNextButton.click();
    await this.page.waitForTimeout(1500);
    
    // Step 2: Select all interests
    await this.independenceLabel.waitFor({ state: 'visible' });
    await this.independenceLabel.click();
    await this.safetyLabel.click();
    await this.therapyLabel.click();
    await this.otherLabel.click();
    await this.whyInterestedNextButton.click();
    await this.page.waitForTimeout(1500);
    
    // Step 3: Select owned property
    await this.ownedHouseLabel.waitFor({ state: 'visible' });
    await this.ownedHouseLabel.click();
    await this.propertyTypeNextButton.click();
    await this.page.waitForTimeout(1500);
    
    // Now on name/email step
    await this.nameInput.waitFor({ state: 'visible' });
  }

  /**
   * Navigate to phone input step (Step 5)
   */
  async navigateToPhoneStep(zipCode: string = '48823', name: string = 'John Doe', email: string = 'test@example.com') {
    await this.navigateToEmailStep(zipCode);
    
    // Fill name and email
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.goToEstimateButton.click();
    await this.page.waitForTimeout(1500);
    
    // Now on phone step
    await this.phoneInput.waitFor({ state: 'visible' });
  }

  /**
   * Complete entire form
   */
  async fillCompleteForm(data: {
    zipCode: string;
    propertyType: 'owned' | 'rental' | 'mobile';
    name: string;
    email: string;
    phone: string;
  }) {
    await this.goto();
    
    // Step 1: ZIP
    await this.zipCodeInput.fill(data.zipCode);
    await this.zipCodeNextButton.click();
    await this.page.waitForTimeout(1500);
    
    // Step 2: Interests
    await this.independenceLabel.waitFor({ state: 'visible' });
    await this.independenceLabel.click();
    await this.safetyLabel.click();
    await this.therapyLabel.click();
    await this.otherLabel.click();
    await this.whyInterestedNextButton.click();
    await this.page.waitForTimeout(1500);
    
    // Step 3: Property Type
    if (data.propertyType === 'owned') {
      await this.ownedHouseLabel.waitFor({ state: 'visible' });
      await this.ownedHouseLabel.click();
    } else if (data.propertyType === 'rental') {
      await this.rentalPropertyLabel.waitFor({ state: 'visible' });
      await this.rentalPropertyLabel.click();
    } else {
      await this.mobileHomeLabel.waitFor({ state: 'visible' });
      await this.mobileHomeLabel.click();
    }
    await this.propertyTypeNextButton.click();
    await this.page.waitForTimeout(1500);
    
    // Step 4: Name & Email
    await this.nameInput.waitFor({ state: 'visible' });
    await this.nameInput.fill(data.name);
    await this.emailInput.fill(data.email);
    await this.goToEstimateButton.click();
    await this.page.waitForTimeout(1500);
    
    // Step 5: Phone
    await this.phoneInput.waitFor({ state: 'visible' });
    await this.phoneInput.fill(data.phone);
    await this.submitYourRequestButton.click();
    await this.page.waitForTimeout(2000);
  }

  /**
   * Verify user reached thank you page
   */
  async verifyThankYouPage() {
    await this.page.waitForTimeout(2000);
    
    const url = this.page.url();
    const isOnThankYou = url.includes('/thankyou');
    
    if (!isOnThankYou) {
      throw new Error(`Expected to be on thank you page, but URL is: ${url}`);
    }
    
    const heading = await this.page.locator('h1, h2').first().textContent();
    if (!heading?.toLowerCase().includes('thank')) {
      throw new Error(`Expected heading to contain "thank", but got: ${heading}`);
    }
  }

  /**
   * Check if validation error is visible
   */
  async hasValidationError(): Promise<boolean> {
    return await this.page.locator('text=/wrong|invalid|error|required/i')
      .first().isVisible({ timeout: 2000 }).catch(() => false);
  }
}
