import { Injectable } from "@nestjs/common";
import { env } from 'process';
import * as puppeteer from "puppeteer";

@Injectable()
export class ScrapperService {
    constructor() { }


    async getTheCurrentElectricityPrice() {
        const currentPriceSelector = "#post-30921 > div > div.entry-content > figure:nth-child(8) > table > tbody > tr > td:nth-child(2)";
        const browser = await puppeteer.launch({
            headless: true,
        });
        const page = await browser.newPage();

        await page.goto(env.ELECTRIC_PRICE_API, {
            waitUntil: 'networkidle2'
        });

        const results = await page.evaluate(() => {
            return document.querySelector('#post-30921 > div > div.entry-content > figure:nth-child(8) > table > tbody > tr > td:nth-child(2)').textContent;
        });

        const price = results.split(' ')[0];
        browser.close();
        return price;
    }

    async getTheCurrentWaterPrice() {

        const browser = await puppeteer.launch({
            headless: true,
        });
        const page = await browser.newPage();

        await page.goto(env.WATER_PRICE_API, {
            waitUntil: 'networkidle2'
        });

        const results = await page.evaluate(() => {
            return {
                low: document.querySelector('#ReportContent > div > div > table > tbody > tr:nth-child(2) > td:nth-child(2) > span > span > span > span > span > span').textContent,
                high: document.querySelector('#ReportContent > div > div > table > tbody > tr:nth-child(2) > td:nth-child(3) > span > span > span > span > span > span').textContent,
            };
        });
        browser.close();
        return results;
    }

}

