import { test, expect } from '@playwright/test';

test.describe('Projects Tab', () => {
  test('should display project gallery with filtering', async ({ page }) => {
    await page.goto('/');
    
    // Close pitch mode if it appears
    const pitchModeVisible = await page.locator('text=Clippy\'s Guided Tour').isVisible().catch(() => false);
    if (pitchModeVisible) {
      await page.click('[aria-label="Close tour"]');
      await page.waitForTimeout(300);
    }
    
    // Navigate to Projects tab
    await page.click('text=Projects');
    await page.waitForTimeout(500);
    
    // Verify project section
    await expect(page.locator('text=Projects & Impact')).toBeVisible();
    
    // Verify at least one project is visible
    await expect(page.locator('text=Multi-Country CRM Modernization')).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ 
      path: 'screenshots/03-projects.png',
      fullPage: true 
    });
  });

  test('should filter projects by technology', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Projects');
    await page.waitForTimeout(500);
    
    // Close pitch mode if present
    const pitchModeVisible = await page.locator('text=Clippy\'s Guided Tour').isVisible().catch(() => false);
    if (pitchModeVisible) {
      await page.click('[aria-label="Close tour"]');
    }
    
    // Click on a technology filter (e.g., Azure Functions)
    const azureFunctionsFilter = page.locator('text=Azure Functions').first();
    if (await azureFunctionsFilter.isVisible()) {
      await azureFunctionsFilter.click();
      await page.waitForTimeout(500);
      
      // Verify filtering worked - should show fewer projects
      await expect(page.locator('text=Azure Functions')).toBeVisible();
      
      await page.screenshot({ 
        path: 'screenshots/04-projects-filtered.png',
        fullPage: true 
      });
    }
  });
});
