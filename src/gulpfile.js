var elixir = require('laravel-elixir'),
  gulp = require('gulp'),
  browserify = require('browserify'),
  source = require('vinyl-source-stream');

elixir.config.js.browserify.plugins.push(
    {
        name: 'factor-bundle',
        options: {
          outputs: [
            'public/js/react-spark.js',
            'public/js/reactApp.js',
            'public/js/dropdown.js'
          ]
        }
    }
);

gulp.task('build-spark-app', function() {

    return browserify('resources/assets/js/app.js', { paths: 'vendor/laravel/spark/resources/assets/js' })
      .bundle()
      .pipe(source('app.js'))
      .pipe(gulp.dest('./public/js/'));

});

gulp.task('copy-sweetalert', function() {

      gulp.src('node_modules/sweetalert/dist/sweetalert.min.js')
      .pipe(gulp.dest('./public/js/'));

      return gulp.src('node_modules/sweetalert/dist/sweetalert.css')
      .pipe(gulp.dest('./public/css/'));

});

elixir(function(mix) {

    if (process.argv.indexOf('--production')>=0) {

      process.env.NODE_ENV = 'production';

    }

    mix.task('build-spark-app')
      .task('copy-sweetalert')
      .less('app.less')
      .copy('node_modules/sweetalert/dist/sweetalert.min.js', 'public/js/sweetalert.min.js')
      .copy('node_modules/sweetalert/dist/sweetalert.css', 'public/css/sweetalert.css') 
      .copy('node_modules/react-spark-js/fonts/', 'public/fonts')       
      .copy('node_modules/react-spark-js/fonts/', 'public/build/fonts')

      .browserify([
        './vendor/darrenmerrett/react-spark/src/resources/assets/js/react-spark/react-spark.js',
        './vendor/darrenmerrett/react-spark/src/resources/assets/js/react-spark/reactApp.js',
        './vendor/darrenmerrett/react-spark/src/resources/assets/js/react-spark/dropdown.js'
      ],
      './public/js/common.js', null,{ paths: 'resources/assets/js'})

      .styles(['../../../node_modules/react-spark-js/css/react-spark.css',], 'public/css/react-spark.css')
      .copy('node_modules/react-datetime/css/react-datetime.css','public/css/react-datetime.css')  
      .copy('node_modules/react-spark-js/css/react-spark.css','public/css/react-spark.css')  
      .styles(['reactApp.css',], 'public/css/reactApp.css')
      .styles(['../../../node_modules/react-spark-js/css/common.css',], 'public/css/common.css')
      .styles(['../../../public/css/common.css','../../../public/css/app.css'], 'public/css/app.css')
      .styles(['../../../node_modules/react-dm-bootstrap/dist/react-dm-Bootstrap.css',],'public/css/react-dm-Bootstrap.css')
          
      .version([
              'js/sweetalert.min.js',
              'js/app.js',
              'css/app.css',
              'css/sweetalert.css',
              'css/common.css',

              'js/react-spark.js',
              'js/reactApp.js',
              'js/common.js',
              'js/dropdown.js',

              'css/react-spark.css',              
              'css/react-dm-bootstrap.css',
              'css/react-datetime.css',
              'css/reactApp.css',
       ]);      

});
