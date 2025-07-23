import { test, expect } from '@playwright/test'
import { FeedbackPage } from '../../page-objects/FeedbackPage'
import { HomePage } from '../../page-objects/HomePage'

test.describe.parallel('Submit Feedback Form', () => {
  let feedbackPage: FeedbackPage
  let homePage: HomePage

  test.beforeEach(async ({ page }) => {
    feedbackPage = new FeedbackPage(page)
    homePage = new HomePage(page)

    await homePage.visit()
    await homePage.clickOnFeedbackLink()
  })

  test('Reset feedback form', async ({ page }) => {
    await feedbackPage.fillFeedbackForm('Johne Doe', 'john.doe@example.com', 'Test Subject', 'Test Comment')
    await feedbackPage.resetFeedbackForm()
    await feedbackPage.assertFeedbackFormReset()
  })

  test('Submit feedback form', async ({ page }) => {
    await feedbackPage.fillFeedbackForm('Johne Doe', 'john.doe@example.com', 'Test Subject', 'Test Comment')
    await feedbackPage.submitFeedbackForm()
    await feedbackPage.assertFeedbackFormSent()
  })
})
