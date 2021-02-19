# Shopify Theme Kit Starter

Modern Shopify theme setup. Includes:

- Base starter theme with basic styling of the key pages.
- Vue JS cart functionality. I love Vue JS x Shopify. The two technologies work really well together to create dynamic state based updates to your site.
- [Theme Kit](https://shopify.dev/tools/theme-kit) integration to sync code to multiple theme environments.
- [Browsersync](https://browsersync.io/) for local development and auto site refreshes triggered by code changes (including liquid files).
- Modular js, ES6+ syntax usage and a single minfied bundle for all js and plugins.
- Modular scss. Including postcss processing (autoprefixing, imports, minification and optimization.)

## Requirements

- Node.js
- NPM
- [Theme Kit](https://shopify.dev/tools/theme-kit/getting-started)
- [Mkcert](https://www.npmjs.com/package/mkcert) (to generate local ssl certificates)

## Getting Started

1. Download the repo and install the packages.

```bash
git clone https://github.com/celsowhite/shopify-themekit-starter.git
npm install
```

2. Rename config-sample.yml to config.yml and enter your private app details. See [here](https://shopify.dev/tools/theme-kit/getting-started) for instructions on how to setup theme kit.
3. Generate a local ssl certificate so you can securely run that site on https://localhost:3000. Follow the instructions [here](https://github.com/Shopify/slate/wiki/4.-Create-a-self-signed-SSL-certificate) for creating a self signed SSL certificate with mkcert.

## Developing Locally

To work on the theme locally run:

```bash
npm run watch
```

This will:

- Auto watch all files within the theme folder and upload them to your development theme on shopify's servers.
- Compile your scripts and styles into minified files and output them to the assets folder.
- Start browsersyncs local server and proxy your development theme preview. Upon changes to files, the site will auto reload.

## Building for Production

To create an optimized production build based on environment, run:

```bash
npm run [deploy] or [deploy-production]
```
