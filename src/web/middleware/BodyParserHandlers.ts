import { NestMiddleware } from "@nestjs/common";
import { json, urlencoded } from "express";

export class JSONParserHandler implements NestMiddleware {
   use() {
      return json({ strict: false });
   }
}

export class URLEncodedParserHandler implements NestMiddleware {
   use() {
      return urlencoded({ extended: false, parameterLimit: 100 });
   }
}
