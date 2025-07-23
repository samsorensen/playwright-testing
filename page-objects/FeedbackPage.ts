import { expect, Locator, Page } from '@playwright/test'

export class FeedbackPage {
  readonly page: Page
  readonly nameInput: Locator
  readonly emailInput: Locator
  readonly subjectInput: Locator
  readonly commentInput: Locator
  readonly clearButton: Locator
  readonly submitButton: Locator

  constructor(page: Page) {
    this.page = page
    this.nameInput = page.locator('#name')
    this.emailInput = page.locator('#email')
    this.subjectInput = page.locator('#subject')
    this.commentInput = page.locator('#comment')
    this.clearButton = page.locator('input[name="clear"]')
    this.submitButton = page.locator('input[name="submit"]')
  }

  async fillFeedbackForm(name: string, email: string, subject: string, comment: string) {
    await this.nameInput.fill(name)
    await this.emailInput.fill(email)
    await this.subjectInput.fill(subject)
    await this.commentInput.fill(comment)
  }

  async resetFeedbackForm() {
    await this.clearButton.click()
  }

  async submitFeedbackForm() {
    await this.submitButton.click()
  }

  async assertFeedbackFormReset() {
    await expect(this.nameInput).toBeEmpty()
    await expect(this.emailInput).toBeEmpty()
    await expect(this.subjectInput).toBeEmpty()
    await expect(this.commentInput).toBeEmpty()
  }

  async assertFeedbackFormSent() {
    await this.page.waitForSelector('.offset3.span6')
    const thankYouMessage = await this.page.locator('.offset3.span6')
    await expect(thankYouMessage).toContainText('Thank you for your comments')
  }
}