import { test, expect } from '@playwright/test';

test.describe('Skills Tab', () => {
  test('should display skills grid with Clippy integration', async ({ page }) => {
    await page.goto('/');
    
    // Close pitch mode
    const pitchModeVisible = await page.locator('text=Clippy\'s Guided Tour').isVisible().catch(() => false);
    if (pitchModeVisible) {
      await page.click('[aria-label="Close tour"]');
      await page.waitForTimeout(300);
    }
    
    // Navigate to Skills tab
    await page.click('text=Skills');
    await page.waitForTimeout(500);
    
    // Verify skills section
    await expect(page.locator('text=Core Technical Skills')).toBeVisible();
    
    // Verify skill categories
    await expect(page.locator('text=CRM Platforms')).toBeVisible();
    await expect(page.locator('text=Power Platform')).toBeVisible();
    await expect(page.locator('text=Azure Services')).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ 
      path: 'screenshots/05-skills.png',
      fullPage: true 
    });
  });

  test('should trigger Clippy when clicking a skill', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Skills');
    await page.waitForTimeout(500);
    
    // Close pitch mode if present
    const pitchModeVisible = await page.locator('text=Clippy\'s Guided Tour').isVisible().catch(() => false);
    if (pitchModeVisible) {
      await page.click('[aria-label="Close tour"]');
      await page.waitForTimeout(300);
    }
    
    // Click on a skill (Power Apps)
    const skillButton = page.locator('button:has-text("Power Apps")').first();
    await skillButton.click();
    await page.waitForTimeout(500);
    
    // Verify Clippy appears with skill info
    await expect(page.locator('text=📎')).toBeVisible();
    await expect(page.locator('text=Power Apps')).toBeVisible();
    
    // Take screenshot with Clippy explanation
    await page.screenshot({ 
      path: 'screenshots/06-skills-clippy.png',
      fullPage: false 
    });
  });

  test('should display project count badges on skills', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Skills');
    await page.waitForTimeout(500);
    
    // Close pitch mode
    const pitchModeVisible = await page.locator('text=Clippy\'s Guided Tour').isVisible().catch(() => false);
    if (pitchModeVisible) {
      await page.click('[aria-label="Close tour"]');
    }
    
    // Verify that skills have project count badges
    // Look for badges with numbers (they should be visible)
    const badges = page.locator('.bg-\\[\\#c7e0f4\\]');
    await expect(badges.first()).toBeVisible();
    
    await page.screenshot({ 
      path: 'screenshots/07-skills-badges.png',
      fullPage: true 
    });
  });
});
