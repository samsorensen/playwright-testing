import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'
import { Navbar } from '../../page-objects/components/Navbar'

test.describe.parallel('Pay Bills', () => {
  let homePage: HomePage
  let loginPage: LoginPage
  let navbar: Navbar

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)
    navbar = new Navbar(page)
    
    await homePage.visit()
    await homePage.clickOnSignIn()
    await loginPage.login('username', 'password')
  })

  test.only('Pay Bills', async ({ page }) => {
    await navbar.clickOnTab('Pay Bills')

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