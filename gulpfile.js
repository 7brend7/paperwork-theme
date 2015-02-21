var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');
var uglify = require('gulp-uglify');
var path = require("path");
var spritesmith = require('gulp.spritesmith');

var paths = {
	bootstrap: [
		'bower_components/bootstrap/js/tooltip.js',
		'bower_components/bootstrap/js/*.js'
	],
	my: [
		'js/*.js'
	],
	jQueryAndPlugins: [
		'bower_components/jquery/dist/jquery.js',
		'bower_components/matchHeight/jquery.matchHeight.js'
	],
	output: {
		js: 'public/js',
		css: 'public/css'
	}
};

gulp.task('sprite', function() {
    var spriteData =
        gulp.src('public/images/sprites/*.*')
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: 'sprite.css',
                imgPath: '/images/sprite.png'
            }));

    spriteData.img.pipe(gulp.dest('public/images'));
    spriteData.css.pipe(gulp.dest('public/css'));
});

gulp.task('compileLessBootstrap', function() {
	gulp
		.src('less/bootstrap.less')
		.pipe(less({
			paths: ['bower_components/bootstrap/less/', 'less/']
		}))
		.pipe(rename({
			basename: 'bootstrap.min'
		}))
		.pipe(gulp.dest(paths.output.css))
		.pipe(livereload());
});

gulp.task('compileLessMyTheme', function() {
	gulp
		.src('less/my.less')
        .pipe(less({
			paths: ['bower_components/bootstrap/less/', 'less/', 'bower_components/fontawesome/less/']
		}))
        .pipe(rename({
			basename: 'my.min'
		}))
        .pipe(gulp.dest(path.join(paths.output.css, 'themes')))
        .pipe(livereload());
});

gulp.task('compileJsBootstrap', function() {
	gulp
		.src(paths.bootstrap)
		.pipe(concat('bootstrap.min.js'))
		.pipe(gulp.dest(paths.output.js))
		.pipe(livereload());
});

gulp.task('compileJsMy', function() {
	gulp
		.src(paths.my)
		.pipe(concat('my.min.js'))
		.pipe(gulp.dest(paths.output.js))
		.pipe(livereload());
});

gulp.task('compileJsJquery', function() {
	gulp
		.src(paths.jQueryAndPlugins)
		.pipe(concat('jquery.min.js'))
		.pipe(gulp.dest(paths.output.js))
		.pipe(livereload());
});

gulp.task('minifyJs', function() {
	gulp
		.src(path.join(paths.output.js, '*.js'))
		.pipe(uglify())
		.pipe(gulp.dest(paths.output.js));
});

gulp.task('less', ['sprite', 'compileLessBootstrap', 'compileLessMyTheme']);
gulp.task('js', ['compileJsBootstrap', 'compileJsMy', 'compileJsJquery']);

gulp.task('default', ['less', 'js']);
gulp.task('prod', ['default', 'minifyJs']);

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('less/*.less', ['less']);
  gulp.watch('js/*.js', ['js']);
});
