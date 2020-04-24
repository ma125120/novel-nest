import { Injectable } from '@nestjs/common';
import { getUrl } from '@/common/util';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async search(name: string) {
    const baseurl = `/modules/article/search.php`;
    try {
      const $ = await getUrl(
        `${baseurl}?searchkey=${encodeURIComponent(name)}`,
      );

      const list = $('tbody tr:nth-child(n+2)');
      const novelList = [];
      list.each((_, v) => {
        const item = $(v).find('td');
        const obj = {
          name: item.eq(0).text(),
          url: item
            .eq(0)
            .find('a')
            .attr('href'),
          chapterUrl: item
            .eq(1)
            .find('a')
            .attr('href'),
          chapter: item
            .eq(1)
            .text()
            .trim(),
          author: item.eq(2).text(),
          words: item.eq(3).text(),
          updateTime: item.eq(4).text(),
          status: item.eq(5).text(),
        };
        novelList.push(obj);
      });

      return novelList;
    } catch (err) {
      console.log(err);
    }
  }

  async getChapter(url: string) {
    const $ = await getUrl(url);

    const list = $('.box_con #list')
      .find('dd+dt')
      .nextAll('dd');
    const novelList = [];
    list.each((_, v) => {
      const item = $(v).find('a');
      const obj = {
        name: item.text(),
        url: item.attr('href'),
      };
      novelList.push(obj);
    });

    return novelList;
  }
}
