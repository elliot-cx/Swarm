import {Page, executablePath } from 'puppeteer';
import chalk from 'chalk';
import puppeteer from 'puppeteer-core';

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
        browser = await puppeteer.launch({ executablePath: executablePath() });
        log("Init completed");
        log("Loading JKLM.FUN...");
        page = await browser.newPage();
        await page.setViewport({ width: 1080, height: 1024 });
        await page.goto('https://jklm.fun/FUCK',{
            waitUntil: "domcontentloaded"
        });
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