describe("Creating event listeners", function() {
  var mapWithEvents, readyEvent;

  GMaps.customEvents.push('ready');

  beforeEach(function() {
    mapWithEvents = mapWithEvents || new GMaps({
      el : '#events',
      lat : -12.0433,
      lng : -77.0283,
      zoom : 12
    });
  });

  describe("for google.maps events", function() {
    var nativeCallbacks;

    beforeEach(function() {
      nativeCallbacks = nativeCallbacks || {
        map : {
          onclick : function() {
            console.log('nativeCallbacks.map.onclick');
          }
        }
      };

      expect.spyOn(nativeCallbacks.map, 'onclick').andCallThrough();
    });

    describe("To a map", function() {
      it("should add the listener to the native listeners collection", function() {
        var clickEvent = GMaps.on('click', mapWithEvents.map, nativeCallbacks.map.onclick);

        expect(mapWithEvents.map['__e3_']['click'][clickEvent['id']]).toExist();
        expect(mapWithEvents.map['__e3_']['click'][clickEvent['id']]).toEqual(clickEvent);
      });
    });

    describe('registering native events', function() {
      it('custom registeredEvents should not exist', function() {
        mapWithEvents.on('bounds_changed', function handler(){ });
        
        expect(mapWithEvents.registeredEvents['bounds_changed']).toNotExist();
      });

      it('delegates the listener to google.map', function() {
        var called = false;

        mapWithEvents.on('bounds_changed', function handler() { called = true });

        google.maps.event.trigger(mapWithEvents.map, 'bounds_changed');
        expect(called).toEqual(true);
      });
    });
    
    describe('removing native events', function() {
      it('removes listener from google.map', function() {
        var neverCalled = true;

        mapWithEvents.on('bounds_changed', function() { neverCalled = false });
        mapWithEvents.off('bounds_changed');

        google.maps.event.trigger(mapWithEvents.map, 'bounds_changed');
        expect(neverCalled).toEqual(true);
      });
    });
  });

  describe("for GMaps events", function() {
    var gmapsCallbacks;

    beforeEach(function() {
      gmapsCallbacks = {
        ready : function() {
          // console.log('gmapsCallbacks.ready called');
        }
      };

      expect.spyOn(gmapsCallbacks, 'ready').andCallThrough();
    });

    describe("#ready", function() {
      beforeEach(function() {
        readyEvent = GMaps.on('ready', mapWithEvents, gmapsCallbacks.ready);
      });

      it("should add the listener to the listeners collection", function() {
        expect(mapWithEvents.registeredEvents['ready'][0]).toEqual(readyEvent);
      });

      it("should trigger the listener created", function() {
        GMaps.trigger('ready', mapWithEvents);

        expect(gmapsCallbacks.ready).toHaveBeenCalled();
      });

      afterEach(function() {
        GMaps.off('ready', mapWithEvents);
      });
    });
  });
});