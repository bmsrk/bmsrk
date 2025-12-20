import { test, expect } from '@playwright/test';

test.describe('Experience Tab', () => {
  test('should display experience timeline', async ({ page }) => {
    await page.goto('/');
    
    // Close pitch mode
    const pitchModeVisible = await page.locator('text=Clippy\'s Guided Tour').isVisible().catch(() => false);
    if (pitchModeVisible) {
      await page.click('[aria-label="Close tour"]');
      await page.waitForTimeout(300);
    }
    
    // Navigate to Experience tab
    await page.click('text=Experience');
    await page.waitForTimeout(500);
    
    // Verify experience section
    await expect(page.locator('text=Professional Experience')).toBeVisible();
    
    // Verify companies are listed
    await expect(page.locator('text=fivemonkey devs')).toBeVisible();
    await expect(page.locator('text=Dynamics 365 Specialist')).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ 
      path: 'screenshots/08-experience.png',
      fullPage: true 
    });
  });

  test('should expand experience items', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Experience');
    await page.waitForTimeout(500);
    
    // Close pitch mode
    const pitchModeVisible = await page.locator('text=Clippy\'s Guided Tour').isVisible().catch(() => false);
    if (pitchModeVisible) {
      await page.click('[aria-label="Close tour"]');
    }
    
    // Find and click a collapsed experience item (if any)
    const expandButtons = page.locator('button:has-text("Show more")');
    const count = await expandButtons.count();
    
    if (count > 0) {
      await expandButtons.first().click();
      await page.waitForTimeout(300);
      
      // Verify expanded content
      await expect(page.locator('text=Show less')).toBeVisible();
      
      await page.screenshot({ 
        path: 'screenshots/09-experience-expanded.png',
        fullPage: true 
      });
    } else {
      // First item should be expanded by default
      await expect(page.locator('text=Architected secure cloud-native CRM solutions')).toBeVisible();
      
      await page.screenshot({ 
        path: 'screenshots/09-experience-expanded.png',
        fullPage: true 
      });
    }
  });
});
