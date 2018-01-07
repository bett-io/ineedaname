'use strict';

const express = require('express');
const path = require('path');

import bodyParser from 'body-parser';
import { getGoodServiceNameProbs } from '../src/data/goodServiceNameProbs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import createReduxStore from '../modules/store';

import App from '../src/containers/App';

const file = 'server/app.js';

const app = express();

app.use(bodyParser.json()); // for parsing POST body
app.use(express.static(path.join(__dirname, './public')));

app.get('*', (req, res) => {
  console.log({ function:'app.get', req: { url: req.url } });

  const context = {};

  const store = createReduxStore({
    goodServiceNameProb1: getGoodServiceNameProbs(1),
    goodServiceNameProb2: getGoodServiceNameProbs(2),
  });

  const appHtml = renderToString(
    <Provider store={store}>
      <StaticRouter
        location={req.url}
        context={context}>
        <App/>
      </StaticRouter>
    </Provider>
  );

  if (context.url) {
    res.redirect(302, context.url);
  } else {
    res.send(renderPage(appHtml, store.getState()));
  }
});

function renderPage(appHtml, initialState) {
  return `
    <!doctype html public="storage">
    <html>
    <meta charset=utf-8/>
    <title>helloworld-lambda-web</title>
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css">
    <div id=app>${appHtml}</div>
    <script>
      window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
    </script>
    <script src="/bundle.js"></script>
  `;
}

// Export your express server so you can import it in the lambda function.
module.exports = app;
