function popup(message) {
  var p = $('.popup');
  p.find('.message').html(message);
  p.css({
    left : $('body').width()  / 2 - p.outerWidth()  / 2,
    top:   $('body').height() / 2 - p.outerHeight() / 2
  });
  p.click(function() {
    $(this).fadeOut(500);
  });
  return p;
}

function geoError(e) {
  popup(e.message).show().delay(5000).fadeOut(500);
}

Geo.notSupported        = geoError;
Geo.permissionDenied    = geoError;
Geo.positionUnavailable = geoError;
Geo.timeout             = geoError;

function acc2zoom(acc) {
  if(acc > 18) {
    return 18;
  }
  else {
    return acc;
  }
}

$(document).ready(function() {
  
  var ctrl    = new MessageControl(".form-container form");
  var loading = popup("Finding your location...");
  
  loading.show();
  Geo.locate(function(pos) {
    $('.map').map(pos.coords.latitude, pos.coords.longitude, 0, { 
      streetViewControl : false
    });
    $('.map').addMarker(pos.coords.latitude, pos.coords.longitude);
    $('.map').setZoom(acc2zoom(pos.coords.accuracy - 2));
    loading.fadeOut(500);
    
    ctrl.setGeo(pos.coords.latitude, pos.coords.longitude);
  });
    
  var source = new EventSource('/source')
  
  source.addEventListener('message', function(data) {
    
    var data = JSON.parse(data.data);
    
    var window = new google.maps.InfoWindow();
    window.setContent(data.message);
    window.setPosition(new google.maps.LatLng(data.lat, data.lng));
    window.open($('.map').getMap()[0]);
    setTimeout(function() { window.close() }, 3000);
    
  }, false);
});