# Layouts

## Blog list

Currently, displaying blog list is supported in index.html file.

Add this text in the html file and during compile-time it will be replaced with lists of blogs.
```
#--POSTS--#
```

## Blog details

To add additional HTML or CSS to blog details page, we can use /src/layouts/blog.html.

Inside that file, we have:
```
#--CONTENT--#
```

That string will be replaced with blog HTML content during compile-time.