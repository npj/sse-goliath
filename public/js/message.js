var MessageControl = function(form) {
  var self = {
    form   : $(form),
    text   : null,
    submit : null,
    lat    : null,
    lng    : null,
    
    init : function() {
      
      self.text   = self.form.find('input[type=text]');
      self.submit = self.form.find('input[type=submit]');
      
      self.form.on("submit", self.onSubmit);
      
      return self;
    },
    
    setGeo : function(lat, lng) {
      self.lat = lat;
      self.lng = lng;
    },
    
    onSubmit : function(e) {
      $.ajax({
        url        : self.form.attr('action'),
        type       : 'POST',
        data       : { message : self.text.val(), lat : self.lat, lng : self.lng },
        beforeSend : self.beforeSubmit,
        complete   : self.onComplete
      });
      return false;
    },
    
    beforeSubmit : function() {
      self.text.prop("disabled", true);
      self.submit.prop("disabled", true);
    },
    
    onComplete : function() {
      self.text.prop("disabled", false);
      self.submit.prop("disabled", false);
      self.text.val("");
    }
  };
  
  return self.init();
};