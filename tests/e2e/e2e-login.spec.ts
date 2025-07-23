import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { HomePage } from '../../page-objects/HomePage'

test.describe.parallel('Login / Logout flow', () => {
  let loginPage: LoginPage
  let homePage: HomePage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    homePage = new HomePage(page)
    await homePage.visit()
  })

  test('Negative Scenario for login', async ({ page }) => {
    await homePage.clickOnSignIn()
    await loginPage.login('invalid username', 'invalid password')
    await loginPage.assertErrorMessage()
  })

  test('Positive Scenario for login + logout', async ({ page }) => {
    await homePage.clickOnSignIn()
    await loginPage.login('username', 'password')
    await loginPage.wait(200)

    const summaryTab = page.locator('#account_summary_tab')
    await expect(summaryTab).toBeVisible()

    await page.click('a.dropdown-toggle:has-text("username")')
    await page.click('#logout_link')

    await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')
  })
})
