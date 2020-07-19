/**
*	RULES: 
*
*	1. DO NOT USE export KEYWOARD as varialble
* 	2. DO NOT USE export KEYWOARD in exports
*/
class nLoader{
	constructor(path, modules = []){
		this.path = path;
		this.modules = modules;
		window.nLoaderModules = {};
		this.events = {};
	}

	on(event, func){
		this.events[event] = func;
	}

	load(id=-1, callback = ()=> {}, result=[]){
		let self = this;

		if(this.modules.length == 0) return console.log('[nLoader] No modules found.');
		id += 1;
		if(id > this.modules.length-1){
			callback(result);
			return console.log('[nLoader] Result: ' ,result);
		}
		this.request(this.modules[id], (s,m) => {
			result[this.modules[id]] = {status:s,module:m};
			self.load(id, callback, result)
		})
	}

	async async_load(resolve){
		let self = this;
		const load = () => {
			return new Promise(resolve => {
				self.load(-1, resolve)
			})
		}
		return await load();
	}

	addToPage(module, content){
		try{
			let r = eval(`window.nLoaderModules['${module}'] = (function(){${content}})();`);
			return [true,r];
		}catch(e){
			console.error(`[nLoader] Module error (${module}): `, e);
			window.lasterror=e;
			return [false, null];
		}
	}

	request(module, callback = ()=>{}){
		let self = this;
		let a = new XMLHttpRequest();
		a.onreadystatechange = function(e){
			if(a.readyState == 4){
				if(a.status == 200){
					let text = a.responseText;
					let r = self.addToPage(module, text)
					callback(r[0],r[1]);
				}else{
					console.error('[nLoader] Module not found `'+module+'`')
					callback(false);
				}
			}
		}
		a.onerror = a.onabort = a.ontimeout = function(e){
			console.error('[nLoader] Error: ', e)
		}
		a.open('GET', `${this.path}/${module}.module.js`, true);
		a.send();
		return a;
	}
}
