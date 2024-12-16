import puppeteer, { VanillaPuppeteer } from 'puppeteer-extra'
import RandomUserAgent from 'random-useragent'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import RecaptchaPlugin from 'puppeteer-extra-plugin-recaptcha'
import PortalPlugin from 'puppeteer-extra-plugin-portal'
import chalk from 'chalk'
import { Browser, Page, PuppeteerNode } from 'puppeteer'
import { createCursor, installMouseHelper } from 'ghost-cursor'
import fetch from 'node-fetch'
import { Utils } from '../utils/utils'
import { CHAT, GAME_FRAME, JOIN_BUTTON, ROOM } from '../constants/selectors'

function log(string: string) {
   console.log(chalk.blue('[reCaptcha]'), string)
}

/**
 * This module contains functions related to reCaptcha bypass for a swarm bot.
 *
 * @packageDocumentation
 */
export namespace reCaptcha {
   var browser: Browser
   var page: Page

   export async function initCaptchaSolver() {
      if (browser) {
         browser.close()
      }
      puppeteer.use(StealthPlugin())
      puppeteer.use(RecaptchaPlugin())
      // add portal plugin
      puppeteer.use(
         PortalPlugin({
            webPortalConfig: {
               listenOpts: {
                  port: 6970,
               },
               baseUrl: 'http://192.168.1.121:6970',
            },
         })
      )

      browser = await puppeteer.launch({
         // executablePath:
         //    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
         executablePath: '/usr/bin/google-chrome',
         headless: true,
         args: [
            `--window-size=${Math.floor(
               Math.random() * (2000 - 800 + 1) + 800
            )},${Math.floor(Math.random() * (1200 - 600 + 1) + 600)}`,
            '--disable-blink-features=AutomationControlled',
            // `--user-agent=${RandomUserAgent.getRandom()}`,
            `--no-sandbox`,
            `--disable-setuid-sandbox`,
            `--disable-infobars`,
            `--disable-web-security`,
            `--disable-features=site-per-process`,
            `--disable-dev-shm-usage`,
            `--disable-accelerated-2d-canvas`,
            `--disable-gpu`,
            `--disable-extensions`,
            `--disable-default-apps`,
            `--disable-sync`,
            `--disable-background-networking`,
            `--disable-translate`,
            `--disable-logging`,
            `--disable-extensions-file-access-check`,
            `--disable-component-update`,
            `--disable-component-extensions-with-background-pages`,
            `--disable-background-downloads`,
            `--disable-background-timer-throttling`,
            `--disable-device-discovery-notifications`,
            `--disable-desktop-notifications`,
            `--disable-features=TranslateUI`,
            `--disable-features=Translate`,
            `--disable-client-side-phishing-detection`,
            `--disable-popup-blocking`,
            `--disable-offer-store-unmasked-wallet-cards`,
            `--disable-offer-upload-credit-cards`,
            `--disable-features=AutofillEnableAccountWalletStorage`,
         ],
      })
      // Open a portal to get a link to it.
      page = await browser.newPage()
      const portalUrl = await page.openPortal()
      console.log('Portal URL:', portalUrl)
      log('Init completed')
      log('Loading JKLM.FUN...')
      await installMouseHelper(page)
      const cursor = createCursor(page)
      await page.goto('https://jklm.fun/', { waitUntil: 'domcontentloaded' })
      await new Promise((r) => setTimeout(r, 5000))
      await page.waitForSelector(ROOM)
      await cursor.click(ROOM)
      await page.waitForSelector(JOIN_BUTTON)
      await cursor.click(JOIN_BUTTON)
      // await page.screenshot({ path: 'test.png' });
      log('reCaptcha Service Ready !')

      setInterval(() => {
         cursor.moveTo({
            x: Math.random() * 1000 + 200,
            y: Math.random() * 1000 + 200,
         })
      }, Math.floor(Math.random() * 5000 + 800))
   }

   export async function resolveCaptcha() {
      try {
         const token = await page.evaluate(`
            new Promise((resolve) => {
               // This code will be executed within the page context
               grecaptcha.ready(() => {
                  grecaptcha.execute('6LdzYGslAAAAACxOZaQA5J0CxlfdJQUdWvJYoAFM', { action: 'joinRoom' }).then((token) => {
                     resolve(token);
                  });
               });
            });`)
         return token
      } catch (error) {
         return null
      }
   }
}
