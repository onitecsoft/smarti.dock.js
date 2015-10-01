# smarti.dock.js

JQuery dockable panel

Using:	
include jquery.js	
include smarti.dock.js	
```html
<div data-name="dock" data-smarti="dock" data-dock-position="bottom" style="height:300px">
	<div data-dock="true" style="background-color:#888; padding:20px">
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

Dock container
```
data-name="<name>"				- the name of javascript dock instance
data-smarti="dock"				- type of instance (smarti.dock)
data-dock-position="top|right|bottom|left"	- position of dockable panel (default:left)
data-docked="true|false"			- dock initial state (default:false)
```

Each dock container must contain next elements:
```html
<div data-dock="true">...</div>		- dockable panel
<div data-handle="true">...</div>	- dockable panel handler
<div data-content="true">...</div>	- content panel
```

User should apply his own css styles to get nice visual effect
