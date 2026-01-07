import { test, expect } from '@playwright/test';

test.describe('Onboarding Flow - Welcome Card & Recruiter Tour', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage to simulate first visit
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.removeItem('welcome_seen_v2');
      localStorage.removeItem('tour_completed_v2');
    });
  });

  test('should display non-blocking welcome card on first visit', async ({ page }) => {
    await page.goto('/');

    // Wait for loading to complete
    await page.waitForTimeout(1000);

    // Wait for welcome card to appear
    await page.waitForSelector('text=Hi! I\'m Bruno', { timeout: 5000 });

    // Verify welcome card is visible
    await expect(page.locator('text=Hi! I\'m Bruno')).toBeVisible();
    await expect(page.locator('text=Start 60s tour')).toBeVisible();
    await expect(page.locator('text=Not now')).toBeVisible();

    // Verify it's non-blocking - no backdrop that covers the whole page
    const backdrop = page.locator('.fixed.inset-0.bg-black.bg-opacity-50');
    await expect(backdrop).not.toBeVisible();

    // Verify tabs are still accessible
    await expect(page.locator('text=Summary')).toBeVisible();
    await expect(page.locator('text=Experience')).toBeVisible();

    // Take screenshot
    await page.screenshot({
      path: 'screenshots/onboarding-01-welcome-card.png',
      fullPage: false,
    });
  });

  test('should dismiss welcome card with "Not now" button', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1000);
    await page.waitForSelector('text=Hi! I\'m Bruno', { timeout: 5000 });

    // Click "Not now"
    await page.click('text=Not now');
    await page.waitForTimeout(500);

    // Verify welcome card is dismissed
    await expect(page.locator('text=Hi! I\'m Bruno')).not.toBeVisible();

    // Verify localStorage was set
    const welcomeSeen = await page.evaluate(() => localStorage.getItem('welcome_seen_v2'));
    expect(welcomeSeen).toBe('true');
  });

  test('should dismiss welcome card with ESC key', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1000);
    await page.waitForSelector('text=Hi! I\'m Bruno', { timeout: 5000 });

    // Press ESC
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);

    // Verify welcome card is dismissed
    await expect(page.locator('text=Hi! I\'m Bruno')).not.toBeVisible();

    // Verify localStorage was set
    const welcomeSeen = await page.evaluate(() => localStorage.getItem('welcome_seen_v2'));
    expect(welcomeSeen).toBe('true');
  });

  test('should not show welcome card on subsequent visits', async ({ page }) => {
    // First visit
    await page.goto('/');
    await page.waitForTimeout(1000);
    await page.waitForSelector('text=Hi! I\'m Bruno', { timeout: 5000 });
    await page.click('text=Not now');
    await page.waitForTimeout(500);

    // Reload page
    await page.reload();
    await page.waitForTimeout(2000);

    // Welcome card should not appear
    await expect(page.locator('text=Hi! I\'m Bruno')).not.toBeVisible();
  });

  test('should start recruiter tour from welcome card', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1000);
    await page.waitForSelector('text=Hi! I\'m Bruno', { timeout: 5000 });

    // Click "Start 60s tour"
    await page.click('text=Start 60s tour');
    await page.waitForTimeout(500);

    // Verify welcome card is dismissed
    await expect(page.locator('text=Hi! I\'m Bruno')).not.toBeVisible();

    // Verify recruiter tour starts
    await expect(page.locator('text=Recruiter Tour')).toBeVisible();
    await expect(page.locator('text=1 of 4')).toBeVisible();

    // Take screenshot
    await page.screenshot({
      path: 'screenshots/onboarding-02-recruiter-tour-start.png',
      fullPage: false,
    });
  });

  test('should navigate through all recruiter tour steps', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1000);
    await page.waitForSelector('text=Hi! I\'m Bruno', { timeout: 5000 });
    await page.click('text=Start 60s tour');
    await page.waitForTimeout(1000);

    // Step 1: Professional Summary
    await expect(page.locator('text=Professional Summary')).toBeVisible();
    await page.waitForTimeout(1500); // Wait for typing animation
    await page.click('text=Next');
    await page.waitForTimeout(500);

    // Step 2: Experience & Leadership
    await expect(page.locator('text=Experience & Leadership')).toBeVisible();
    await expect(page.locator('text=2 of 4')).toBeVisible();
    await page.waitForTimeout(1500);
    await page.click('text=Next');
    await page.waitForTimeout(500);

    // Step 3: Key Projects & Impact
    await expect(page.locator('text=Key Projects & Impact')).toBeVisible();
    await expect(page.locator('text=3 of 4')).toBeVisible();
    await page.screenshot({
      path: 'screenshots/onboarding-03-recruiter-tour-step3.png',
      fullPage: false,
    });
    await page.waitForTimeout(1500);
    await page.click('text=Next');
    await page.waitForTimeout(500);

    // Step 4: Ready to Collaborate
    await expect(page.locator('text=Ready to Collaborate')).toBeVisible();
    await expect(page.locator('text=4 of 4')).toBeVisible();
    await page.waitForTimeout(1500);

    // Finish button should be visible
    await expect(page.locator('text=Finish')).toBeVisible();
  });

  test('should complete tour and set localStorage flag', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1000);
    await page.waitForSelector('text=Hi! I\'m Bruno', { timeout: 5000 });
    await page.click('text=Start 60s tour');
    await page.waitForTimeout(1000);

    // Navigate through all steps quickly
    for (let i = 0; i < 3; i++) {
      await page.waitForTimeout(1500);
      await page.click('text=Next');
      await page.waitForTimeout(500);
    }

    // Click Finish on last step
    await page.waitForTimeout(1500);
    await page.click('text=Finish');
    await page.waitForTimeout(500);

    // Verify tour is closed
    await expect(page.locator('text=Recruiter Tour')).not.toBeVisible();

    // Verify localStorage was set
    const tourCompleted = await page.evaluate(() => localStorage.getItem('tour_completed_v2'));
    expect(tourCompleted).toBe('true');
  });

  test('should skip tour with Skip button', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1000);
    await page.waitForSelector('text=Hi! I\'m Bruno', { timeout: 5000 });
    await page.click('text=Start 60s tour');
    await page.waitForTimeout(1000);

    // Click Skip button
    await page.click('text=Skip');
    await page.waitForTimeout(500);

    // Verify tour is closed
    await expect(page.locator('text=Recruiter Tour')).not.toBeVisible();

    // Tour completion flag should NOT be set when skipping
    const tourCompleted = await page.evaluate(() => localStorage.getItem('tour_completed_v2'));
    expect(tourCompleted).not.toBe('true');
  });

  test('should skip tour with ESC key', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1000);
    await page.waitForSelector('text=Hi! I\'m Bruno', { timeout: 5000 });
    await page.click('text=Start 60s tour');
    await page.waitForTimeout(1000);

    // Press ESC
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);

    // Verify tour is closed
    await expect(page.locator('text=Recruiter Tour')).not.toBeVisible();
  });

  test('should navigate backwards in tour', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1000);
    await page.waitForSelector('text=Hi! I\'m Bruno', { timeout: 5000 });
    await page.click('text=Start 60s tour');
    await page.waitForTimeout(1500);

    // Go to step 2
    await page.click('text=Next');
    await page.waitForTimeout(1500);
    await expect(page.locator('text=2 of 4')).toBeVisible();

    // Go back to step 1
    await page.click('text=← Back');
    await page.waitForTimeout(500);
    await expect(page.locator('text=1 of 4')).toBeVisible();
    await expect(page.locator('text=Professional Summary')).toBeVisible();
  });

  test('should start tour manually from Help page', async ({ page }) => {
    // Set localStorage to skip welcome card
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem('welcome_seen_v2', 'true');
    });
    await page.reload();
    await page.waitForTimeout(1000);

    // Navigate to Help page
    await page.click('text=Help');
    await page.waitForTimeout(500);

    // Click "Start Guided Tour" button on Help page
    await page.click('text=Start Guided Tour with Clippy');
    await page.waitForTimeout(500);

    // Verify tour starts
    await expect(page.locator('text=Recruiter Tour')).toBeVisible();
  });
});
