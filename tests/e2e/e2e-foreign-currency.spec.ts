import { test, expect } from '@playwright/test'

test.describe.parallel('Pay Bills', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/index.html')

    await page.click('#signin_button')
    await page.fill('#user_login', 'username')
    await page.fill('#user_password', 'password')
    await page.click('text=Sign in')

    await page.waitForTimeout(200)
    await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')
  })

  test.only('Pay Bills', async ({ page }) => {
    await page.click('#pay_bills_tab')
    await page.click('text=Purchase Foreign Currency')

    await page.selectOption('#pc_currency', 'Australia (dollar)')
    await page.fill('#pc_amount', '250')
    await page.click('#pc_inDollars_false')

    await page.click('#pc_calculate_costs')
    const conversionAmount = await page.locator('#pc_conversion_amount')
    await expect(conversionAmount).toContainText('250.00 dollar (AUD) =')

    await page.click('#purchase_cash')
    const successMessage = await page.locator('#alert_content')
    await expect(successMessage).toContainText('Foreign currency cash was successfully purchased')
  })
})