/* eslint-disable */
import serialize from 'serialize-javascript';

function renderFullPage(html, isDeveloping, hash) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>RxJS state</title>
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="viewport" content ="width=device-width,initial-scale=1,user-scalable=yes" />
        ${!isDeveloping ? `<link href="./main.css?${hash}" rel="stylesheet"/>` : ''}
        <link href="./main.css?${hash}" rel="stylesheet"/>
        <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
      </head>
      <body>
        <div id="root">${html}</div>
        <script defer src="./bundle.js"></script>
      </body>
    </html>
`;
}

export default renderFullPage;
