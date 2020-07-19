const main_module = class fs_main{
	constructor(options = {}){
		let self = this;
		let default_options = {
			container: "",
			modules: ['mobile', 'pc']
		}

		this.options = Object.assign(default_options,options);
		this.modules = this.constructor.modules;
		this.nextid = 0;

		if(this.options.container){
			if(typeof(container) == "object"){
				let e = false;
				try{
					this.options.container instanceof HTMLElement
				}catch(e){
					console.error('[FreeScroll] Error: Invalid container selector');
					return false;
					e = true;
				}
				if(!e) this.container = this.options.container;
				
			}else if(typeof(this.options.container) == "string"){
				try{
					this.container = Array.from(document.querySelectorAll(this.options.container));
					if(this.container.length == 0){
						console.error('[FreeScroll] Error: Container not found');
						return false;
					}else if(this.container.length > 1){
						console.error('[FreeScroll] Error: Too much elements present. Please, select ONE element as container');
						return false;
					}else{
						this.container = this.container[0];
					}
				}catch(e){
					console.error('[FreeScroll] Error: Invalid container selector');
					return false;
				}
			}else{
				console.error('[FreeScroll] Error: Invalid container type (only HTMLElement or String)');
				return false;
			}
		}

		this.revokeItems();

	}

	revokeItems(){
		let self = this;
		
		this.items = Array.from(this.container.children);
		this.items.constructor.prototype.status = Object.create(null);
		this.items.constructor.prototype.get_status = () => {
			let v = this.items.reduce((r,e) => {
				r[e.dataset.fsid] = this.isVisible(e);
				return r;
			},{});
			self.items.status = v;
			return v;
		}
		this.items.forEach(e => {
			if(e.dataset.hasOwnProperty('fsid')) return;
			e.dataset['fsid'] = self.nextid;
			self.nextid += 1;
		});
		this.items.get_status();
	}

	diff(){
		let old = this.items.status;
		let new_ = this.items.get_status();
		return Object.keys(new_).reduce((r,e) => {
			if(new_[e] == old[e]) return r;
			r[e] = new_[e];
			return r;
		}, {});
	}

	isVisible(el){
		return this.container.getBoundingClientRect().top - el.getBoundingClientRect().top - el.getBoundingClientRect().height < 0
		&&
		this.container.getBoundingClientRect().bottom - el.getBoundingClientRect().top  > 0
	}

	unloadItem(item){
		//...
	}

	loaditem(item){
		//...
	}
}

return main_module;