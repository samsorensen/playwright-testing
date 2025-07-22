import { test, expect } from '@playwright/test'

test.describe.parallel('Search Results', () => {
  test('Should find search results', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.fill('#searchTerm', 'bank')
    await page.keyboard.press('Enter')

    const numOfLinks = await page.locator('li > a')
    await expect(numOfLinks).toHaveCount(2)
  })
})
