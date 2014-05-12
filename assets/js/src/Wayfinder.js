$(document).ready(function(){

  var roomsList = new Bloodhound({
    name: 'sf-rooms',
    datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.name); },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    limit: 3,
    local: [
      {
        "name": "Turbo",
        "landmarks": ["Between The Mint and Tupac", " opposite Lobby 6 elevators", " Reception side"],
        "size": "12 People",
      },

      {
        "name": "Titan",
        "landmarks": ["Between The Mint and Tupac", " opposite Lobby 6 elevators", " Café side"],
        "size": "12 People",
      },

      {
        "name": "Sonic",
        "landmarks": ["Opposite the gym", " between The Mint and the Café ", " Reception side"],
        "size": "12 People",
      },

      {
        "name": "Nitro",
        "landmarks": ["Opposite the gym", " between The Mint and the Café ", " Café side"],
        "size": "12 People",
      },

      {
        "name": "Chaos",
        "landmarks": ["Between the Café and Biggie", " opposite Lobby 2 elevators ", " Café side"],
        "size": "12 People",
      },

      {
        "name": "Doorman Drew",
        "landmarks": ["By the Reception", " towards Biggie ", " Reception side"],
        "size": "12 People",
      },

      {
        "name": "Supply Depot",
        "landmarks": ["By the Mint", " Reception side"],
        "size": "2 People",
      },

      {
        "name": "Sixpool",
        "landmarks": ["By the Mint", " Reception side"],
        "size": "2 People",
      },

      {
        "name": "Santa Barbara Honda",
        "landmarks": ["By the Mint", " Reception side"],
        "size": "2 People",
      },

      {
        "name": "Rainbow Shell",
        "landmarks": ["By the Mint", " Café side"],
        "size": "2 People",
      },

      {
        "name": "Psychobox",
        "landmarks": ["By the Mint", " Café side"],
        "size": "2 People",
      },

      {
        "name": "Powerthrough",
        "landmarks": ["By the Mint", " Café side"],
        "size": "2 People",
      },

      {
        "name": "Sync",
        "landmarks": ["Opposite the Mint"],
        "size": "Interviews only",
      },

      {
        "name": "Check",
        "landmarks": ["Opposite the Mint"],
        "size": "Interviews only",
      },

      {
        "name": "Heart",
        "landmarks": ["Opposite the Mint"],
        "size": "Interviews only",
      },

      {
        "name": "Shalimar",
        "landmarks": ["In Tupac", " behind the snacks"],
        "size": "4 People",
      },

      {
        "name": "Jenny (8675309)",
        "landmarks": ["In Tupac", " between the snacks and the elevators"],
        "size": "2 People",
      },

      {
        "name": "Dropbox blue (1f75CC)",
        "landmarks": ["In Tupac", " between the snacks and the elevators"],
        "size": "2 People",
      },

      {
        "name": "Tulan",
        "landmarks": ["In Tupac", " between the snacks and the elevators"],
        "size": "2 People",
      },

      {
        "name": "HALP",
        "landmarks": ["Between the Reception and Biggie", " Reception side"],
        "size": "2 People",
      },

      {
        "name": "Fortress of Solitude",
        "landmarks": ["Between the Reception and Biggie", " Reception side"],
        "size": "2 People",
      },

      {
        "name": "First World Problem",
        "landmarks": ["Between the Reception and Biggie", " Reception side"],
        "size": "2 People",
      },

      {
        "name": "Muracci’s",
        "landmarks": ["Between the Reception and Biggie", " opposite the Lobby 2 elevators", " Reception side"],
        "size": "4 People",
      },

      {
        "name": "Katana-ya",
        "landmarks": ["Between the Reception and Biggie", " opposite the Lobby 2 elevators", " Reception side"],
        "size": "4 People",
      },

      {
        "name": "Carousel",
        "landmarks": ["In Biggie", " Reception side"],
        "size": "2 People",
      },

      {
        "name": "Bikeshed",
        "landmarks": ["In Biggie", " Reception side"],
        "size": "2 People",
      },

      {
        "name": "Arrears",
        "landmarks": ["In Biggie", " Reception side"],
        "size": "2 People",
      },

      {
        "name": "Back to The Future",
        "landmarks": ["In Biggie", " behind the snacks"],
        "size": "10 People",
      },

      {
        "name": "The Future is Now",
        "landmarks": ["In Biggie", " behind the snacks"],
        "size": "10 People",
      },

      {
        "name": "All Seasons",
        "landmarks": ["In Biggie", " between the snacks and the elevators"],
        "size": "4 People",
      },

      {
        "name": "Challenge Accepted",
        "landmarks": ["Between the Café and Biggie", " Café side"],
        "size": "2 People",
      },

      {
        "name": "Champageday",
        "landmarks": ["Between the Café and Biggie", " Reception side"],
        "size": "2 People",
      },

      {
        "name": "Ferdonic Plague",
        "landmarks": ["By the Café", " towards Biggie", " Café side"],
        "size": "2 People",
      },

      {
        "name": "Crystal Towers",
        "landmarks": ["By the Café", " towards Biggie", " Café side"],
        "size": "2 People",
      },

      {
        "name": "Coin Battle",
        "landmarks": ["By the Café", " towards Biggie", " Café side"],
        "size": "2 People",
      },

      {
        "name": "It is What It is",
        "landmarks": ["By the Café", " towards Tupac", " Café side"],
        "size": "2 People",
      },

      {
        "name": "Masamune",
        "landmarks": ["By the Café", " towards Tupac", " Café side"],
        "size": "2 People",
      },

      {
        "name": "Meteor Crater",
        "landmarks": ["By the Café", " towards Tupac", " Café side"],
        "size": "2 People",
      },

      {
        "name": "Ohshoot",
        "landmarks": ["By the Reception", " Café side"],
        "size": "2 People",
      },

      {
        "name": "Shipping",
        "landmarks": ["Inside the Reception lobby"],
      },

      {
        "name": "Receiving",
        "landmarks": ["Inside the Reception lobby"],
      },
    ]
  });

  var promise = roomsList.initialize();

  promise
  .done(function() { console.log('success!'); })
  .fail(function() { console.log('err!'); });

  $('.js-typeahead').typeahead({
    highlight: true
  }, {
    name: 'sf-rooms',
    displayKey: 'name',
    source: roomsList.ttAdapter(),
    templates: {
      suggestion: Handlebars.compile('<h3>{{name}}</h3><p>{{landmarks}}</p><p class="meta"><small>{{size}}</small></p>'),
      empty: '<h3 class="promo">No rooms found</h3><p class="promo">Bummer.</p>'
    }
  });

});
