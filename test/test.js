loader.on('loaded', function(){
	window.temp1 =  new FreeScroll({
		container: "#app",
		modules: ['style', 'mobile', 'pc']
	});
})
	