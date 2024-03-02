import { readFileSync, writeFileSync } from 'fs';
import { generateSpec } from 'har-to-openapi';

(async () => {
  // read a har file from wherever you want - in this example its just a root json object
  // const har = await fs.readFile("my.har");

  const har = {
    log: {
      version: '1.2',
      creator: {
        name: 'WebInspector',
        version: '537.36',
      },
      pages: [],
      entries: [
        {
          _initiator: {
            type: 'preflight',
            url: 'http://localhost:8080/api/convert/pdf/to/pptx',
            requestId: '29548.1390',
          },
          _priority: 'High',
          _resourceType: 'preflight',
          cache: {},
          connection: '985075',
          request: {
            method: 'OPTIONS',
            url: 'http://localhost:8080/api/convert/pdf/to/pptx',
            httpVersion: 'HTTP/1.1',
            headers: [
              {
                name: 'Accept',
                value: '*/*',
              },
              {
                name: 'Accept-Encoding',
                value: 'gzip, deflate, br',
              },
              {
                name: 'Accept-Language',
                value: 'en-US,en;q=0.9',
              },
              {
                name: 'Access-Control-Request-Headers',
                value: 'authorization',
              },
              {
                name: 'Access-Control-Request-Method',
                value: 'POST',
              },
              {
                name: 'Cache-Control',
                value: 'no-cache',
              },
              {
                name: 'Connection',
                value: 'keep-alive',
              },
              {
                name: 'Host',
                value: 'localhost:8080',
              },
              {
                name: 'Origin',
                value: 'http://localhost:5173',
              },
              {
                name: 'Pragma',
                value: 'no-cache',
              },
              {
                name: 'Referer',
                value: 'http://localhost:5173/',
              },
              {
                name: 'Sec-Fetch-Dest',
                value: 'empty',
              },
              {
                name: 'Sec-Fetch-Mode',
                value: 'cors',
              },
              {
                name: 'Sec-Fetch-Site',
                value: 'same-site',
              },
              {
                name: 'User-Agent',
                value:
                  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 Edg/121.0.0.0',
              },
            ],
            queryString: [],
            cookies: [],
            headersSize: 573,
            bodySize: 0,
          },
          response: {
            status: 204,
            statusText: 'No Content',
            httpVersion: 'HTTP/1.1',
            headers: [
              {
                name: 'Access-Control-Allow-Headers',
                value: 'authorization',
              },
              {
                name: 'Access-Control-Allow-Methods',
                value: 'GET,HEAD,PUT,PATCH,POST,DELETE',
              },
              {
                name: 'Access-Control-Allow-Origin',
                value: '*',
              },
              {
                name: 'Connection',
                value: 'keep-alive',
              },
              {
                name: 'Content-Length',
                value: '0',
              },
              {
                name: 'Date',
                value: 'Fri, 16 Feb 2024 12:42:53 GMT',
              },
              {
                name: 'Keep-Alive',
                value: 'timeout=5',
              },
              {
                name: 'Vary',
                value: 'Access-Control-Request-Headers',
              },
              {
                name: 'X-Powered-By',
                value: 'Express',
              },
              {
                name: 'access-control-allow-headers',
                value: 'x-rq-Authorization',
              },
            ],
            cookies: [],
            content: {
              size: 0,
              mimeType: 'x-unknown',
              compression: 380,
            },
            redirectURL: '',
            headersSize: 380,
            bodySize: -380,
            _transferSize: 0,
            _error: null,
          },
          serverIPAddress: '[::1]',
          startedDateTime: '2024-02-16T12:42:53.793Z',
          time: 13.481999999523163,
          timings: {
            blocked: 4.933,
            dns: 0.019000000000000128,
            ssl: -1,
            connect: 0.9720000000000004,
            send: 0.19399999999999995,
            wait: 5.285000001475215,
            receive: 2.078999998047948,
            _blocked_queueing: -1,
          },
        },
      ],
    },
  };

  const openapi = await generateSpec(har, { relaxedMethods: true });
  const path = 'openapi.yaml';
  writeFileSync(path, openapi.yamlSpec);
})();
