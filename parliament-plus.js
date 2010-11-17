(function($, undefined) {
  $(document).ready(function() {
    $('a[href*=.pdf]').addClass('google-pdf').each(function() {
      var $this = $(this),
        url = $this.attr('href'),
        l = window.location;
      if (url.indexOf('/') === 0) {
        url = l.protocol + '//' + l.hostname + url;
      }

      $this.attr('href', 'http://docs.google.com/viewer?' + $.param({
        url: url
      }));
    });
  });
}(jQuery));
