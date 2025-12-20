import { test, expect } from '@playwright/test';

test.describe('Summary Tab', () => {
  test('should display professional summary and core competencies (desktop)', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to load
    await expect(page.locator('text=Bruno Maciel Servulo')).toBeVisible();
    
    // Navigate to Summary tab (should be default)
    await page.click('text=Summary');
    await page.waitForTimeout(500);
    
    // Verify key sections are visible
    await expect(page.locator('text=Professional Summary')).toBeVisible();
    await expect(page.locator('text=Core Competencies')).toBeVisible();
    await expect(page.locator('text=Contact Details')).toBeVisible();
    
    // Verify content
    await expect(page.locator('text=Senior Software Engineer')).toBeVisible();
    await expect(page.locator('text=Microsoft Dynamics 365')).toBeVisible();
    
    // Take desktop screenshot
    await page.screenshot({ 
      path: 'screenshots/01-summary-desktop.png',
      fullPage: true 
    });
  });

  test('should display summary on mobile', async ({ page, browserName }) => {
    if (browserName !== 'mobile') {
      test.skip();
    }
    
    await page.goto('/');
    await page.waitForTimeout(500);
    
    // Verify mobile layout
    await expect(page.locator('text=Bruno Maciel Servulo')).toBeVisible();
    
    // Take mobile screenshot
    await page.screenshot({ 
      path: 'screenshots/01-summary-mobile.png',
      fullPage: true 
    });
  });

  test('should trigger Clippy when clicking core competency', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Summary');
    await page.waitForTimeout(500);
    
    // Close pitch mode if it appears (first-time visitor)
    const pitchModeVisible = await page.locator('text=Clippy\'s Guided Tour').isVisible().catch(() => false);
    if (pitchModeVisible) {
      await page.click('[aria-label="Close tour"]');
      await page.waitForTimeout(300);
    }
    
    // Click on a core competency
    await page.click('text=Microsoft Dynamics 365');
    await page.waitForTimeout(500);
    
    // Verify Clippy appears
    await expect(page.locator('text=📎')).toBeVisible();
    
    // Take screenshot with Clippy
    await page.screenshot({ 
      path: 'screenshots/02-clippy-competency.png',
      fullPage: false 
    });
  });
});
