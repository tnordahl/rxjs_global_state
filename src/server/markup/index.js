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
        ${!isDeveloping ? `<link href="/styles.css?${hash}" rel="stylesheet"/>` : ''}
        <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
      </head>
      <body>
        <div id="root">${html}</div>
        <script defer src="./main.bundle.js"></script>
        <script defer src="./bundle.js"></script>
      </body>
    </html>
`;
}
// function renderFullPage(html, preloadedState, headAssets, isDeveloping, hash) {
//   return `
//     <!doctype html>
//     <html>
//       <head>
//         <title>RxJS state</title>
//         ${headAssets.title.toString()}
//         ${headAssets.meta.toString()}
//         ${headAssets.link.toString()}
//         <meta name="apple-mobile-web-app-capable" content="yes">
//         <meta name="viewport" content ="width=device-width,initial-scale=1,user-scalable=yes" />
//         ${!isDeveloping ? `<link href="/styles.css?${hash}" rel="stylesheet"/>` : ''}
//         <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
//         <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
//       </head>
//       <body>
//         <div id="root">${html}</div>
//         <script>
//           // WARNING: See the following for security issues around embedding JSON in HTML:
//           // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
//           window.__PRELOADED_STATE__ = ${serialize(preloadedState, { isJSON: true })}
//         </script>
//         <script defer src="/vendor.js?${hash}"></script>
//         <script defer src="/commons.js?${hash}"></script>
//         <script defer src="/client.js?${hash}"></script>
//       </body>
//     </html>
// `;
// }

export default renderFullPage;
