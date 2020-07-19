class loader{
	constructor(path, modules = []){
		this.path = path;
		this.modules = modules;
	}

	load(id=-1, result=[]){
		let self = this;

		if(this.modules.length == 0) return console.log('[nLoader] No modules found.');
		id += 1;
		if(id > this.modules.length-1){
			return console.log('[nLoader] Result: ' ,result)
		}
		this.request(this.modules[id], r => {
			result[this.modules[id]] = r;
			self.load(id, result)
		})
	}

	addToPage(module, content){
		try{
			eval(content);
			return true;
		}catch(e){
			console.error(`[nLoader] Module error (${module}): `, e);
			return false;
		}
	}

	request(module, callback = ()=>{}){
		let self = this;
		let a = new XMLHttpRequest();
		a.onreadystatechange = function(e){
			if(a.readyState == 4){
				if(a.status == 200){
					callback(self.addToPage(module, a.responseText));
				}else{
					console.log('[nLoader] Module not found `'+module+'`')
				}
			}
		}
		a.onerror = a.onabort = a.ontimeout = function(e){
			console.log('[nLoader] Error: ', e)
		}
		a.open('GET', `${this.path}/${module}`, false);
		a.send();
		return a;
	}
}