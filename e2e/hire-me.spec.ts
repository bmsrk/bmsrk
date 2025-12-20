import { test, expect } from '@playwright/test';

test.describe('Hire Me Tab', () => {
  test('should display professional services information', async ({ page }) => {
    await page.goto('/');
    
    // Close pitch mode
    const pitchModeVisible = await page.locator('text=Clippy\'s Guided Tour').isVisible().catch(() => false);
    if (pitchModeVisible) {
      await page.click('[aria-label="Close tour"]');
      await page.waitForTimeout(300);
    }
    
    // Navigate to Hire Me tab
    await page.click('text=Hire Me');
    await page.waitForTimeout(500);
    
    // Verify hire me section
    await expect(page.locator('text=Professional Services')).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ 
      path: 'screenshots/11-hire-me.png',
      fullPage: true 
    });
  });
});
