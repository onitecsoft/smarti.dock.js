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
  <div data-handle="hidden"> - alternative dock handle when dock panel is hidden (optional)
    ...
  </div>
  <div data-content="true"> - content panel (required)
    ...
  </div>
</div>
```
<b>Container attributes</b>

Can be applied any css style.

attribute name | description
--- | ---
data-name="..." | name of js instance
data-smarti="dock" | type of js instance (smarti.dock)
data-dock-position="top \| right \| bottom \| left" | dock panel position (default:left)
data-docked="true \| false" | defines if dock panel is docked on first load (default:true)
data-use-storage="session \| local" | defines where to store docked state: sessionStorage or localStorage (default:null)

<b>Dock panel attributes</b>

Can be applied any css style.

<b>Dock handle attributes</b>

Can be applied any css style. Handle position can be defined by setting css rule of top,right,bottom or left.

Example: `style="top:20px; left:-10px"`

<b>Content panel attributes</b>

Can be applied any css class or style.
