

'use strict';

var React = require('React');
var StyleSheet = require('StyleSheet');
var Text = require('Text');
var View = require('View');

var DummyTouchableNativeFeedback = function (_React$Component) {
  babelHelpers.inherits(DummyTouchableNativeFeedback, _React$Component);

  function DummyTouchableNativeFeedback() {
    babelHelpers.classCallCheck(this, DummyTouchableNativeFeedback);
    return babelHelpers.possibleConstructorReturn(this, (DummyTouchableNativeFeedback.__proto__ || Object.getPrototypeOf(DummyTouchableNativeFeedback)).apply(this, arguments));
  }

  babelHelpers.createClass(DummyTouchableNativeFeedback, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        View,
        { style: [styles.container, this.props.style] },
        React.createElement(
          Text,
          { style: styles.info },
          'TouchableNativeFeedback is not supported on this platform!'
        )
      );
    }
  }]);
  return DummyTouchableNativeFeedback;
}(React.Component);

var styles = StyleSheet.create({
  container: {
    height: 100,
    width: 300,
    backgroundColor: '#ffbcbc',
    borderWidth: 1,
    borderColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
  info: {
    color: '#333333',
    margin: 20
  }
});

module.exports = DummyTouchableNativeFeedback;