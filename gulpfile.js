/**
 gulp自动化构建
 @Created by: lyz
 @date: 2017/4/8 10:01
 @last modified by:
 @last modified time:
 */

/*
 *   1.less编译 css压缩 合并
 *   2.js合并   压缩    混淆
 *   3.img复制
 *   4.html压缩
 * */
'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var contat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync');

//1.less编译 css压缩
gulp.task('style', function () {
    gulp.src(['src/styles/*.less', '!src/styles/_*.less'])
        .pipe(less())
        .pipe(cssnano())
        .pipe(gulp.dest('dist/styles'))
        .pipe(browserSync.reload({
            stream:true
        }));
});

//2.js合并 压缩 混淆
gulp.task('script', function () {
    gulp.src('src/scripts/*.js')
        .pipe(contat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(browserSync.reload({
            stream:true
        }));
});

//3.图片复制
gulp.task('image', function () {
    gulp.src('src/images/*.*')
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.reload({
            stream:true
        }));
});

//4.html折叠空格，去注释
gulp.task('html', function () {
    gulp.src('src/*.html')
        .pipe(htmlmin(
            {
                collapseWhitespace: true,
                removeComments: true
            }
        ))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream:true
        }));
});


gulp.task('serve', function () {
    browserSync({
        server: {baseDir:['dist']},
    }, function (err, bs) {
        console.log(bs.options.getIn(["urls", "local"]));
    });
    gulp.watch('src/styles/*.less',['style']);
    gulp.watch('src/scripts/*.js',['script']);
    gulp.watch('src/images/*.*',['image']);
    gulp.watch('src/*.html',['html']);
});