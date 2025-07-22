import { test, expect } from '@playwright/test'

test.describe.parallel('Transfer Funds', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/index.html')

    await page.click('#signin_button')
    await page.fill('#user_login', 'username')
    await page.fill('#user_password', 'password')
    await page.click('text=Sign in')

    await page.waitForTimeout(200)
    await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')
  })
  
  test('Transfer Funds', async ({ page }) => {
    await page.selectOption('#tf_fromAccountId', '2')
    await page.selectOption('#tf_toAccountId', '3')
    await page.fill('#tf_amount', '500')    
    await page.fill('#tf_description', 'Test Description')

    await page.click('#btn_submit')

    const boardHeader = await page.locator('h2.board-header')
    await expect(boardHeader).toContainText('Verify')

    await page.click('#btn_submit')
    const successMessage = await page.locator('.alert-success')
    await expect(successMessage).toContainText('You successfully submitted your transaction')
  })

})