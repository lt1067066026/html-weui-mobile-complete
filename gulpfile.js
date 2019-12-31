//引入插件
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');

//路径变量
var path = {
    //开发环境
    src: {
        scss: './src/scss',
        img: './src/img',
    },
    //发布环境
    dist: {
        css: './dist/css',
        img: './dist/img',
        baseroot: './dist'
    }

};

//将scss文件编译成css
gulp.task('scss', function () {
    return gulp.src(path.src.scss + '/*.scss', { style: 'expanded' })
        .pipe(autoprefixer({
            overrideBrowserslist:  ['> 0.15% in CN']
        }))
        .pipe(cache(sass()))
        .pipe(gulp.dest(path.dist.css))
        .pipe(connect.reload());

});


//压缩图片
gulp.task('image', function () {
    return gulp.src(path.src.img + '/**/*.{png,jpg,gif,ico}')
        .pipe(cache(imagemin({
            optiimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
            svgoPlugins: [{ removeViewBox: false }], //不要移除svg的viewbox属性
        })))
        .pipe(gulp.dest(path.dist.img))
});



//clean 清空dist目录中文件
gulp.task('clean', function () {
    return del(path.dist.baseroot + '/**/*');
});


// 服务监听
gulp.task('watch', function () {
    gulp.watch(path.src.scss + '/*.scss', gulp.series('scss'));
    gulp.watch(path.src.img + '/**/*', gulp.series('image'));
});