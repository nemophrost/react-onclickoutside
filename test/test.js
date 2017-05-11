var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

import OnClickOutside from '../index'
import PureOnClickOutside from '../pure'

describe('OnClickOutside Class', function() {

  class TestComponent extends OnClickOutside {
    render() {
      return React.createElement('div')
    }
  }

  // tests

  it('should call onClickOutside when mousedown on the document', function() {
    let clickHandled = false
    const element = React.createElement(TestComponent, { onClickOutside: () => {
      clickHandled = true
    } });
    assert(element, "element can be created");
    const component = TestUtils.renderIntoDocument(element);
    assert(component, "component renders correctly");
    document.dispatchEvent(new Event('mousedown'));
    assert(clickHandled, "clickHandled got flipped");
  });


  it('should call onClickOutside when clicking the document if outsideEventTypes is specified as click', function() {
    let clickHandled = false
    const element = React.createElement(TestComponent, {
      onClickOutside: () => {
        clickHandled = true
      },
      outsideEventTypes: 'click'
    });
    assert(element, "element can be created");
    const component = TestUtils.renderIntoDocument(element);
    assert(component, "component renders correctly");

    document.dispatchEvent(new Event('mousedown'));
    assert(!clickHandled, "clickHandled didn't get flipped");

    document.dispatchEvent(new Event('click'));
    assert(clickHandled, "clickHandled got flipped");
  });
});

describe('Pure OnClickOutside Class', function() {

  class TestComponent extends PureOnClickOutside {
    render() {
      return React.createElement('div')
    }
  }

  // tests

  it('should call onClickOutside when mousedown on the document', function() {
    let clickHandled = false
    const element = React.createElement(TestComponent, { onClickOutside: () => {
      clickHandled = true
    } });
    assert(element, "element can be created");
    const component = TestUtils.renderIntoDocument(element);
    assert(component, "component renders correctly");
    document.dispatchEvent(new Event('mousedown'));
    assert(clickHandled, "clickHandled got flipped");
  });


  it('should call onClickOutside when clicking the document if outsideEventTypes is specified as click', function() {
    let clickHandled = false
    const element = React.createElement(TestComponent, {
      onClickOutside: () => {
        clickHandled = true
      },
      outsideEventTypes: 'click'
    });
    assert(element, "element can be created");
    const component = TestUtils.renderIntoDocument(element);
    assert(component, "component renders correctly");

    document.dispatchEvent(new Event('mousedown'));
    assert(!clickHandled, "clickHandled didn't get flipped");

    document.dispatchEvent(new Event('click'));
    assert(clickHandled, "clickHandled got flipped");
  });
});
