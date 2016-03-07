var gulp = require('gulp');
var del = require('del');
var include = require('gulp-include');
var sass = require('gulp-ruby-sass');
var cssmin = require('gulp-cssmin');
var jsmin = require('gulp-jsmin');
var rename = require('gulp-rename');
var imgmin = require('gulp-imagemin');
var flatten = require('gulp-flatten');

// Clean build folder with del
gulp.task('clean:build', function() {
	return del([
		'build/*'
	]);
});

// Include HTML partials
gulp.task('includes', function() {
 
  gulp.src('src/includes/*.html')
    .pipe(include())
    .on('error', console.log)
    .pipe(gulp.dest('src'));
});

// Compile Sass
gulp.task('sass', function() {
	return sass('src/styles/sass/screen.scss')
	.on('error', sass.logError)
	.pipe(gulp.dest('src/styles/css'));
});

// Minify images
gulp.task('imgmin', function () {
	gulp.src('src/imgs/*')
		.pipe(cssmin())
		.pipe(gulp.dest('src/imgs/*'));
});

// Minify CSS
gulp.task('cssmin', function () {
	gulp.src('src/styles/css/*.css')
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('src/styles/css'));
});

// Minify JS
gulp.task('jsmin', function () {
	gulp.src('src/scripts/*.js')
		.pipe(jsmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('src/scripts/js'));
});

// Copy HTML Files
gulp.task('copy-html', function() {
	return gulp.src('src/*.html')
		.pipe(flatten())
  		.pipe(gulp.dest('build'));
});

// Copy Minified Styles
gulp.task('copy-css', function() {
	return gulp.src('src/styles/css/*.min.css')
		.pipe(flatten())
  		.pipe(gulp.dest('build/css'));
});

// Copy Minified JS
gulp.task('copy-js', function() {
	return gulp.src('src/scripts/*.min.js')
		.pipe(flatten())
  		.pipe(gulp.dest('build/scripts'));
});

// Copy Minified Images
gulp.task('copy-imgs', function() {
	return gulp.src('src/imgs/*')
		.pipe(flatten())
  		.pipe(gulp.dest('build/imgs'));
});

// Watch task
gulp.task('watch', function() {
	gulp.watch('src/includes/**/*.html', ['includes']);
	gulp.watch('src/styles/sass/**/*.scss', ['sass', 'cssmin']);
	gulp.watch('src/scripts/*.js', ['jsmin']);
	gulp.watch('src/imgs/*', ['imgmin']);
});

// Default Gulp task
gulp.task('default', ['watch']);

// Build task
gulp.task('build', ['clean:build', 'copy-html', 'copy-css', 'copy-js', 'copy-imgs']);
