var smarti = window['smarti'] || {};

smarti.dock = function (jq, opts) {
	var that = this;
	this.dockPosition = 'left';
	this.container = jq.css({ overflow: 'hidden' });
	$.extend(that, opts);

	if (this.container[0].style.position != 'absolute') this.container.css('position', 'relative');
	this.dock = this.container.children('[data-dock]').css({ position: 'absolute', zIndex: 1 });
	this.handle = this.container.children('[data-handle]').css({ position: 'absolute', zIndex: 2 });
	this.content = this.container.children('[data-content]').css({ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 });
	this._storage = this.useStorage != null ? this.useStorage + 'Storage' : null;

	this._ap = function () { return that.dockPosition == 'left' || that.dockPosition == 'right' ? ['top', 'bottom'] : ['left', 'right'] }
	this._ds = function () { return that._ap()[0] == 'top' ? that.dock.outerWidth(true) : that.dock.outerHeight(true) }
	this._ho = parseInt(this.handle[0].style[this.dockPosition]) || 0;
	
	this._setHover = function () {
		if (!that.docked) that.content.mousemove(that._trySlide);
		else { that._hover = false; that.content.off(); }
	}
	this._setDocked = function (docked) {
		that.docked = docked;
		if (that._storage != null && window[that._storage] != null) window[that._storage][that.name + 'Docked'] = docked ? '1' : '0';
	}
	this._getDocked = function () {
		var d = that._storage != null && window[that._storage] != null ? window[that._storage][that.name + 'Docked'] : null;
		return d != null ? d == '1' : (that.docked != null ? that.docked : true);
	}
	this._trySlide = function (e) {
		var o = that._ap()[0] == 'top' ? e.offsetX : e.offsetY;
		if (that.dockPosition == 'right') o = that.content.outerWidth() - o;
		else if (that.dockPosition == 'bottom') o = that.content.outerHeight() - o;
		if ((!that._hover && o < 10) || (that._hover && o > that._ds() + 10)) {
			that._hover = !that._hover;
			that.slide();
		}
	}
	this.toggle = function () {
		that._setDocked(!that.docked);
		var o = {};
		o[that.dockPosition] = that.docked ? that._ds() : 0;
		that.content.animate(o);
		that.slide();
		that._setHover();
	}
	this.slide = function () {
		var o1 = {}, o2 = {};
		o1[that.dockPosition] = that.docked || that._hover ? 0 : -that._ds();
		o2[that.dockPosition] = that.docked || that._hover ? that._ho + that._ds() : that._ho;
		that.dock.animate(o1);
		that.handle.animate(o2);
	}
	this.docked = this._getDocked();
	this.content.css(this.dockPosition, this.docked ? this._ds() : 0);
	this.dock.css(this.dockPosition, this.docked ? 0 : -this._ds());
	this.dock.css(this._ap()[0], 0).css(this._ap()[1], 0);
	this.handle.css(this.dockPosition, this.docked ? this._ho + this._ds() : this._ho);
	this.handle.click(this.toggle);
	this._setHover();
}

$(function () {
	$.each($('[data-smarti]'), function () {
		var obj = $(this);
		var opts = obj.data();
		window[opts.name] = new smarti[opts['smarti']](obj, opts);
	});
})
