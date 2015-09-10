//限定工作目录
fis.set('project.files',['www/**','sass/**']);

//fis.match('::package', {
//	package: fis.plugin('map')
//	postpackager: fis.plugin('loader', {
//		allInOne: true
//	})
//});
//去掉www目录
fis.match(/^\/www\/(.*)$/i, {
	useCache: false,
	release: '$1'
});
//将scss文件移动到css目录下
	fis.match(/^\/scss\/(.*)$/i, {
		useCache: false,
		release: 'css/$1'
	})
	.match('*.map', {
		release: false
	})
  .match('www/typescript/**.*', {
    release: false
  })
  .match('*.ts', {
    release: false
  });

//预处理
fis.match('*.scss', {
	rExt: '.css',
	parser: fis.plugin('sass')
});

fis.match('www/js/**/*.js', {
	packTo: 'www/js/wemedia.all.js'
}).match('**/app.js', {
	packOrder: -100
}).match('**/config.js', {
	packOrder: -90
}).match('**/router.js', {
	packOrder: -80
}).match('**/auth.js', {
	packOrder: -70
}).match('bower_components/**.js', {
		packTo: 'www/js/wemedia.lib.js'
	})
	.match('bower_components/angular/angular.min.js',{
		packOrder: -100
	});

fis.match('static/**.js', {
	optimizer: fis.plugin('uglify-js')
}, true);

