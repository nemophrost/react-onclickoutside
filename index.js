import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

const DEFAULT_EVENTS = ['mousedown', 'touchstart']

class OnClickOutside extends Component {
  constructor(props) {
    super(props)

    this.__handler = this.__handler.bind(this)
  }

  __handler(e) {
    if (this.props.onClickOutside) {
      let current = e.target
      let found = false
      const componentNode = ReactDOM.findDOMNode(this)
      // If source=local then this event came from "somewhere"
      // inside and should be ignored. We could handle this with
      // a layered approach, too, but that requires going back to
      // thinking in terms of Dom node nesting, running counter
      // to React's "you shouldn't care about the DOM" philosophy.
      while(current.parentNode) {
        if (current === componentNode) {
          return
        }
        current = current.parentNode
      }
      // If element is in a detached DOM, consider it "not clicked
      // outside", as it cannot be known whether it was outside.
      if (current !== document) {
        return
      }

      this.props.onClickOutside(e)
    }
  }

  componentDidMount() {
    let events = (this.props.outsideEventTypes || DEFAULT_EVENTS)
    if (!events.forEach) {
      events = [events]
    }
    events.forEach(eventName => {
      document.addEventListener(eventName, this.__handler, false)
    })
    // store the actual bound events for unbinding later
    // in case outsideEventTypes changes
    this.__boundEvents = events
  }

  componentWillUnmount() {
    this.__boundEvents.forEach(eventName => {
      document.removeEventListener(eventName, this.__handler, false)
    })
  }
}

OnClickOutside.propTypes = {
  onClickOutside: PropTypes.func.isRequired,
  outsideEventTypes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
}

export default OnClickOutside
