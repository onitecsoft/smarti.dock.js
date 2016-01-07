var smarti = window['smarti'] || {};

$(function () {
	if (!smarti.initialized) {
		smarti.initialized = true;
		$('[data-smarti]').smarti();
	}
})

$.fn.smarti = function () {
	$.each(this.selector == '[data-smarti]' ? this : this.find('[data-smarti]'), function () {
		var jq = $(this);
		var opts = jq.data();
		window[opts.name] = new smarti[opts['smarti']](jq, opts);
	});
}

smarti.dock = function (jq, opts) {
	var that = this;
	this.dockPosition = 'left';
	this.dockOffset = 10;
	this.container = jq.css({ overflow: 'hidden' });
	$.extend(that, opts);

	if (this.container.css('position') != 'absolute') this.container.css({ position: 'relative' });
	this.dock = this.container.children('[data-dock]').css({ position: 'absolute', zIndex: 999 });
	this.handle = this.container.children('[data-handle]').css({ position: 'absolute', zIndex: 1000 });
	this.content = this.container.children('[data-content]').css({ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 });
	this._storage = this.useStorage != null ? this.useStorage + 'Storage' : null;
	if (this.container.height() == 0) this.container.height(300);

	this._ap = function () { return that.dockPosition == 'left' || that.dockPosition == 'right' ? ['top', 'bottom'] : ['left', 'right'] }
	this._ds = function () { return that._ap()[0] == 'top' ? that.dock.outerWidth(true) : that.dock.outerHeight(true) }

	this._setHover = function () {
		if (!that.docked) {
			that.dock.mouseover(function () {
				if (!that._sliding && !that._hover) {
					that._sliding = true;
					that._hover = true;
					that.slide(function () { that._sliding = false; });
				}
			});
			that.content.mouseover(function () {
				if (!that._sliding && that._hover) {
					that._sliding = true;
					that._hover = false;
					that.slide(function () { that._sliding = false; });
				}
			});
		}
		else {
			that._hover = false;
			that.dock.off('mouseover');
			that.content.off('mouseover');
		}
	}
	this._setDocked = function (docked) {
		that.docked = docked;
		if (that._storage != null && window[that._storage] != null) window[that._storage][that.name + 'Docked'] = docked ? '1' : '0';
	}
	this._getDocked = function () {
		var d = that._storage != null && window[that._storage] != null ? window[that._storage][that.name + 'Docked'] : null;
		return d != null ? d == '1' : (that.docked != null ? that.docked : true);
	}
	this.toggle = function () {
		that._setDocked(!that.docked);
		var o = {};
		o[that.dockPosition] = that.docked ? that._ds() : that.dockOffset;
		that.content.animate(o);
		that.slide(function () { that._setHover(); that.toggleHandle(); });
	}
	this.toggleHandle = function () {
		if (that.handle.length > 1) {
			that.handle.not("[data-handle='hidden']").toggle(that.docked);
			that.handle.filter("[data-handle='hidden']").toggle(!that.docked);
		}
	}
	this.slide = function (cb) {
		var o1 = {}, o2 = {}; ds = that._ds();
		o1[that.dockPosition] = that.docked || that._hover ? 0 : -ds + that.dockOffset;
		that.dock.animate(o1, cb);
		that.handle.each(function () {
			var jq = $(this);
			var o = jq.data('o');
			o2[that.dockPosition] = that.docked || that._hover ? ds + o : o + that.dockOffset;
			jq.animate(o2);
		});
	}
	this.docked = this._getDocked();
	this.content.css(this.dockPosition, this.docked ? this._ds() : that.dockOffset);
	this.dock.css(this.dockPosition, this.docked ? 0 : -this._ds() + that.dockOffset).css(this._ap()[0], 0).css(this._ap()[1], 0);
	this.handle.each(function () {
		var jq = $(this);
		var o = parseInt(jq.css(that.dockPosition)) || 0;
		jq.data('o', o);
		jq.css(that.dockPosition, that.docked ? that._ds() + o : o + that.dockOffset);
	});
	this.handle.click(this.toggle);
	this._setHover();
	this.toggleHandle();
	return this;
}
