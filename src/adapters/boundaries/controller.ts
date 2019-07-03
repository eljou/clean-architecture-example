import { HTTPRequest, HTTPResponse } from './http_interfaces'

export type Controller<T> = (request: HTTPRequest<T>) => HTTPResponse | Promise<HTTPResponse>
