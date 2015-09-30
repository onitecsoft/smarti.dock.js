var smarti = window['smarti'] || {};

smarti.dock = function (jq, opts) {
	var that = this;
	this.state = 'open';
	this.container = jq.css({ overflow: 'hidden' });
	$.extend(that, opts);

	if (this.container[0].style.position == '') this.container.css('position', 'relative');
	this.dock = this.container.children('[data-dock]').css({ position: 'absolute', zIndex: 1 });
	this.handle = this.container.children('[data-handle]').css({ zIndex: 2, position: 'absolute' });
	this.content = this.container.children('[data-content]').css({ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 });

	this._dw = function () { return that.dock.outerWidth(true) }
	this._dh = function () { return that.dock.outerHeight(true) }
	this._ap = function () { return that.dockPosition == 'left' || that.dockPosition == 'right' ? 'top' : 'left' }
	this._ds = function () { return that._ap() == 'top' ? that._dw() : that._dh() }
	this._dp = function () { return parseInt(that.handle[0].style[this.dockPosition]); }

	this.content.css(this.dockPosition, this._ds());
	if (this.dock[0].style[this.dockPosition] == '') this.dock.css(this.dockPosition, 0);
	if (this.dock[0].style[this._ap()] == '') this.dock.css(this._ap(), 0);
	if (this.handle[0].style[this.dockPosition] == '') this.handle.css(this.dockPosition, this._ds());

	this.toggle = function () {
		that.state = that.state == 'open' ? 'close' : 'open';
		that.slide();

		var o = {};
		o[that.dockPosition] = that.state == 'open' ? that._ds() : 0;
		that.content.animate(o);
	}
	this.slide = function () {
		var o1 = {}, o2 = {};
		o1[that.dockPosition] = that.state == 'close' ? -that._ds() : 0;
		o2[that.dockPosition] = that.state == 'close' ? that._dp() - that._ds() : that._dp() + that._ds();
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
