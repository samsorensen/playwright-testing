import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'

test.describe.parallel('Search Results', () => {
  let homePage: HomePage

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    await homePage.visit()
  })

  test('Should find search results', async ({ page }) => {
    await homePage.fillSearchBox('bank')
    const numOfLinks = await page.locator('li > a')
    await expect(numOfLinks).toHaveCount(2)
  })
})
