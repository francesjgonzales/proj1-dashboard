//Initialize modules
const { src, dest, watch, series, parallel } = require('gulp');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const replace = require('gulp-replace');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const terser = require('gulp-terser');
const browsersync = require('browser-sync');
const imagemin = require('gulp-imagemin');


//File path variables 
const files = {
    scssPath: 'app/scss/**/*.scss',
    jsPath: 'app/js/**/*.js',
    imagePath: 'app/images/**/*.{jpg,png,svg,jpeg,gif}',
}

//Sass - to compile Sass files
function scssTask() {
    return src(files.scssPath)
        .pipe(sourcemaps.init())
        //initialize sourcemaps before you run other files
        .pipe(sass()) //compile all sass to css files
        .pipe(postcss([autoprefixer(), cssnano()])) //creates minifies files where autoprefixer and cssnano are bundled into postcss
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist')); //destination folder for final compiled files
}

//JS Task - to concat and compile all JS files
function jsTask() {
    return src(files.jsPath)
        .pipe(concat('all.js'))
        .pipe(terser())
        .pipe(dest('dist'));
}

//Optimize images
function optimizeImg() {
    return src(files.imagePath)
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true, optimizationLevel: 1, colors: 10, buffer: Buffer }),
            imagemin.mozjpeg({ quality: 80, progressive: true }),
            imagemin.optipng({ optimizationLevel: 2 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        /* .pipe(extReplace('.webp')) */
        .pipe(dest('dist/images'));
}

//Browsersync Tasks
function browsersyncServe(cb) {
    browsersync.init({
        server: {
            baseDir: '.'
        }
    });
    cb();
}

function browsersyncReload(cb) {
    browsersync.reload();
    cb();
}

//Cachebusting task - auto clear cache for every JS change
const cbString = new Date().getTime();
function cacheBustTask() {
    return src(['index.html'])
        .pipe(replace(/cb=\d+/g, 'cb=' + cbString)) //first param check for available 'cb' digit, second param replace existing digit located in index.html file
        .pipe(dest('.'))
}

//Watch task - monitors files for any changes and auto rebuild everything
function watchTask() {
    watch('*.html', browsersyncReload)
    watch([files.scssPath, files.jsPath, files.imagePath],
        parallel(scssTask, jsTask, optimizeImg, browsersyncReload)); //takes 2 params. 1st param cite the file you want to monitor. 2nd param run that file that you cite to monitor using Gulp syntax (either series or parallel)
}

// Default Gulp task - compiles and run all tasks as 1 line of 
exports.default = series(
    parallel(scssTask, jsTask, optimizeImg),
    browsersyncServe,
    cacheBustTask,
    watchTask
);