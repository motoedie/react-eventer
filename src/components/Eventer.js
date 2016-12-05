import { Component, PropTypes, createElement } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import shortid from 'shortid';

export default function eventer() {
  return function wrapWithEventer(WrappedComponent) {
    class Eventer extends Component {
      constructor(props, context) {
        super(props, context);
        const instanceId = this.instanceId = shortid.generate();
        this.context.registerEventer(instanceId);
      }

      // registerEventer = () => {
      //   this.context.registerEventer(this.instanceId);
      // }

      componentWillUnmount() {
        this.context.unregisterEventer(this.instanceId);
      }

      render() {
        return createElement(WrappedComponent, {
          emitEvent: (eventName, data) => {
            this.context.emitEvent(eventName, data);
          },
        });
      }
    }

    Eventer.contextTypes = {
      emitEvent: PropTypes.func.isRequired,
      registerEventer: PropTypes.func.isRequired,
      unregisterEventer: PropTypes.func.isRequired,
    };

    return hoistStatics(Eventer, WrappedComponent);
  };
}
