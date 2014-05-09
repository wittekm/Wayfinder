$(document).ready(function(){

  var roomsList = new Bloodhound({
    name: 'sf-rooms',
    datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.name); },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    limit: 10,
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
      suggestion: Handlebars.compile('<h3>{{name}}</h3><p>{{landmarks}}</p><p class="meta"><small>{{size}}</small></p>')
    }
  });

});
