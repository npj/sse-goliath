var Geo = {
  
  locate : function(success) {
    
    function error(e) {
      switch(e.code) {
        case -1: 
          return Geo.notSupported(e)

        // PERMISSION_DENIED
        case 1: 
          return Geo.permissionDenied(e)

        // POSITION UNAVAILABLE
        case 2: 
          return Geo.positionUnavailable(e)

        // TIMEOUT
        case 3: 
          return Geo.timeout(e)
      }
    }
    
    if(navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(success, error);
    }
    else {
      error(Geo.errors.not_supported);
    }
  },
  
  notSupported        : function(e) { },
  permissionDenied    : function(e) { },
  positionUnavailable : function(e) { },
  timeout             : function(e) { },
  
  errors : {
    not_supported : {
      code    : -1,
      message : "You browser does not support geolocation." 
    }
  }
};
