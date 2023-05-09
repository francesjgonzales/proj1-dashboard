# proj1-dashboard

(_front-end-fundamentals_)

This project is focused on building a simple, clean scalable and maintainable website using HTML semantics, BEM for CSS organization, Sass for CSS preprocessor, vanilla javascript for local API fetch and navbar responsiveness and Gulp for automated front-end build task such as minifying SCSS, JS and images.

### UI Design

The revised design showcased below is an enhanced rendition of the task I worked on during my previous front-end interview. The challenge presented was to create the design without relying on any frameworks. I implemented slight modifications, such as the removal of unnecessary icons and overall simplification, resulting in an improved version.

![UI Design](./app/images/UI-Design.png)

### Dependencies

1. **generator-website-starter** that I created. Here's the [npm pacakge](https://www.npmjs.com/package/generator-website-starter)

### Deplying in Netlify

npm package doesn't have the **gulp build** so I added this line of code in the **gulpfile.js**

```
exports.build = series(parallel(scssTask, jsTask, optimizeImg));
```

### Credits

- [The Table element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table#browser_compatibility)

- [fetch api](https://www.youtube.com/watch?v=eS-FVnhjvEQ)

- [how to deploy gulp build in netlify](https://www.youtube.com/watch?v=KQp3VKSYQ_U)

- [toggle classList](https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_toggle_class)
