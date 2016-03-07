var gulp = require('gulp');
var del = require('del');
var include = require('gulp-include');
var sass = require('gulp-ruby-sass');

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
    .pipe(gulp.dest('build'));
});

// Compile Sass
gulp.task('sass', function() {
	return sass('src/styles/sass/screen.scss')
	.on('error', sass.logError)
	.pipe(gulp.dest('build/styles'));
});

// Watch task
gulp.task('watch', function() {
	gulp.watch('src/includes/**/*.html', ['includes']);
	gulp.watch('src/styles/sass/**/*.scss', ['sass']);
	// gulp.watch('src/scripts/*.js', ['js-min']);
});

// Default Gulp task
gulp.task('default', ['watch']);

// Final Build task
// gulp.task('build', ['clean:build']);
