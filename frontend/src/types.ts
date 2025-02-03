export interface ShortenResponse {
  longUrl: string;
  shortUrl: string;
  urlCode: string;
  date: string;
}

export interface UrlStats {
  longUrl: string;
  shortUrl: string;
  clicks: number;
  urlCode: string;
  date: string;
}