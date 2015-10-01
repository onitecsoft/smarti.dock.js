var smarti = window['smarti'] || {};

smarti.dock = function (jq, opts) {
	var that = this;
	this.dockPosition = 'left';
	this.docked = false;
	this.container = jq.css({ overflow: 'hidden' });
	$.extend(that, opts);

	if (this.container[0].style.position != 'absolute') this.container.css('position', 'relative');
	this.dock = this.container.children('[data-dock]').css({ position: 'absolute', zIndex: 1 });
	this.handle = this.container.children('[data-handle]').css({ position: 'absolute', zIndex: 2 });
	this.content = this.container.children('[data-content]').css({ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 });

	this._dw = function () { return that.dock.outerWidth(true) }
	this._dh = function () { return that.dock.outerHeight(true) }
	this._ap = function () { return that.dockPosition == 'left' || that.dockPosition == 'right' ? 'top' : 'left' }
	this._ap2 = function () { return that.dockPosition == 'left' || that.dockPosition == 'right' ? 'bottom' : 'right' }
	this._ds = function () { return that._ap() == 'top' ? that._dw() : that._dh() }
	this._ho = parseInt(this.handle[0].style[this.dockPosition]) || 0;

	this.content.css(this.dockPosition, this.docked ? 0 : this._ds());
	this.dock.css(this.dockPosition, this.docked ? -this._ds() : 0);
	this.dock.css(this._ap(), 0).css(this._ap2(), 0);
	this.handle.css(this.dockPosition, this.docked ? this._ho : this._ho + this._ds());
	
	this.toggle = function () {
		that.docked = !that.docked;
		that.slide();

		var o = {};
		o[that.dockPosition] = that.docked ? 0 : that._ds();
		that.content.animate(o);
	}
	this.slide = function () {
		var o1 = {}, o2 = {};
		o1[that.dockPosition] = that.docked ? -that._ds() : 0;
		o2[that.dockPosition] = that.docked ? that._ho : that._ho + that._ds();
		that.dock.animate(o1);
		that.handle.animate(o2);
	}
	this.handle.click(this.toggle);
}

$(function () {
	$.each($('[data-smarti]'), function () {
		var obj = $(this);
		var opts = obj.data();
		window[opts.name] = new smarti[opts['smarti']](obj, opts);
	});
})
