import React from 'react';
// import { Provider } from 'react-redux';
// import { StaticRouter as Router, matchPath } from 'react-router';
import express from 'express';
import { renderToString } from 'react-dom/server';
import sourceMapSupport from 'source-map-support';
// import Helmet from 'react-helmet';
// import gzipStatic from 'connect-gzip-static';
import bodyParser from 'body-parser';
import path from 'path';

import webpack from 'webpack'; // eslint-disable-line global-require
import webpackConfig from '../../webpack.config';// eslint-disable-line global-require

import App from '../shared/App';
import renderFullPage from './markup/index';
// import NoMatch from '../shared/pages/NoMatch';
import config from './config';

require('console-stamp')(console, 'HH:MM:ss.l');

// cache time
const oneDay = 86400000;

const hash = Math.floor(Math.random() * 10000);

const routes = [
  '/',
  '/g/',
];

sourceMapSupport.install();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// const store = createStore();

// ****************************************
// This is the real hot meat of the example
// HOT RELOADING SHOULD ONLY BE USED IN DEV
// ****************************************
const isDeveloping = process.env.NODE_ENV === 'development';

const enableLocalStrategy = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';
// const enableLocalStrategy = true;

if (isDeveloping) {

  (function () { // eslint-disable-line func-names
    console.log('its dev')
    const compiler = webpack(webpackConfig);

    app.use(require('webpack-dev-middleware')(compiler, { //  eslint-disable-line global-require
      logLevel: 'warn', publicPath: webpackConfig.output.publicPath, // eslint-disable-line global-require
    }));

    app.use(require('webpack-hot-middleware')(compiler, { //  eslint-disable-line import/no-extraneous-dependencies,global-require
      log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000, //  eslint-disable-line no-console
    }));
  }());

  app.use('/static', express.static('dist'));
} else {
  app.use('/static', express.static('dist'));
  // app.use(gzipStatic(path.resolve('dist/static'), { maxAge: oneDay }));
}

app.disable('view cache');

// app.get('/healthcheck', (req, res) => {
//   res.send({ status: 'OK' });
// });
//
// app.get('/logout', (req, res) => {
//   req.logout();
//   res.redirect('/');
// });

/*

  ROUTES

*/
// app.get('*', (req, res) => {
app.get('*', (req, res) => {
  // const match = routes.reduce((acc, route) => matchPath(
  //   req.url, route, { exact: true },
  // ) || acc, null);
  //
  // // const headAssets = Helmet.rewind();
  //
  // if (!match) {
  //   res.status(404).send(renderFullPage(<div>no match</div>, {}));
  //   // res.status(404).send(renderFullPage(<div>no match</div>, {}, headAssets));
  //   return;
  // }


  const html = renderToString(
        <App />
  );

  const fullPage = renderFullPage(html, {}, {}, isDeveloping, hash);
  // const fullPage = renderFullPage(html, initialState, headAssets, isDeveloping, hash);
  res.send(fullPage);
});

app.listen(config.port, () => {
  console.log(`Running on http://localhost:${config.port}/`); //  eslint-disable-line no-console
});
