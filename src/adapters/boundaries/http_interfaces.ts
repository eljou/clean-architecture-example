export interface HTTPRequest<T> {
  path: string
  method: string
  headers?: {
    [key: string]: string | number
  }
  params?: {
    [key: string]: string | number
  }
  query?: {
    [key: string]: string | number
  }
  body: T
}

export interface HTTPResponse {
  body: object
  statusCode: number
}

/* 
body: req.body,
query: req.query,
params: req.params,
ip: req.ip,
method: req.method,
path: req.path,
headers: {
	'Content-Type': req.get('Content-Type'),
	Referer: req.get('referer'),
	'User-Agent': req.get('User-Agent')
}
*/
