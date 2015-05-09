# gmaps.events

gmaps.js module to manage native and custom events.

## Install

For using with bundlers (as Browserify or Webpack):

`npm install gmaps.events --save`

Before `require()` this module you need to `require('gmaps.core')`.

For using directly in the browser, download the `gmaps.events.js` (or `gmaps.events.min.js`) in `dist`.

## Usage

You need to register a `<script>` tag with the Google Maps JavaScript API, then import gmaps.core.

Every Google Maps map needs a container (`<div id="map"></div>` in this demo), which needs to have width and height, and be visible (without `display: none`, for example):

```
<!DOCTYPE html>
<html>
<head>
  <title>Test</title>
  <script src="http://maps.google.com/maps/api/js?sensor=true"></script>
  <script src="gmaps.core.js"></script>
  <script src="gmaps.events.js"></script>
  <style type="text/css">
    #map {
      width: 400px;
      height: 400px;
    }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    var map = new GMaps({
      el : '#map',
      lat: -12.0433,
      lng: -77.0283,
      zoom: 12
    });

    map.on('click', function() {
      console.log('Map clicked');
    });
  </script>
</body>
</html>
```

For more examples you can check the tests in this repo.

## Documentation

### `on(eventName, scope, handler)`

Create a new event listener and attach a `handler` function to a `scope`, which can be a `google.maps.*` object that supports events, or a `GMaps` instance:

#### `google.maps.*` objects:

The supported events depends of the scope (i.e. a [google.maps.Map](https://developers.google.com/maps/documentation/javascript/reference#Map) object supports the `projection_changed` event, but a [google.maps.Marker](https://developers.google.com/maps/documentation/javascript/reference#Marker) doesn't).

#### `GMaps` instances:

According to the loaded modules, a new group of events can be supported (i.e. the `gmaps.markers` module supports `marker_added` and `marker_removed` events). For `GMaps` instances you can omit the `scope` argument, since always will be the `GMaps` instance itself.

You can check the supported events reading the `GMaps.customEvents` property.

### `off(eventName, scope)`

Remove all the listeners for the `eventName`. The `scope` can be any `google.maps.*` object that supports events, or a `GMaps` instance.

### `trigger(eventName, scope, object)`

Triggers all the `handler` functions attached to a `eventName` inside a `scope`. The `scope` can be any `google.maps.*` object that supports events, or a `GMaps` instance:

#### `GMaps` instances:

For `GMaps` instances you can omit the `scope` argument, since always will be the `GMaps` instance itself. For custom events (defined in another gmaps.js module), you can pass an `object` (i.e. for the `marker_added` event, you can pass the recently added marker).

## Changelog

For pre 0.5.0 versions, check [gmaps.js changelog](https://github.com/hpneo/gmaps#changelog)

### 0.5.0

* Node module format (CommonJS)

## License

MIT License. Copyright 2015 Gustavo Leon. http://github.com/hpneo

Permission is hereby granted, free of charge, to any
person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the
Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the
Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice
shall be included in all copies or substantial portions of
the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY
KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.