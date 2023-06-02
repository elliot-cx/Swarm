import puppeteer from 'puppeteer-extra';
import RandomUserAgent from 'random-useragent';
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import RecaptchaPlugin from 'puppeteer-extra-plugin-recaptcha';
import chalk from 'chalk';
import { Page } from 'puppeteer';
import fetch from 'node-fetch';
import { Utils } from '../utils/utils';

function log(string: string) {
    console.log(chalk.blue("[reCaptcha]"), string);
}

/**
 * This module contains functions related to reCaptcha bypass for a swarm bot.
 *
 * @packageDocumentation
 */
export namespace reCaptcha {

    var browser: any;
    var page: Page;

    export async function initCaptchaSolver() {
        puppeteer.use(StealthPlugin());
        puppeteer.use(RecaptchaPlugin())
        browser = await puppeteer.launch({ 
            executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", 
            headless:false,
            args: [
                `--window-size=${Math.floor(Math.random() * (2000 - 800 + 1) + 800)},${Math.floor(Math.random() * (1200 - 600 + 1) + 600)}`,
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
                `--disable-features=AutofillEnableAccountWalletStorage`
              ] 
        });
        log("Init completed");
        log("Loading JKLM.FUN...",);
        page = await browser.newPage();
        await page.goto("https://jklm.fun/",{
            waitUntil: "domcontentloaded"
        });
        await new Promise(r => setTimeout(r, 5000));
        await page.waitForSelector("body > div > div.home.page > div.publicRooms.section > div.listContainer > div.list > a:nth-child(2)");
        await page.click("body > div > div.home.page > div.publicRooms.section > div.listContainer > div.list > a:nth-child(2)");
        // await page.waitForSelector("body > div > div.home.page > div.columns.section > div.left > div > form > div.line > button");
        // await page.click("body > div > div.home.page > div.columns.section > div.left > div > form > div.line > button");
        log("reCaptcha Service Ready !");
    }

    export async function resolveCaptcha() {
        // await page.waitForFunction()
        const token = await page.evaluate(`
        new Promise((resolve) => {
            // This code will be executed within the page context
            grecaptcha.ready(() => {
                grecaptcha.execute('6LdzYGslAAAAACxOZaQA5J0CxlfdJQUdWvJYoAFM', { action: 'joinRoom' }).then((token) => {
                    resolve(token);
                });
            });
        });`);
        return token;
    }
}


// log("Loading JKLM.FUN...",);
// page = await browser.newPage();
// await page.goto("https://jklm.fun/",{
//     waitUntil: "domcontentloaded"
// });
// const token = await page.evaluate(`
// settings.nickname = "Swarm";
// saveSettings();
// return userToken;
// `);
// const res = await fetch("https://jklm.fun/api/startRoom",{
//     method: 'POST', 
//     body: JSON.stringify({
//         name: "Chez Swarm",
//         isPublic: false,
//         gameId: "bombparty",
//         creatorUserToken: token
//     })
// }).then((res)=>res.json());
// console.log(res);