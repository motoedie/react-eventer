import { EventEmitter } from 'events';
import React, { Component, PropTypes, Children } from 'react';
import isArray from 'lodash.isarray';

class Emitter extends EventEmitter {
  emitchange(eventName) {
    this.emit(eventName);
  }

  addChangeLister(eventName, callback) {
    this.on(eventName, callback);
  }
}

class EventBridge extends Component {
  constructor(props, context) {
    super(props, context);
    this.eventers = {};
  }

  getChildContext() {
    return {
      emitEvent: this.emitEvent,
      registerEventer: this.registerEventer,
      unregisterEventer: this.unregisterEventer,
    };
  }

  registerEventer = (instanceId, events) => {
    console.log(`registering eventer ${instanceId}`);
    this.eventers[instanceId] = isArray(events)
      ? events
      : [events];
  }

  unregisterEventer = (instanceId) => {
    delete this.eventers[instanceId];
  }

  emitEvent = () => {
    console.log('emitting');
  }

  render() {
    return Children.only(this.props.children);
  }
}

EventBridge.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

EventBridge.childContextTypes = {
  emitEvent: PropTypes.func.isRequired,
  registerEventer: PropTypes.func.isRequired,
  unregisterEventer: PropTypes.func.isRequired,
};

export default EventBridge;
