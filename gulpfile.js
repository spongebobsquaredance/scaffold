var gulp = require('gulp');
var del = require('del');
var include = require('gulp-include');

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

// Watch task

// Default Gulp task
gulp.task('default', ['clean:build', 'includes']);