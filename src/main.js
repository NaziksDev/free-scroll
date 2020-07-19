const loader = new nLoader('../src/modules', ['main', 'style', 'pc', 'mobile']);

loader.async_load()
.then(m=>{
	window.FreeScroll = m.main.module;
	window.FreeScroll.modules = m;
	if(loader.events.hasOwnProperty('loaded')) loader.events.loaded()
})