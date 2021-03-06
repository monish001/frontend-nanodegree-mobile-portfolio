var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var runSequence = require('run-sequence');
var del = require('del');
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var imageminJpegoptim = require('imagemin-jpegoptim');
var cache = require('gulp-cache');
var responsive = require('gulp-responsive-images');
var imageTempDir = 'dist-image-temp-dir';
var lazypipe = require('lazypipe');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var critical = require('critical').stream; // https://github.com/addyosmani/critical
const autoprefixer = require('gulp-autoprefixer');
var smushit = require('gulp-smushit');
var ghPages = require('gulp-gh-pages');
 
gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

/**
 * Generate minified CSS files (Concatenation is handled in useref task below)
 */
gulp.task('css', function() {
  return gulp.src(['src/css/*.css', 'src/views/css/*.css'], {base: "src/"})  
    .pipe(autoprefixer())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('clean:dist', function(){
  return del.sync('dist');
});

gulp.task('clean:dist-image-temp-task', function(){
  return del.sync(imageTempDir);
});

gulp.task('cache:clear', function (callback) {
  return cache.clearAll(callback)
});

gulp.task('build', function(callback){
  runSequence(['clean:dist'], ['responsive-images', 'css'], ['images', 'useref'], ['clean:dist-image-temp-task', 'critical']);
})

gulp.task('watch', function(){
  runSequence(['browserSync'], ['build']);
 gulp.watch('src/css/*.css', ['css']);
  gulp.watch('src/views/css/*.css', ['css']);
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch('src/views/*.html', browserSync.reload);
  gulp.watch('src/js/*.js', browserSync.reload);
  // Other watchers
})

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'src'
    },
  })
})

gulp.task('useref', function(){
  return gulp.src(['src/*.html', 'src/views/*.html'], {base: "src/"})
    .pipe(useref({}, lazypipe().pipe(sourcemaps.init, { loadMaps: true })))
    .pipe(sourcemaps.write('maps'))

    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))

    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulpIf('*.css', autoprefixer()))

    // Minifies only if it's a Html file
    .pipe(gulpIf('*.html', htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      quoteCharacter: '\'',
      removeComments: true,
      removeAttributeQuotes: true
    })))

    .pipe(gulp.dest('dist'))
});

// Generate & Inline Critical-path CSS
gulp.task('critical', function () {
  return gulp.src(['dist/*.html', 'dist/views/*.html'], {base: "dist/"})
    // .pipe(critical({
    //   // width: 1300, // Viewport width
    //   // height: 20, // Viewport height
    //   // dimensions: [{
    //   //     height: 200,
    //   //     width: 500
    //   // }, {
    //   //     height: 900,
    //   //     width: 1200
    //   // }],
    //   base: 'dist/', 
    //   minify: true, // Minify critical-path CSS when inlining
    //   timeout: 30000, // Complete Timeout for Operation
    //   inline: true
    // }))
    // .on('error', function(err) { 
    //   gutil.log(gutil.colors.red(err.message)); 
    // })
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function() {
  return gulp.src(imageTempDir+'/**/*.+(png|jpg|gif|svg)', {base: imageTempDir+"/"})
  .pipe(cache(smushit({
      verbose: true
  })))
  .pipe(gulp.dest('dist'));
  
  // let plugins = [imagemin.gifsicle(), imageminJpegoptim({max: 1}), imagemin.optipng(), imagemin.svgo()];
  // return gulp.src(imageTempDir+'/**/*.+(png|jpg|gif|svg)', {base: imageTempDir+"/"})
  // .pipe(cache(imagemin(plugins, {
  //   interlaced: true
  // })))
  // .pipe(gulp.dest('dist'));
});

gulp.task('responsive-images', function(){
  return gulp.src('src/**/*.+(png|jpg|gif|svg)', {base: "src/"})
  .pipe(responsive({
    '**/*.*': [{},{
      width: 100,
      quality: 50,
      suffix: '-100'
    }, {
      width: 100 * 2,
      quality: 30,
      suffix: '-100-2x'
    }]
  }))
  .pipe(gulp.dest(imageTempDir))
});