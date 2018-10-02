var syntax        = 'sass'; // Syntax: sass or scss;

var gulp          = require('gulp'),
	watch 		  = require('gulp-watch'),
	runSequence   = require('run-sequence'),
	gutil         = require('gulp-util' ),
	sass          = require('gulp-sass'),
	browserSync   = require('browser-sync'),
	concat        = require('gulp-concat'),
	uglify        = require('gulp-uglify'),
	cleancss      = require('gulp-clean-css'),
	rename        = require('gulp-rename'),
	autoprefixer  = require('gulp-autoprefixer'),
	notify        = require("gulp-notify"),
	rsync         = require('gulp-rsync');
	replace       = require('gulp-replace');


gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// open: false,
		// online: false, // Work Offline Without Internet Connection
		// tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
	})
});

gulp.task('styles', function() {
	return gulp.src('app/'+syntax+'/**/*.'+syntax+'')
	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging	
	.pipe(gulp.dest('app/css'))
	.pipe(replace('../img/', ''))
	.pipe(replace('../fonts/MetropolisLight/', ''))
	.pipe(replace('../fonts/MetropolisBold/', ''))
	.pipe(replace('../fonts/MetropolisMedium/', ''))
	.pipe(replace('../fonts/MetropolisBoldItalic/', ''))
	.pipe(replace('../fonts/MetropolisRegular/', ''))
	.pipe(replace('../fonts/MetropolisSemiBold/', ''))
	.pipe(replace('../fonts/MetropolisLightItalic/', ''))
	
	.pipe(gulp.dest('./../assets'))
	.pipe(browserSync.stream())
});

gulp.task('js', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
		'app/libs/slick-carousel/slick/slick.min.js',
		'app/js/common.js', // Always at the end
		])
	.pipe(concat('scripts.min.js'))
	// .pipe(uglify()) // Mifify js (opt.)
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('js-shopify', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
		'app/libs/slick-carousel/slick/slick.min.js',		
		'./../assets/collections.js',		
		'./../assets/cart.js',		
		])
	.pipe(concat('scripts.min.js'))
	// .pipe(uglify()) // Mifify js (opt.)
	.pipe(replace('img/', ''))
	.pipe(gulp.dest('./../assets'))
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('rsync', function() {
	return gulp.src('app/**')
	.pipe(rsync({
		root: 'app/',
		hostname: 'username@yousite.com',
		destination: 'yousite/public_html/',
		// include: ['*.htaccess'], // Includes files to deploy
		exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
		recursive: true,
		archive: true,
		silent: false,
		compress: true
	}))
});

gulp.task('copyimages', function() {
   gulp.src('./app/img/**/*.{png,jpg,jpeg,svg}')
   .pipe(gulp.dest('./../assets'));
});

gulp.task('watch', ['styles', 'js', 'browser-sync', 'js-shopify'], function() {

	watch('app/'+syntax+'/**/*.'+syntax+'', function() {
		runSequence('styles');
	});

	watch(['libs/**/*.js', 'app/js/common.js'],function() {
		runSequence('js');
	});

	watch('app/*.html', function() {
		browserSync.reload();
	});

	watch('../assets/collections.js', function(){
		runSequence('js-shopify');
	})
	
	/*watch('app/img/*.{png,jpg,jpeg,svg}', function() {
		runSequence('copyimages');;
	});*/	
});



gulp.task('default', ['watch']);
