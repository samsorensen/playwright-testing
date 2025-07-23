import { Locator, Page } from '@playwright/test'

export class Navbar {
  readonly page: Page
  readonly accountSumary: Locator
  readonly accountActivity: Locator
  readonly trasnferFunds: Locator
  readonly payBills: Locator
  readonly myMoneyApp: Locator
  readonly onlineStatements: Locator

  constructor(page: Page) {
    this.page = page
    this.accountSumary = page.locator('#account_summary_tab')
    this.accountActivity = page.locator('#account_activity_tab')
    this.trasnferFunds = page.locator('#transfer_funds_tab')
    this.payBills = page.locator('#pay_bills_tab')
    this.myMoneyApp = page.locator('#money_map_tab')
    this.onlineStatements = page.locator('#online_statements_tab')
  }

  async clickOnTab(tabName: string) {
    switch (tabName) {
      case 'Account Summary':
        await this.accountSumary.click()
        break
      case 'Account Activity':
        await this.accountActivity.click()
        break
      case 'Transfer Funds':
        await this.trasnferFunds.click()
        break
      case 'Pay Bills':
        await this.payBills.click()
        break
      case 'My Money App':
        await this.myMoneyApp.click()
        break
      case 'Online Statements':
        await this.onlineStatements.click()
        break
      default:
        throw new Error(`Tab ${tabName} not found`)
    }
  }
}