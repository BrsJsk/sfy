const fs = require("fs");

const DIST_BLOG_PATH = "./dist/blog";
const DIST_INDEX_FILE_PATH = "./dist/index.html";
const INDEX_FILE_BLOG_POSTS_REPLACER = "#--POSTS--#";

let allPostFiles = [];

const formatBlogTitle = text => {
  return text.split("-").join(' ').replace('.html', '');
}

/**
 * Reads all blog posts and adds them to index.html file
 */
module.exports.modifyContentFiles = () => {
  fs.readdir(DIST_BLOG_PATH, (err, files) => {
    if (err) {
      console.log(err);
      return err;
    }

    allPostFiles = [...files];
    appendBlogsToIndex();
  });
};

/**
 * Adds blog list to index.html file
 */
const appendBlogsToIndex = () => {
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
};
