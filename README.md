<h1 align="center">React Scroll Appear</h1>
<h3 align="center">Scroll Appear into React components</h3>

<br><br>
Scroll Appear into React components to manage the apparition only web blocks appears on screen.
<br><br>

## Features

- Apparition manager onScroll for React Components
- Manage apparition into screen
- ES7 Decorator

<br>

## Installation

```sh
npm install -S antoninlanglade/react-scroll-appear
```

<br>

## Example

```javascript
import ScrollAppear from 'react-scroll-appear';

// If you want to use decorator
@ScrollAppear.ScrollAppearDecorator

// Else you can setup with more params 
export default class Page extends React.Component {
  constructor() {
    
  }

  // ComponentDidMount
  componentDidMount() {
  	ScrollAppear.scrollAppearManager.add(this);
  }

  // ComponentWillUnmount
  componentWillUnmount() {
  	ScrollAppear.scrollAppearManager.remove(this);
  }

  // Scroll Appear call once if appear onScroll
  scrollAppear() {

  }

  render() {
    return (
      <div ref="component">
        // Your content
      </div>
    )
  }
}
```

<br>

## Usage

### `ScrollAppear.scrollAppearManager.add(reactComponentInstance)`

Add an element into ScrollAppearManager : 
<br>
<br>
`reactComponentInstance` **required** reactComponentInstance
<br>
<br>
Example:
```js
	ScrollAppear.scrollAppearManager.add(this);
```

<br>

### `ScrollAppear.scrollAppearManager.remove(reactComponentInstance)`

Remove an element from ScrollAppearManager : 
<br>
<br>
`reactComponentInstance` **required** reactComponentInstance
<br>
<br>
Example:
```js
	ScrollAppear.scrollAppearManager.remove(this);
```

<br>


## License
MIT.
