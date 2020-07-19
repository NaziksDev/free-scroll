const loader = new nLoader('../src/modules', ['main', 'pc', 'mobile']);

loader.async_load()
.then(m => {
	window.FreeScroll = m.main.module;
	window.FreeScroll.modules = Object.keys(m).reduce((r,e)=>{
		if(r == 'main') return r;
		r[e] = m[e]['module'];
		return r;
	},{});
	if(loader.events.hasOwnProperty('loaded')) loader.events.loaded()
})