import { expect, Locator, Page } from '@playwright/test'
import { AbstractPage } from './AbstractPage'

export class LoginPage extends AbstractPage {
  readonly usernameInput: Locator
  readonly passwordInput: Locator
  readonly submitButton: Locator
  readonly errorMessage: Locator

  constructor(page: Page) {
    super(page)
    this.usernameInput = page.locator('#user_login')
    this.passwordInput = page.locator('#user_password')
    this.submitButton = page.locator('text=Sign in')
    this.errorMessage = page.locator('.alert-error')
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username)
    await this.passwordInput.fill(password)
    await this.submitButton.click()

    await this.page.waitForTimeout(200)
    await this.page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')
  }
  
  async assertErrorMessage() {
    const alertMessage = await this.page.locator('.alert-error')
    await expect(alertMessage).toContainText('Login and/or password are wrong.')
  }
}