## Website Performance Optimization portfolio project

Your challenge, if you wish to accept it (and we sure hope you will), is to optimize this online portfolio for speed! In particular, optimize the critical rendering path and make this page render as quickly as possible by applying the techniques you've picked up in the [Critical Rendering Path course](https://www.udacity.com/course/ud884).

To get started, check out the repository and inspect the code.

### Getting started

####Part 1: Optimize PageSpeed Insights score for index.html

Some useful tips to help you get started, follow below steps. Or simply check http://useful-calendar.surge.sh/ :

1. Check out the repository
1. To inspect the site on your phone, you can run a local server

  ```bash
  $> cd /path/to/your-project-folder
  $> node ./bin/www
  ```

1. Open a browser and visit localhost:8080
1. Download and install [ngrok](https://ngrok.com/) to the top-level of your project directory to make your local server accessible remotely.

  ``` bash
  $> cd /path/to/your-project-folder
  $> ./ngrok http 8080
  ```

1. Copy the public URL ngrok gives you and try running it through PageSpeed Insights! Optional: [More on integrating ngrok, Grunt and PageSpeed.](http://www.jamescryer.com/2014/06/12/grunt-pagespeed-and-ngrok-locally-testing/)

Profile, optimize, measure... and then lather, rinse, and repeat. Good luck!

####Part 1: FIXES DONE FOR 'Optimize PageSpeed Insights score for index.html'
- Minification of CSS using `gulp-clean-css`.
- Concatination of CSS using `gulp-useref`.
- Minification & Concatination of JS using `gulp-uglify`.
- Minification of html using `gulp-htmlmin`.
- Responsive images using `gulp-responsive-images` and SRCSET attribute in IMG tag.
- Image compression using `gulp-imagemin`.
- Compression of static resources using npm package `compression` for expressJS.
- Scripts in all HTML pages moved to the bottom of the page.

####Part 2: Optimize Frames per Second in pizza.html

To optimize views/pizza.html, you will need to modify views/js/main.js until your frames per second rate is 60 fps or higher. You will find instructive comments in main.js. 

You might find the FPS Counter/HUD Display useful in Chrome developer tools described here: [Chrome Dev Tools tips-and-tricks](https://developer.chrome.com/devtools/docs/tips-and-tricks).

####Part 2: FIXES DONE FOR 'Optimize Frames per Second in pizza.html'
- Use of document.querySelectorAll minimized to calling it once in the beginning of the function `changePizzaSizes(size)`.
- FSL observed in scroll callback - `updatePositions()`. Fixed it by computing all the layout calculations first and then applying all the styles later.
- Call to `updatePositions()` wrapped in `requestAnimationFrame`.
- `will-change:left` CSS property added to HTML element `#movingPizzas1`
- In `changePizzaSizes(size)`, fixed FSL by computing all the layout calculations first and then applying all the styles later.

#### FIXES DONE as per review comments
- main.js code enclosed IIFE. Added `'use strict'`
- `querySelector()` replaced with faster `getElementById()`
- `querySelectorAll()` changed to faster `getElementsByClassName()`
- DOM references moved out of the loops. Variable initialisation from within the loop moved to loop initialisation.
- Number of mover elems changed for fixed value of 200, to dynamically generated one using screen.height
- Link tags moved back to HEAD. Google web font loaded via web loader js
- Moved non-critical CSS out of critical rendering using gulp `critical` package
- Css `autoprefixer` package added in build process
- Added transform translateZ and backface-visibility hidden to the `.mover` elements

#### FIXES DONE as per review comments 2
- functions `changeSliderLabel()` and `sizeSwitcher()` merged.
- `determineDx()` is now called just once instead of for each pizza DOM element.
- Added function annotations `@summary`, `@params` and `@returns` to newly added functions `_getLayoutVals()` and `_updateStyles()`

#### FIXES DONE as per review comments 3
- `determineSizeValue()` changed to include percentages. (The actual sizes have varied with this change but assumption is that this change is not important for overall webpage experience.)
- `phase` variable's calculation moved inline.
- images optimised using `gulp-smushit`.
- Adding critical CSS manually and disabled critical gulp task.
- Inlined the print.css in bottom of the main page to fix 'Priortise visible content'.
- Inline the webfont.js in the main page to fix 'Priortise visible content'.

#### FIXES DONE as per review comments 4
- CSS minification enabled in the gulp useref task for the inline CSS in the HTML files. Also, CSS formatted properly in the index.html
- Removed repeated DOM reference happening in the loop by using documentFragment

### Optimization Tips and Tricks
* [Optimizing Performance](https://developers.google.com/web/fundamentals/performance/ "web performance")
* [Analyzing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp.html "analyzing crp")
* [Optimizing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/optimizing-critical-rendering-path.html "optimize the crp!")
* [Avoiding Rendering Blocking CSS](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css.html "render blocking css")
* [Optimizing JavaScript](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript.html "javascript")
* [Measuring with Navigation Timing](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp.html "nav timing api"). We didn't cover the Navigation Timing API in the first two lessons but it's an incredibly useful tool for automated page profiling. I highly recommend reading.
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/eliminate-downloads.html">The fewer the downloads, the better</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html">Reduce the size of text</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization.html">Optimize images</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching.html">HTTP caching</a>

### Customization with Bootstrap
The portfolio was built on Twitter's <a href="http://getbootstrap.com/">Bootstrap</a> framework. All custom styles are in `dist/css/portfolio.css` in the portfolio repo.

* <a href="http://getbootstrap.com/css/">Bootstrap's CSS Classes</a>
* <a href="http://getbootstrap.com/components/">Bootstrap's Components</a>
