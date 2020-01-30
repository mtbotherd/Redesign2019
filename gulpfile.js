var gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync').create(),
	cache = require('gulp-cache'),
	del = require('del'),
	runSequence = require('run-sequence'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	cp = require('child_process');

// Development Tasks
// -----------------

// Start browserSync server
gulp.task('browserSync', function () {
	browserSync.init({
		server: {
			baseDir: ['dist']
		}
	})
});

// Copy vemdor js to src
gulp.task('vendorjs', function () {
	return gulp.src([
		'node_modules/jquery/dist/jquery.js',
		'node_modules/popper.js/dist/umd/popper.js',
		'node_modules/bootstrap/dist/js/bootstrap.js',
		'node_modules/exlink/jquery.exlink.js',
		'src/js/vendor/*.js'
	])
		.pipe(gulp.dest('dist/js'));
});

// Compile sass to css
gulp.task('sass', function () {
	return gulp.src('src/scss/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(sourcemaps.write('maps'))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

// Copy js to dist
gulp.task('scripts', function () {
	return gulp.src([
		'src/js/*.png',
		'src/js/*.json'
	])
		.pipe(gulp.dest('dist/js'))
});

// Transpile the project js files to dist using babel
gulp.task('transpile', function () {
	return cp.exec('npx babel src/js/*.js --out-dir dist/js');
});

// Copy fonts to dist
gulp.task('fonts', function () {
	return gulp.src('src/fonts/*')
		.pipe(gulp.dest('dist/fonts'))
});

gulp.task('html', function () {
	return gulp.src('src/**/*.html')
		.pipe(gulp.dest('dist'))
});


// Watchers
gulp.task('watch', function () {
	gulp.watch('src/scss/**/*.scss', ['sass']);
	gulp.watch('src/**/*.html', browserSync.reload);
	gulp.watch('src/js/**/*.js', browserSync.reload);
});

// Optimize images
gulp.task('images', function () {
	return gulp.src('src/img/**/*.+(png|jpg|gif|svg)')
		.pipe(gulp.dest('dist/img'))
});

// Clean Dist
gulp.task('clean', function () {
	return del.sync('dist').then(function (cb) {
		return cache.clearAll(cb);
	});
})

gulp.task('clean:dist', function () {
	return del.sync('dist/**/*');
});

// Build Sequence
// --------------
gulp.task('default', function (callback) {
	runSequence(['vendorjs', 'sass', 'browserSync'], 'watch',
		callback
	)
});

gulp.task('build', function (callback) {
	runSequence(
		'clean:dist',
		'vendorjs',
		'sass', ['html', 'fonts', 'scripts', 'transpile', 'images'],
		callback
	)
});
