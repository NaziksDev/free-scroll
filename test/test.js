loader.on('loaded', function(){
	window.temp1 =  new FreeScroll({
		container: "#app",
		modules: ['style', 'mobile', 'pc']
	});

	console.log(temp1.items.map(e=>temp1.isVisible(e)))
})
