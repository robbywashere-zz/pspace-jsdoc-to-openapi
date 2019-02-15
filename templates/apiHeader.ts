export const apiHeader = `
import { Response } from "superagent";
import * as request from "superagent";
export interface ResponseWithBody<T> extends Response {
  body: T;
}
export type RequestType = {
    path: string;
    method: string;
    bodyParams?: {};
    queryParams?: {};
  }
export type RequestFunction = <T>(req: RequestType) => Promise<ResponseWithBody<T>>;
`;
