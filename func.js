function loadpoints(url) {
  jQuery.ajax({
    url: url,
    dataType: "json",
    beforeSend: function(){
        //$(this).closest('div').html('getting file...');
    },
    success: function(data) {
          //$(this).closest('div').html(data);
          window.points = data;
    },
    complete: function(){
        //stuff here
        jfpioam(window.points.features);
    }

  });
}


function jfpioam(data){
  function onEachFeature(feature, layer) {
      // does this feature have a property named Commentary?
      var popUpText;
      if (feature.properties) {
          popUpText = '<strong>' + feature.properties.Name + '</strong><br />' + feature.properties.Address + '<br />' + feature.properties.Commentary;
          if (feature.properties.Phone) {
            popUpText += '<em>' + feature.properties.Phone + '</em>';
          }
          layer.bindPopup(popUpText);
      }
  }

    var map = L.map('map-div', {scrollWheelZoom: false}).setView([39.7595884,-95], 4);

  L.tileLayer('https://{s}.tiles.mapbox.com/v3/drewrwilson.i6935ig3/{z}/{x}/{y}.png', {
      attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>',
      maxZoom: 18
  }).addTo(map);

  L.geoJson(data, {
      onEachFeature: onEachFeature
  }).addTo(map);

  //initialize currentCol as 'left'
  var currentCol = 'left';
}
