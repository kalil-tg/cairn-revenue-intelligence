import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'
import { readFile } from 'node:fs/promises'

const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']

async function expectNoAutomatedViolations(page: Page) {
  const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze()
  expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([])
}

test('controlled legacy dashboard exposes the expected automated baseline failures', async ({ page }) => {
  const fixture = await readFile(new URL('../audit/fixtures/legacy-dashboard.html', import.meta.url), 'utf8')
  await page.setContent(fixture)
  const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze()
  const ids = results.violations.map((violation) => violation.id)
  expect(ids).toEqual(expect.arrayContaining(['button-name', 'color-contrast', 'select-name']))
})

test('dashboard has a clean automated scan and keyboard-operable tabs', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'See the quarter before it happens.' })).toBeVisible()
  await expectNoAutomatedViolations(page)

  const forecastTab = page.getByRole('tab', { name: 'Forecast' }).first()
  await forecastTab.focus()
  await page.keyboard.press('ArrowRight')
  await expect(page.getByRole('tab', { name: 'Pipeline' }).first()).toBeFocused()
  await expect(page.getByText('€6.31M').first()).toBeVisible()
})

test('deal filters retain an explicit selected state and update the evidence panel', async ({ page }) => {
  await page.goto('/#product')
  await page.getByRole('group', { name: 'Filter open opportunities' }).getByRole('button', { name: /On track/ }).click()
  const northstar = page.getByRole('list', { name: /open opportunities/ }).getByRole('button', { name: /^Northstar Health/ })
  await expect(northstar).toHaveAttribute('aria-current', 'true')
  await expect(page.getByRole('heading', { name: 'Northstar Health' })).toBeVisible()
  await expect(page.getByText('Executive sponsor re-engaged and confirmed the decision timeline.')).toBeVisible()
})

test('request access reports errors, focuses the alert, and confirms success', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Request access' }).first().click()
  const dialog = page.getByRole('dialog', { name: 'Request access' })
  await expect(dialog).toBeVisible()
  await dialog.getByRole('button', { name: 'Request the preview' }).click()
  await expect(dialog.getByRole('alert')).toBeFocused()
  await dialog.getByRole('textbox', { name: 'Work email' }).fill('hello@example.com')
  await dialog.getByRole('combobox', { name: 'Role' }).selectOption({ label: 'Revenue operations' })
  await dialog.getByRole('button', { name: 'Request the preview' }).click()
  await expect(dialog.getByRole('heading', { name: 'You’re on the list.' })).toBeVisible()
  await expectNoAutomatedViolations(page)
})

test('skip link is first and mobile layout has no horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused()
  const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)
  expect(hasOverflow).toBe(false)
  await expectNoAutomatedViolations(page)
})
