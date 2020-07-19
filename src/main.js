class loader{
	constructor(path, modules = []){
		this.path = path;
		this.modules = modules;
	}

	load(){

	}

	request(url, callback = ()=>{}){
		let a = new XMLHttpRequest();
		a.onreadystatechange = function(e){
			console.log(a)
			console.log(a.readyState)
		}
		a.onerror = a.onabort = a.ontimeout = a.onloadend = function(e){
			console.log(e)
		}
		a.open('GET', url, false);
		a.send();

	}
}