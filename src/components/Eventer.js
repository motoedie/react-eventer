import hasValue from '../utils/hasValues';
import hoistStatics from 'hoist-non-react-statics';
import invariant from 'invariant';
import isArray from 'lodash.isarray';
import shortid from 'shortid';
import { Component, PropTypes, createElement } from 'react';

export default function eventer(registeredEvents) {
  return function wrapWithEventer(WrappedComponent) {
    class Eventer extends Component {
      constructor(props, context) {
        super(props, context);
        invariant(hasValue(registeredEvents), '');
        const instanceId = this.instanceId = shortid.generate();
        this.context.registerEventer(
          instanceId,
          isArray(registeredEvents)
            ? registeredEvents
            : [registeredEvents],
        );
      }

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
