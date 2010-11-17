(function($, undefined) {
  $(document).ready(function() {
    $('a[href*=.pdf]:has(cite)').addClass('google-pdf').each(function() {
      var $this = $(this),
        iframe,
        para,
        url = $this.attr('href'),
        embedUrl,
        l = window.location;
      if (url.indexOf('/') === 0) {
        url = l.protocol + '//' + l.hostname + url;
      }

      $this.attr('href', 'http://docs.google.com/viewer?' + $.param({
        url: url
      }));
      embedUrl = 'http://docs.google.com/viewer?' + $.param({
        url: url,
        embedded: 'true'
      });
      para = $(".copy .section p:contains(et this document in PDF format from the ):last");
      iframe = $('<iframe src="' + embedUrl + '" style="width:585px; height:500px;" frameborder="0"></iframe>');
      if (para.length) {
        iframe.insertAfter(para);
      } else {
        iframe.appendTo('.copy .section:first');
      }
    });
  });
}(jQuery));
