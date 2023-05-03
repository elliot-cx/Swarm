import puppeteer from 'puppeteer-extra';
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
        browser = await puppeteer.launch({ executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", headless:true });
        log("Init completed");
        log("Loading JKLM.FUN...",);
        page = await browser.newPage();
        await page.goto("https://jklm.fun/",{
            waitUntil: "domcontentloaded"
        });
        await page.waitForSelector("body > div > div.home.page > div.publicRooms.section > div.listContainer > div.list > a:nth-child(1)");
        await page.click("body > div > div.home.page > div.publicRooms.section > div.listContainer > div.list > a:nth-child(1)");
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