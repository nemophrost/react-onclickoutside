# A bare bones onClickOutside ES6 Class component for React

This is an ES6 Class component you can use with your own React components if you want to have them listen for clicks that occur somewhere in the document, outside of the element itself (for instance, if you need to hide a menu when people click anywhere else on your page).


## Installation

Use `npm`:

```
$> npm install react-onclickoutside-es6 --save
```

(or `--save-dev` depending on your needs). You then use it in your components as:

```javascript
// load the HOC:
import OnClickOutside from 'react-onclickoutside-es6'

// create a new component, extending OnClickOutside:
class MyComponent extends OnClickOutside {
  ...
}));

```

```jsx
// add the onClickOutside prop to your component:
<MyComponent
  onClickOutside={event => {
    // ...handling code goes here...
  }}
/>

```

## Regulate which events to listen for

By default, "outside clicks" are based on both `mousedown` and `touchstart` events; if that is what you need, then you do not need to specify anything special. However, if you need different events, you can specify these using the `outsideEventTypes` property. If you just need one event, you can pass in the event name as plain string:

```jsx
<MyComponent outsideEventTypes="click" ... />
```

For multiple events, you can pass in the array of event names you need to listen for:

```jsx
<MyComponent outsideEventTypes={["click", "touchend"]} ... />
```

## Common issues

### Uncaught SyntaxError: Unexpected token import

If you get this error, you probably need to make sure whatever ES6 compiler you are using (Babel, etc.) is including the react-onclickoutside-es6 component.

For example, if you are using webpack, you need to add the module to your js loader includes. Something like:

```javascript
{
  test: /\.(js|jsx)$/,
  loader: 'babel',
  include: [
    path.join(__dirname, './node_modules', 'react-onclickoutside-es6'),
    ...
  ]
}
```

## React versions?

This has only been tested on React 15.0.0 and higher.

## Thanks

Thanks to [Pomax](https://github.com/Pomax/react-onclickoutside) for the original onclickoutside component!
