"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrapperService = void 0;
const common_1 = require("@nestjs/common");
const process_1 = require("process");
const puppeteer = require("puppeteer");
let ScrapperService = class ScrapperService {
    constructor() { }
    async getTheCurrentElectricityPrice() {
        const currentPriceSelector = "#post-30921 > div > div.entry-content > figure:nth-child(8) > table > tbody > tr > td:nth-child(2)";
        const browser = await puppeteer.launch({
            headless: true,
        });
        const page = await browser.newPage();
        await page.goto(process_1.env.ELECTRIC_PRICE_API, {
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
        await page.goto(process_1.env.WATER_PRICE_API, {
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
};
ScrapperService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ScrapperService);
exports.ScrapperService = ScrapperService;
//# sourceMappingURL=scrapper.service.js.map