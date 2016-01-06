# smarti.dock.js

JQuery floating dock panel. Can be docked to content or autoslide on mouseover when hidden.

<b>JSBin:</b> https://jsbin.com/mapili/edit

<b>Struncture:</b>

```html
<div ...> - container
  <div data-dock="true"> - dock panel (required)
    ...
  </div>
  <div data-handle="docked"> - default dock handle (required)
    ...
  </div>
  <div data-handle="hidden"> - alternative dock handle when dock is hidden (optional)
    ...
  </div>
  <div data-content="true"> - content panel (required)
    ...
  </div>
</div>
```
<b>Container attributes</b>

attribute name | description
--- | ---
data-name="..." | name of js instance
data-smarti="dock" | type of js instance (smarti.dock)
data-dock-position="top\|right\|bottom\|left" | dock panel position (default:left)
data-docked="true\|false" | defines if dock panel is docked on first load (default:true)
data-use-storage="session\|local" | defines where to store docked state: sessionStorage or localStorage (default:null)

Each dock container must contain next elements:
```html
<div data-dock="true">...</div>		- dockable panel
<div data-handle="true">...</div>	- dockable panel handler (position can be changed by setting css rule of top,right,bottom or left)
<div data-content="true">...</div>	- content panel
```
