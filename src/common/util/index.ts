import { createHash } from 'crypto';
import axios from 'axios';
import * as cheerio from 'cheerio';
import * as iconv from 'iconv-lite';
import { HttpException } from '@nestjs/common';
const BASE_URL = `https://www.biquge5200.cc`;

export async function getUrl(url: string): Promise<CheerioStatic> {
  const baseurl = url.startsWith('http') ? '' : BASE_URL;
  // console.log(`请求url: ${baseurl}${url}`);

  try {
    // const time = Date.now();
    const { data } = await axios.get(`${baseurl}${url}`, {
      responseType: 'arraybuffer',
    });
    // console.log(`请求耗时： ${Date.now() - time}`);
    const html = iconv.decode(data, 'gbk');
    if (!html) {
      throw new HttpException(`响应为空`, 501);
    }
    const $ = cheerio.load(html);

    return $;
  } catch (err) {
    console.log(err);
  }
}

const encrypt = (algorithm: string, content: string): string => {
  const hash = createHash(algorithm);
  hash.update(content);
  return hash.digest('hex');
};

/**
 * @param {any} content
 *  @return {string}
 */
export const sha1 = content => encrypt('sha1', content);

export const md5 = content => encrypt('md5', content);
