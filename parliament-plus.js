(function($, undefined) {

  $(document).ready(function() {

    var doc = $(document),
        width = doc.width();

    if (width >= 1280) {
      $('body').addClass('wide');
    }
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

    $('div.answer').each(function() {
      var $this = $(this),
          re = /((?:QWA )?(\d+) \((\d{4})\))/g,
          text = $this.html(),
          match = text.match(re);

      if (match) {
        $this.html(text.replace(re, '<a href="http://www.parliament.nz/en-NZ/?document=QWA_$2_$3">$1</a>'));
      }
    });

  });

}(jQuery));
