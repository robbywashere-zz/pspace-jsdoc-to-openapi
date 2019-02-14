export const apiHeader = `
import request, { Response } from "superagent";
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
