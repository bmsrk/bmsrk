import { test, expect } from '@playwright/test';

test.describe('Qualifications Tab', () => {
  test('should display education and certifications', async ({ page }) => {
    await page.goto('/');
    
    // Close pitch mode
    const pitchModeVisible = await page.locator('text=Clippy\'s Guided Tour').isVisible().catch(() => false);
    if (pitchModeVisible) {
      await page.click('[aria-label="Close tour"]');
      await page.waitForTimeout(300);
    }
    
    // Navigate to Qualifications tab
    await page.click('text=Qualifications');
    await page.waitForTimeout(500);
    
    // Verify qualifications section
    await expect(page.locator('text=Qualifications & Credentials')).toBeVisible();
    
    // Verify education
    await expect(page.locator('text=Education')).toBeVisible();
    await expect(page.locator('text=Bachelor of Business Administration')).toBeVisible();
    
    // Verify certifications
    await expect(page.locator('text=Certifications')).toBeVisible();
    await expect(page.locator('text=Microsoft Certified')).toBeVisible();
    
    // Verify languages
    await expect(page.locator('text=Languages')).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ 
      path: 'screenshots/10-qualifications.png',
      fullPage: true 
    });
  });
});
