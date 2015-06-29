window.onload = function() {

  // Detect if installed as webapp
  if (("standalone" in window.navigator) && window.navigator.standalone){
    var e = document.querySelectorAll("body")[0];

    e.classList.add("js--is-fullscreen");
  }
}

var rooms = localStorage.getItem("location") || "sfo";

$(document).ready(function(){

  var locationButtons = $('.js-set-location');

  $.each(locationButtons, function(i, button) {
    var loc = $(button).attr('data-location');

    if(loc == rooms) {
      $(button).toggleClass('btn--discrete btn--primary');
    }

    $(button).on('click', function() {
      localStorage.setItem("location", loc);
      window.location.reload();
    });
  });

  var roomsList = new Bloodhound({
    name: 'sf-rooms',
    datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.name); },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    limit: 3,
    prefetch: "./assets/js/dist/" + rooms + "-rooms.json"
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
      suggestion: Handlebars.compile('<h3>{{name}}</h3>
      <p>{{landmarks}}</p>
      <p><small class="meta">{{size}} &bull; {{floor}}</small></p>'),
      empty: '<h3 class="promo">No rooms found</h3><p class="promo">Bummer.</p>'
    }
  });

  var input = document.querySelectorAll(".tt-input")[0];
  $(input).click().focus();

  $('.menu--toggle').change(function(){
    if ($(this).prop("checked") == false) {
      $(input).click().focus();
    }
  });

});
