import { EventEmitter } from 'events';
import React, { Component, PropTypes } from 'react';
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

  registerEventer(instanceId, events) {
    this.eventers[instanceId] = isArray(events)
      ? events
      : [events];
  }

  unregisterEventer(instanceId) {
    delete this.eventers[instanceId];
  }

  render() {
    return (
      <div>asdf</div>
    );
  }
}

EventBridge.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default EventBridge;
