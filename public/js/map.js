(function($) {
  
  $.fn.map = function(lat, lng, options) {

    var opts = $.extend({ }, $.fn.map.defaults, options);

    opts.center = new google.maps.LatLng(lat, lng);
    
    return this.each(function() {
      $(this).data("map", new google.maps.Map(this, opts));
    });
  };
  
  $.fn.getMap = function() {
    var maps = [ ];
    this.each(function() {
      maps.push($(this).data('map'));
    });
    return maps;
  };
  
  $.fn.setCenter = function(lat, lng) {
    this.each(function() {
      $(this).data('map').setCenter(new google.maps.LatLng(lat, lng));
    });
  };
  
  $.fn.setZoom = function(zoom) {
    this.each(function() {
      $(this).data('map').setZoom(zoom);
    });
  };
  
  $.fn.addMarker = function(lat, lng, options) {
    var markers = [ ];
    this.each(function() {
      markers.push(new google.maps.Marker({
        map      : $(this).data('map'),
        position : new google.maps.LatLng(lat, lng)
      }));
    });
    return markers;
  };
  
  $.fn.map.defaults = {
    mapTypeId : google.maps.MapTypeId.ROADMAP,
    zoom      : 8
  };
  
})(jQuery)