import { HTTPResponse } from './http_interfaces'

export type Presenter<R> = (inputModel: R) => HTTPResponse
