var gulp = require("gulp");
var jshint = require('gulp-jshint');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var es = require('event-stream');
var htmlmin = require('gulp-htmlmin');
var cleanCss = require('gulp-clean-css');
var runSequence = require('run-sequence');
var usemin = require('gulp-usemin');


//Todos os fronts executados aqui e alterados automaticamente na index
gulp.task('usemin', function() {
  return gulp.src('app/views/*.ejs')
    .pipe(usemin({
      path: "public/",
      outputRelativePath: "../../public/",
      html: [ function () {return htmlmin({ collapseWhitespace: true });} ],
      css: [cleanCss()],
      js: [uglify({mangle: false})],
      appjs: [uglify({mangle: false})],
    }))
    .pipe(gulp.dest('dist/app/views'))
});

//limpa dist existente
gulp.task('clean', function() {
  return gulp.src('dist')
    .pipe(clean());
});

gulp.task('copy', function(){
  return es.merge([
    gulp.src('server.js').pipe(uglify({mangle: false})).pipe(gulp.dest('dist')),
    gulp.src('public/lib/bootstrap/dist/fonts/**').pipe(gulp.dest('dist/public/fonts')),
    gulp.src('node_modules/**').pipe(gulp.dest('dist/node_modules'))
  ])
});

//verifica erros no javascript
gulp.task('jshint', function() {
  return gulp.src(['app/**/*.js', 'config/*.js', 'public/js/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

/*
********************
***** BACKEND  *****
********************
*/

//uni e limpa espaços do codigo
gulp.task('uglify', function() {
  return es.merge([
    gulp.src('app/**/*.js')
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('dist/app')),

    gulp.src('config/**/*.js')
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('dist/config')),
  ]);
});

//limpa partials do angular que não estão na views do backend
gulp.task('htmlmin', function() {
  return gulp.src('public/partials/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/public/partials'));
});

//'copy', 'htmlmin'

gulp.task('default', function(cb) {
  return runSequence('clean', ['copy', 'jshint', 'usemin', 'uglify','htmlmin'], cb);
});
