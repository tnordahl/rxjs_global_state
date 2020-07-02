import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';
import sourceMapSupport from 'source-map-support';

import webpack from 'webpack'; // eslint-disable-line global-require


const webpackConfig = require('../../webpack.config');// eslint-disable-line global-require
// import * as webpackConfig from '../../webpack.config';// eslint-disable-line global-require

import App from '../shared/App';
import renderFullPage from './markup/index';
import config from './config';

require('console-stamp')(console, 'HH:MM:ss.l');

const hash = Math.floor(Math.random() * 10000);

sourceMapSupport.install();

const app = express();

const isDeveloping = process.env.NODE_ENV === 'development';

if (isDeveloping) {

  (function () { // eslint-disable-line func-names
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
  app.use('/', express.static('dist'));
}

app.disable('view cache');


app.get('*', (req, res) => {
  const html = renderToString(
        <App />
  );

  const fullPage = renderFullPage(html, isDeveloping, hash);
  res.send(fullPage);
});

app.listen(config.port, () => {
  console.log(`Running on http://localhost:${config.port}/`); //  eslint-disable-line no-console
});
