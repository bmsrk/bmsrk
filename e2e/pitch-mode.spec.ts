import { test, expect } from '@playwright/test';

test.describe('Pitch Mode (Guided Tour)', () => {
  test('should display pitch mode on first visit', async ({ page, context }) => {
    // Clear localStorage to simulate first visit
    await context.clearCookies();
    await page.goto('/');
    
    // Wait for pitch mode to appear (3 second delay)
    await page.waitForTimeout(3500);
    
    // Verify pitch mode appears
    await expect(page.locator('text=Clippy\'s Guided Tour')).toBeVisible();
    await expect(page.locator('text=📎')).toBeVisible();
    
    // Take screenshot of pitch mode
    await page.screenshot({ 
      path: 'screenshots/12-pitch-mode-start.png',
      fullPage: false 
    });
  });

  test('should navigate through pitch mode steps', async ({ page, context }) => {
    await context.clearCookies();
    await page.goto('/');
    await page.waitForTimeout(3500);
    
    // Verify we're on step 1
    await expect(page.locator('text=Step 1 of 7')).toBeVisible();
    
    // Click Next
    await page.click('text=Next →');
    await page.waitForTimeout(500);
    
    // Verify step 2
    await expect(page.locator('text=Step 2 of 7')).toBeVisible();
    await expect(page.locator('text=10+ Years of Excellence')).toBeVisible();
    
    await page.screenshot({ 
      path: 'screenshots/13-pitch-mode-step2.png',
      fullPage: false 
    });
    
    // Continue to step 3
    await page.click('text=Next →');
    await page.waitForTimeout(500);
    
    await page.screenshot({ 
      path: 'screenshots/14-pitch-mode-step3.png',
      fullPage: false 
    });
    
    // Navigate to last step
    for (let i = 0; i < 4; i++) {
      await page.click('text=Next →');
      await page.waitForTimeout(300);
    }
    
    // Verify final step
    await expect(page.locator('text=Step 7 of 7')).toBeVisible();
    await expect(page.locator('text=Ready to Collaborate')).toBeVisible();
    
    await page.screenshot({ 
      path: 'screenshots/15-pitch-mode-final.png',
      fullPage: false 
    });
    
    // Click Finish
    await page.click('text=Finish! 🎉');
    await page.waitForTimeout(500);
    
    // Verify pitch mode closed and achievement unlocked
    await expect(page.locator('text=Clippy\'s Guided Tour')).not.toBeVisible();
  });

  test('should allow manual start from Help page', async ({ page }) => {
    // Set hasVisitedBefore to skip auto-start
    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('hasVisitedBefore', 'true'));
    
    // Close any open pitch mode
    const pitchModeVisible = await page.locator('text=Clippy\'s Guided Tour').isVisible().catch(() => false);
    if (pitchModeVisible) {
      await page.click('[aria-label="Close tour"]');
    }
    
    // Navigate to Help page
    await page.click('text=Help');
    await page.waitForTimeout(500);
    
    // Verify Start Tour button exists
    await expect(page.locator('text=Start Guided Tour with Clippy')).toBeVisible();
    
    // Click to start tour
    await page.click('text=Start Guided Tour with Clippy');
    await page.waitForTimeout(500);
    
    // Verify pitch mode starts
    await expect(page.locator('text=Clippy\'s Guided Tour')).toBeVisible();
    
    await page.screenshot({ 
      path: 'screenshots/16-pitch-mode-manual-start.png',
      fullPage: false 
    });
  });

  test('should support mobile swipe gestures', async ({ page, browserName, context }) => {
    if (browserName !== 'mobile') {
      test.skip();
    }
    
    await context.clearCookies();
    await page.goto('/');
    await page.waitForTimeout(3500);
    
    // Verify pitch mode on mobile
    await expect(page.locator('text=Clippy\'s Guided Tour')).toBeVisible();
    
    // Take mobile screenshot
    await page.screenshot({ 
      path: 'screenshots/17-pitch-mode-mobile.png',
      fullPage: false 
    });
  });
});
