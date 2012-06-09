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
  
  var loading = popup("Finding your location...");
  
  loading.show();
  Geo.locate(function(pos) {
    $('.map').map(pos.coords.latitude, pos.coords.longitude, 0, { 
      streetViewControl : false
    });
    $('.map').addMarker(pos.coords.latitude, pos.coords.longitude);
    $('.map').setZoom(acc2zoom(pos.coords.accuracy - 2));
    loading.fadeOut(500);
  });
    
  // var source = new EventSource('http://0.0.0.0:9000/source');
  //           
  //           var onMessage = function(data) {
  //             console.log(data);
  //             $("div.messages").append(JSON.parse(data.data)['message'] + " ");
  //           };
  //           
  //           source.addEventListener('message', onMessage, false);
});