import { Seeder } from "typeorm-seeding";
import RssParser from "rss-parser";
import News from "../entities/News";

let parser = new RssParser();

class NewsCrawler implements Seeder {
  public async run(): Promise<any> {
    let { items } = await parser.parseURL("https://www.fit.hcmus.edu.vn/vn/feed.aspx");
    let newsList = items.map(function (item) {
      let news = new News();
      news.title = item.title;
      news.content = item.content;
      news.preview = item.contentSnippet;
      news.link = item.link;
      news.date = new Date(item.isoDate);
      return news;
    });
    await Promise.allSettled(newsList.map((news) => news.save()));
  }
}

module.exports = {
  NewsCrawler,
};
