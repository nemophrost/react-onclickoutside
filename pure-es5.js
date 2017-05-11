'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_EVENTS = ['mousedown', 'touchstart'];

var OnClickOutside = function (_PureComponent) {
  _inherits(OnClickOutside, _PureComponent);

  function OnClickOutside(props) {
    _classCallCheck(this, OnClickOutside);

    var _this = _possibleConstructorReturn(this, (OnClickOutside.__proto__ || Object.getPrototypeOf(OnClickOutside)).call(this, props));

    _this.__handler = _this.__handler.bind(_this);
    return _this;
  }

  _createClass(OnClickOutside, [{
    key: '__handler',
    value: function __handler(e) {
      if (this.props.onClickOutside) {
        var current = e.target;
        var found = false;
        var componentNode = _reactDom2.default.findDOMNode(this);
        // If source=local then this event came from "somewhere"
        // inside and should be ignored. We could handle this with
        // a layered approach, too, but that requires going back to
        // thinking in terms of Dom node nesting, running counter
        // to React's "you shouldn't care about the DOM" philosophy.
        while (current.parentNode) {
          if (current === componentNode) {
            return;
          }
          current = current.parentNode;
        }
        // If element is in a detached DOM, consider it "not clicked
        // outside", as it cannot be known whether it was outside.
        if (current !== document) {
          return;
        }

        this.props.onClickOutside(e);
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var events = this.props.outsideEventTypes || DEFAULT_EVENTS;
      if (!events.forEach) {
        events = [events];
      }
      events.forEach(function (eventName) {
        document.addEventListener(eventName, _this2.__handler, false);
      });
      // store the actual bound events for unbinding later
      // in case outsideEventTypes changes
      this.__boundEvents = events;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _this3 = this;

      this.__boundEvents.forEach(function (eventName) {
        document.removeEventListener(eventName, _this3.__handler, false);
      });
    }
  }]);

  return OnClickOutside;
}(_react.PureComponent);

OnClickOutside.propTypes = {
  onClickOutside: _propTypes2.default.func.isRequired,
  outsideEventTypes: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array])
};

exports.default = OnClickOutside;
