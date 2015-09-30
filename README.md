# smarti.dock.js

JQuery dockable panel

Using:	
include jquery.js	
include smarti.dock.js	
```html
<div data-name="dock" data-smarti="dock" data-dock-position="top" style="height:300px">
	<div data-dock="true" style="background-color:#888; padding:20px; width:100%">
		menu<br />menu<br />menu
	</div>
	<div data-handle="true" style="background-color:#abcdef; cursor:pointer">HANDLE</div>
	<div data-content="true" style="overflow:auto; padding:20px; background-color:#eee">
		content<br />content<br />content<br />content<br />content<br />
		content<br />content<br />content<br />content<br />content<br />
		content<br />content<br />content<br />content<br />content<br />
	</div>
</div>
```

Each dock container must contain next:
```
<div data-dock="true"></div> - dockable panel
<div data-handle="true"></div> - dockable panel handler
<div data-content="true"></div> - content panel
```
