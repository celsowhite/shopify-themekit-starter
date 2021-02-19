/*
 |--------------------------------------------------------------------------
 | Browser-sync config file
 |--------------------------------------------------------------------------
 |
 | For up-to-date information about the options:
 |   http://www.browsersync.io/docs/options/
 |
 | There are more options than you see here, these are just the ones that are
 | set internally. See the website for more info.
 |
 |
 */

// Imports
const fs = require('fs');
const os = require('os');
const path = require('path');
const yaml = require('js-yaml');

// Generate the proxy url using settings from the theme kit config.
const config = yaml.load(fs.readFileSync('config.yml', 'utf8'));
const environment = process.env.NODE_ENV;
const environmentSettings = config[environment];
const proxyUrl = `https://${environmentSettings.store}?preview_theme_id=${environmentSettings.theme_id}`;

module.exports = {
  ui: {
    port: 3001,
  },
  files: './theme.update',
  watchEvents: ['change'],
  watch: false,
  ignore: [],
  single: false,
  watchOptions: {
    ignoreInitial: true,
  },
  server: false,
  proxy: proxyUrl,
  port: 3000,
  https: {
    key: path.resolve(os.homedir(), '.localhost_ssl/server.key'),
    cert: path.resolve(os.homedir(), '.localhost_ssl/server.crt'),
  },
  middleware: false,
  serveStatic: [],
  ghostMode: {
    clicks: true,
    scroll: true,
    location: true,
    forms: {
      submit: true,
      inputs: true,
      toggles: true,
    },
  },
  logLevel: 'info',
  logPrefix: 'Browsersync',
  logConnections: false,
  logFileChanges: true,
  logSnippet: true,
  rewriteRules: [],
  open: 'local',
  browser: 'default',
  cors: false,
  xip: false,
  hostnameSuffix: false,
  reloadOnRestart: false,
  notify: true,
  scrollProportionally: true,
  scrollThrottle: 0,
  scrollRestoreTechnique: 'window.name',
  scrollElements: [],
  scrollElementMapping: [],
  reloadDelay: 1300,
  reloadDebounce: 500,
  reloadThrottle: 0,
  plugins: [],
  injectChanges: true,
  startPath: null,
  minify: true,
  host: null,
  localOnly: false,
  codeSync: true,
  timestamps: true,
  clientEvents: [
    'scroll',
    'scroll:element',
    'input:text',
    'input:toggles',
    'form:submit',
    'form:reset',
    'click',
  ],
  socket: {
    socketIoOptions: {
      log: false,
    },
    socketIoClientConfig: {
      reconnectionAttempts: 50,
    },
    path: '/browser-sync/socket.io',
    clientPath: '/browser-sync',
    namespace: '/browser-sync',
    clients: {
      heartbeatTimeout: 5000,
    },
  },
  injectNotification: false,
  // Need to place the Browsersync snippet before the closing body tag due to how shopify injects analytics scripts.
  snippetOptions: {
    rule: {
      match: /<\/body>/i,
      fn: function(snippet, match) {
        return snippet + match;
      },
    },
  },
};
