'use strict';

var _forEach = require('lodash-compat/collection/forEach'),
    _extend = require('lodash-compat/object/extend'),
    eventsModule = {};

// function setupDOMListener(object, eventName, handler) {
//   google.maps.event.addDomListener(object, eventName, function() {
//     handler.call(this, this);
//   });
// }

function on(eventName, scope, handler) {
  var isNativeEvent = (GMaps.customEvents.indexOf(eventName) === -1);

  if (isNativeEvent) {
    if (scope instanceof GMaps) {
      scope = scope.map;
    }

    return google.maps.event.addListener(scope, eventName, handler);
  }
  else {
    scope.registeredEvents[eventName] = scope.registeredEvents[eventName] || [];

    var registeredEvents = scope.registeredEvents[eventName],
        registeredEvent = {
          handler: handler,
          eventName: eventName
        };

    registeredEvents.push(registeredEvent);

    console.log(registeredEvents === scope.registeredEvents[eventName]);

    return registeredEvent;
  }
}

function off(eventName, scope) {
  var isNativeEvent = (GMaps.customEvents.indexOf(eventName) === -1);

  if (isNativeEvent) {
    if (scope instanceof GMaps) {
      scope = scope.map;
    }

    google.maps.event.clearListeners(scope, eventName);
  }
  else {
    scope.registeredEvents[eventName] = [];
  }
}

function trigger(eventName, scope, object) {
  if (arguments.length === 2) {
    object = scope;
  }

  var isNativeEvent = (GMaps.customEvents.indexOf(eventName) === -1),
      handlerArguments = Array.prototype.slice.call(arguments, 2),
      eventArguments = [object, eventName].concat(handlerArguments),
      customEventsToTrigger;

  if (isNativeEvent) {
    google.maps.event.trigger.apply(scope, eventArguments);
  }
  else {
    customEventsToTrigger = scope.registeredEvents[eventName];

    if (customEventsToTrigger) {
      _forEach(customEventsToTrigger, function(eventToTrigger) {
        var handler = eventToTrigger.handler;

        handler.apply(scope, handlerArguments);
      });
    }
  }
}

eventsModule.on = function(eventName, scope, handler) {
  if (arguments.length === 2) {
    scope = this;
    handler = arguments[1];
  }

  return GMaps.on(eventName, scope, handler);
};

eventsModule.off = function(eventName, scope) {
  if (arguments.length === 1) {
    scope = this;
  }

  GMaps.off(eventName, scope);
};

eventsModule.trigger = function(eventName, scope, object) {
  if (arguments.length === 2) {
    object = scope;
  }

  GMaps.trigger(eventName, scope, object);
};

eventsModule.fire = eventsModule.trigger;

if (window.GMaps) {
  GMaps.on = on;
  GMaps.off = off;
  GMaps.trigger = trigger;
  GMaps.fire = trigger;
  GMaps.customEvents = [];

  _extend(GMaps.prototype, eventsModule);
}

module.exports = eventsModule;