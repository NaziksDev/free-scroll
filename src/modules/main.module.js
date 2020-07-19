const main_module = class fs_main{
	constructor(options = {}){
		let default_options = {
			container: "",
			modules: ['style', 'mobile', 'pc']
		}

		this.options = Object.assign(options, default_options);

		if(this.options.container){
			if(typeof(container) == "object"){
				let e = false;
				try{
					this.options.container instanceof HTMLElement
				}catch(e){
					console.error('[FreeScroll] Error: Invalid container selector');
					e = true;
				}
				if(!e) this.container = this.options.container;
				
			}else if(typeof(container) == "string"){
				try{
					this.container = Array.from(document.querySelectorAll(this.options.container));
					if(this.container.length == 0){
						console.error('[FreeScroll] Error: Container not found');
					}else if(this.container.length > 1){
						console.error('[FreeScroll] Error: Too much elements present. Please, select ONE element as container');
					}
				}catch(e){
					console.error('[FreeScroll] Error: Invalid container selector');
				}
			}else{
				console.error('[FreeScroll] Error: Invalid container type (only HTMLElement or String)');
			}
		}
	}

	isVisible(el){
		return this.options.container.getBoundingClientRect().top - el.getBoundingClientRect().top - el.getBoundingClientRect().height < 0
	}
}