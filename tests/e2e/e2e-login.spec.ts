import { test, expect } from '@playwright/test'

test.describe.parallel('Login / Logout flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/')
  })

  test('Negative Scenario for login', async ({ page }) => {
    await page.click('#signin_button')
    await page.fill('#user_login', 'invalid username')
    await page.fill('#user_password', 'invalid password')
    await page.click('text=Sign in')
    
    const alertMessage = await page.locator('.alert-error')
    await expect(alertMessage).toContainText('Login and/or password are wrong.')
  })

  test('Positive Scenario for login + logout', async ({ page }) => {
    await page.click('#signin_button')
    await page.fill('#user_login', 'username')
    await page.fill('#user_password', 'password')
    await page.click('text=Sign in')

    await page.waitForTimeout(200)
    await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')

    const summaryTab = page.locator('#account_summary_tab')
    await expect(summaryTab).toBeVisible()

    await page.click('a.dropdown-toggle:has-text("username")')
    await page.click('#logout_link')

    await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')
  })
})