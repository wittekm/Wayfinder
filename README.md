# Wayfinder

Find the room. Save the world.

Local setup:
```bash
npm install
npm install -g bower
bower install #  download jQuery, Handlebars
npm install -g grunt-cli
grunt watch
python -m SimpleHTTPServer
```

## Contributing

### Step 1
Room data is kept in `assets/js/src/rooms`. Create the JSON file with room data
in the following format:

```javascript
{
  "name": "Room Name",
  "landmarks": [
    "Array of landmarks",
    " separated by a space"
  ],
  "size": "12 People",
  "floor": "Building and floor"
}
```

### Step 2
Add the new JSON file `Gruntfile.js`:

```javascript
[...]

rooms: {
  options: concatOpts,
  files: {
    // {output path}: {input path}
    'assets/js/dist/sfo-rooms.json': roomIn + 'sfo/*.json',
    'assets/js/dist/aus-rooms.json': roomIn + 'aus/*.json',
    'assets/js/dist/dub-rooms.json': roomIn + 'dub/*.json',
  }
},

[...]
```

### Step 3
Add a button to `index.html`:

```html
<ul class="nav">
  <li><button class="js-set-location btn btn--discrete" data-location="sfo" title="Set location to San Francisco">San Francisco</button></li>
  <li><button class="js-set-location btn btn--discrete" data-location="aus" title="Set location to Austin">Austin</button></li>
  <li><button class="js-set-location btn btn--discrete" data-location="dub" title="Set location to Dublin">Dublin</button></li>
</ul>
```

# Setup Troubleshooting

* If you an encounter a 404 on Wayfinder.min.js: trigger a save on Wayfinder.js while 'grunt watch' is running; this should trigger all the minified assets to be generated.
