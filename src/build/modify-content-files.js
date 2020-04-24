const fs = require("fs");

const {
  DIST_INDEX_FILE_PATH,
  DIST_BLOG_PATH,
  INDEX_FILE_BLOG_POSTS_REPLACER
} = require("../constants");

let allPostFiles = [];

const formatBlogTitle = (text) => {
    return text.split("-").join(" ").replace(".html", "");
};

/**
 * Reads all blog posts and adds them to index.html file
 */
module.exports.modifyContentFiles = () => {
  return new Promise(resolve => {
    fs.readdir(DIST_BLOG_PATH, async (err, files) => {
      if (err) {
        console.log(err);
        return err;
      }
      
      allPostFiles = [...files];
      await appendBlogsToIndex();
      resolve();
    });
  })
};

/**
 * Adds blog list to index.html file
 */
const appendBlogsToIndex = () => {
    return new Promise((resolve) => {
        let blogsListHtml = "";
        allPostFiles.forEach((post) => {
            const [date, title] = post.split("&");

            blogsListHtml = `${blogsListHtml}
        <a href="./blog/${post}">${date} - ${formatBlogTitle(title)}</a>
        `;
        });

        const indexFile = fs.readFileSync(DIST_INDEX_FILE_PATH, "utf8");
        const modifiedIndesxFile = indexFile.replace(
            INDEX_FILE_BLOG_POSTS_REPLACER,
            blogsListHtml
        );

        fs.writeFileSync(DIST_INDEX_FILE_PATH, modifiedIndesxFile);
        resolve();
    });
};
