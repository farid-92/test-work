///////////////////////////////////////////////
/// 			@require   				///////
///////////////////////////////////////////////
var gulp = require('gulp'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	rigger = require('gulp-rigger'),
	autoprefixer = require('gulp-autoprefixer');


/////////////////////////////////////////////////
//////  		Tasks					/////////
/////////////////////////////////////////////////
gulp.task('sass', function(){
	gulp.src('app/sass/style.sass')
    .pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['last 10 version'], cascade: false}))
    .pipe(gulp.dest('app/css/'));
});

gulp.task('scripts', function(){
    gulp.src(['app/js/**/*.js','!app/js/main.min.js'])
    .pipe(uglify())
    .pipe(concat('main.min.js', {newLine: ';'}))
    .pipe(gulp.dest('app/js/'));
});

gulp.task('html', function(){
	gulp.src('app/build/*.html')
	.pipe(rigger())
	.pipe(gulp.dest('app/'));
});



////////////////////////////////////////////////
/////               Watch              /////////
////////////////////////////////////////////////

gulp.task('watch', function () {
   gulp.watch('app/sass/**/*.sass', ['sass']);
   // gulp.watch('app/js/**/*.js', ['scripts']);
   gulp.watch('app/build/*.html', ['html']);
   gulp.watch('app/templates/*.html', ['html']);
});

////////////////////////////////////////////////
////////         Default              //////////
////////////////////////////////////////////////

gulp.task('default', ['watch', 'sass', 'html']); // 'scripts'
