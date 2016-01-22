var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');

var jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('style', function () {

    return gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe(jscs());
});

gulp.task('inject', function () {
    var wiredep = require('wiredep').stream;
    var inject = require('gulp-inject');

    var injectSrc = gulp.src(['./public/css/*.css',
                              './public/js/*.js'], {
        read: false
    });

    var injectOptions = {
        ignorePath: '/public/'
    };

    var options = {
        bowerJson: require('./bower.json'),
        directory: './public/lib',
        ignorePath: '../../public/'
    };
    return gulp.src('./src/views/*.html')
        .pipe(wiredep(options))
        .pipe(inject(injectSrc, injectOptions))
        .pipe(gulp.dest('./src/views'));
});

gulp.task('serve', ['style', 'inject'], function () {
    /*note the style and inject will be run in parallel. so make sure if they are independent tasks, if you need dependent tasks, make one task dependent on another.*/
    var options = {
        script: 'app.js',
        delayTime: 2, //in seconds to wait after the js files update.
        env: {
            PORT: '8000'
        },
        watch: jsFiles
    };

    return nodemon(options).on('restart', function (env) {
        console.log("nodemon restarting ...")
    }); /*on nodemon restart(when jsFiles content change.) execute a function. In this case, just print msg in console.*/

});