import { chromium } from '@playwright/test'
import { mkdir } from 'node:fs/promises'

const output = new URL('../screenshots/', import.meta.url)
await mkdir(output, { recursive: true })

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1536, height: 1024 }, deviceScaleFactor: 1 })
await page.goto('http://127.0.0.1:4174/', { waitUntil: 'networkidle' })

await page.screenshot({ path: new URL('01-hero-desktop.png', output).pathname.slice(1) })
await page.locator('.workflow-section').screenshot({ path: new URL('02-workflow-desktop.png', output).pathname.slice(1) })
await page.locator('.product-section').screenshot({ path: new URL('03-product-desktop.png', output).pathname.slice(1) })
await page.locator('.use-cases-section').click({ position: { x: 700, y: 500 } })
await page.locator('.use-cases-section').screenshot({ path: new URL('04-use-cases-desktop.png', output).pathname.slice(1) })
await page.locator('.final-section').screenshot({ path: new URL('05-final-desktop.png', output).pathname.slice(1) })

await page.setViewportSize({ width: 390, height: 844 })
await page.goto('http://127.0.0.1:4174/', { waitUntil: 'networkidle' })
await page.screenshot({ path: new URL('06-hero-mobile.png', output).pathname.slice(1) })

await browser.close()
