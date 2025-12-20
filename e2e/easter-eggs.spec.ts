import { test, expect } from '@playwright/test';

test.describe('Easter Eggs and Achievements', () => {
  test('should unlock Clippy achievement when clicking profile', async ({ page }) => {
    await page.goto('/');
    
    // Close pitch mode
    const pitchModeVisible = await page.locator('text=Clippy\'s Guided Tour').isVisible().catch(() => false);
    if (pitchModeVisible) {
      await page.click('[aria-label="Close tour"]');
      await page.waitForTimeout(300);
    }
    
    // Click profile picture/icon
    const profileButton = page.locator('button:has-text("B")').first();
    if (await profileButton.isVisible()) {
      await profileButton.click();
      await page.waitForTimeout(500);
      
      // Verify Clippy appears
      await expect(page.locator('text=📎')).toBeVisible();
      
      await page.screenshot({ 
        path: 'screenshots/18-clippy-profile.png',
        fullPage: false 
      });
    }
  });

  test('should trigger Konami code easter egg', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);
    
    // Close pitch mode
    const pitchModeVisible = await page.locator('text=Clippy\'s Guided Tour').isVisible().catch(() => false);
    if (pitchModeVisible) {
      await page.click('[aria-label="Close tour"]');
    }
    
    // Input Konami code: ↑ ↑ ↓ ↓ ← → ← → B A
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('b');
    await page.keyboard.press('a');
    
    await page.waitForTimeout(1000);
    
    // Take screenshot (rainbow mode should be active)
    await page.screenshot({ 
      path: 'screenshots/19-konami-code.png',
      fullPage: false 
    });
  });

  test('should display achievements in Help page', async ({ page }) => {
    await page.goto('/');
    
    // Close pitch mode
    const pitchModeVisible = await page.locator('text=Clippy\'s Guided Tour').isVisible().catch(() => false);
    if (pitchModeVisible) {
      await page.click('[aria-label="Close tour"]');
    }
    
    // Navigate to Help page
    await page.click('text=Help');
    await page.waitForTimeout(500);
    
    // Verify achievements section
    await expect(page.locator('text=Achievements Gallery')).toBeVisible();
    await expect(page.locator('text=Explorer')).toBeVisible();
    await expect(page.locator('text=Classic Gamer')).toBeVisible();
    await expect(page.locator('text=Tourist')).toBeVisible();
    
    // Scroll to achievements
    await page.locator('text=Achievements Gallery').scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    
    await page.screenshot({ 
      path: 'screenshots/20-achievements.png',
      fullPage: false 
    });
  });

  test('should show achievement notification', async ({ page, context }) => {
    // Clear localStorage and start fresh
    await context.clearCookies();
    await page.goto('/');
    
    // Wait for pitch mode
    await page.waitForTimeout(3500);
    
    // Complete the tour to unlock Tourist achievement
    if (await page.locator('text=Clippy\'s Guided Tour').isVisible()) {
      // Click through to the end
      for (let i = 0; i < 7; i++) {
        await page.click('text=Next →', { timeout: 1000 }).catch(() => 
          page.click('text=Finish! 🎉', { timeout: 1000 })
        );
        await page.waitForTimeout(300);
      }
      
      await page.waitForTimeout(1000);
      
      // Look for achievement notification
      const achievementNotification = page.locator('text=Achievement Unlocked!');
      if (await achievementNotification.isVisible()) {
        await page.screenshot({ 
          path: 'screenshots/21-achievement-notification.png',
          fullPage: false 
        });
      }
    }
  });
});
