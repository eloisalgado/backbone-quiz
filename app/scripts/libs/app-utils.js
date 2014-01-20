define([], function() {
  return {

    setBreadcumbs: function(hash) {
      $('.breadcrumb li a.active').removeClass('active');
      $('.breadcrumb li a[href="' + hash + '"]').addClass('active');
    }

  }
});