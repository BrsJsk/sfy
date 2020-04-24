const { src, dest } = require("gulp");
const clean = require("gulp-clean");
const htmlmin = require("gulp-htmlmin");
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
const markdown = require("gulp-markdown");
const { modifyContentFiles } = require("./modify-content-files");
const { modifyBlogFiles } = require("./modify-blog-files");

sass.compiler = require("node-sass");

function cleanDist() {
    return new Promise((resolve, reject) => {
        return src("./dist", { allowEmpty: true })
            .pipe(clean())
            .on("finish", () => {
                resolve();
            });
    });
}

function moveAssets() {
    return new Promise((resolve, reject) => {
        return src("src/assets/**")
            .pipe(dest("dist/assets"))
            .on("finish", resolve);
    });
}

function compileSass() {
    return new Promise((resolve, reject) => {
        return src("src/styles/*.scss")
            .pipe(sass().on("error", sass.logError))
            .pipe(dest("dist"))
            .on("finish", resolve);
    });
}

function cleanCss() {
    return new Promise((resolve, reject) => {
        return src("dist/*.css")
            .pipe(cleanCSS({ compatibility: "ie8" }))
            .pipe(dest("dist"))
            .on("finish", resolve);
    });
}

function minifyHtml() {
    return new Promise((resolve, reject) => {
        return src(["src/*.html", "*.html"])
            .pipe(htmlmin({ collapseWhitespace: true }))
            .pipe(dest("dist"))
            .on("finish", resolve);
    });
}

function mdToHtml() {
    return new Promise((resolve, reject) => {
        return src("src/blog/*.md")
            .pipe(markdown())
            .pipe(dest("dist/blog"))
            .on("finish", resolve);
    });
}

function modifyIndexFile() {
    return modifyContentFiles();
}

module.exports.runBuild = async (arg) => {
    console.log(`Building in ${arg.prod ? "production" : "development"} mode.`);
    await cleanDist();
    await moveAssets();
    await compileSass();
    await cleanCss();
    await minifyHtml();
    await mdToHtml();
    await modifyIndexFile();
    await modifyBlogFiles();
};
