import { test, expect } from '@playwright/test'

test.describe.parallel('Submit Feedback Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.click('#feedback')
  })

  test('Reset feedback form', async ({ page }) => {
    await page.fill('#name', 'Johne Doe')
    await page.fill('#email', 'john.doe@example.com')
    await page.fill('#subject', 'Test Subject')
    await page.fill('#comment', 'Test Comment')

    await page.click('input[name="clear"]')
    const nameInput = await page.locator('#name')
    const emailInput = await page.locator('#email')
    const subjectInput = await page.locator('#subject')
    const commentInput = await page.locator('#comment')

    await expect(nameInput).toBeEmpty()
    await expect(emailInput).toBeEmpty()
    await expect(subjectInput).toBeEmpty()
    await expect(commentInput).toBeEmpty()
  })

  test('Submit feedback form', async ({ page }) => {
    await page.fill('#name', 'Johne Doe')
    await page.fill('#email', 'john.doe@example.com')
    await page.fill('#subject', 'Test Subject')
    await page.fill('#comment', 'Test Comment')

    await page.click('input[name="submit"]')

    await page.waitForSelector('.offset3.span6')
    const thankYouMessage = await page.locator('.offset3.span6')
    await expect(thankYouMessage).toContainText('Thank you for your comments, Johne Doe.')
  })
})
