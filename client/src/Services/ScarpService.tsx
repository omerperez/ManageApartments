import rp from "request-promise";
import cheerio, { AnyNode } from "cheerio";
const ELECTRIC_COMPANY_URL =
  "https://www.iec.co.il/content/tariffs/contentpages/homeelectricitytariff";
const scrapNews = () => {
  rp(ELECTRIC_COMPANY_URL)
    .then((html: string | AnyNode | AnyNode[] | Buffer) => {
      let names: string[] = [];
      let $ = cheerio.load(html);

      // find what element ids, classes, or tags you want from opening console in the browser
      // cheerio library lets you select elements similar to querySelector
      $(
        "_ngcontent-xri-c356 td table-data rich-text ng-star-inserted width: 33.3333%",
      ).each(function (i, element) {
        let name = $(this).prepend().text();
        names.push(name);
      });
      console.log(names);
    })
    .catch(function (err) {
      console.log("crawl failed");
    });
};

export { scrapNews };
