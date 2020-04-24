const fs = require("fs");
const {
    BLOG_LAYOUT_CONTENT_REPLACER,
    BLOG_LAYOUT_PATH,
    DIST_BLOG_PATH,
} = require("../constants");

const getBlogFiles = () => {
    return fs.promises.readdir(DIST_BLOG_PATH);
};

module.exports.modifyBlogFiles = async () => {
    const blogLayout = await fs.promises.readFile(BLOG_LAYOUT_PATH, "utf8");
    const allBlogFiles = await getBlogFiles();
    console.log(
        `Found ${allBlogFiles.length} ${
            allBlogFiles.length === 1 ? "blog" : "blogs"
        }`
    );

    for (const blog of allBlogFiles) {
        const filePath = `${DIST_BLOG_PATH}/${blog}`;
        const blogFile = await fs.promises.readFile(filePath, "utf8");
        const modifiedBlogFile = blogLayout.replace(
            BLOG_LAYOUT_CONTENT_REPLACER,
            blogFile
        );
        await fs.promises.writeFile(filePath, modifiedBlogFile);
    }
};
