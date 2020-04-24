# About

SFY is a simple library for building web sites.


## Project file structure:

```
.
+-- package.json
+-- index.html
+-- /src
|   +-- /assets
|   +-- /blog
|       +-- 04-24-2020&blog1.md
|   +-- /styles
|       +-- style.scss
```

When building a web site, SCSS files will be converted to  CSS, Markdown files will be converted to HTML files and your assets directory, where you can save your fonts, images, icons etc, will be moved over to dist folder.  

## Quickstart

You can clone our quickstart project:
```
git clone https://github.com/BrsJsk/sfy-quickstart
cd sfy-quickstart
npm install
npm run build:dev
```

Quickstart project preview: https://keen-swanson-66c35f.netlify.app/