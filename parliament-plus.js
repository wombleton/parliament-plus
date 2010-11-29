(function($, undefined) {
  function generateLink(key, text) {
    return $('<span> <a title="permalink" href="' + getHref(key) + '">' + text + '</a> </span>');
  }

  function getHref(key) {
    return 'http://www.parliament.nz/' + locale + '/?document=' + key;
  }

  var doc = $(document),
      width = doc.width(),
      l = window.location,
      locale = (l.pathname.match(/$\/([^\/])\/.+/) || [])[1] || 'en-NZ',
      QWA_RE = new RegExp(locale + '.+/QOA/.+/([^/]+_[0-9]+_[0-9]+).+$'),
      QOA_RE = new RegExp(locale + '.+/QWA/.+/([^/]+_[0-9]+_[0-9]+).+$');

  if (width >= 1280) {
    $('body').addClass('wide');
  }
  $(document).ready(function() {

    $('a[href*=.pdf]:has(cite)').each(function() {
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
      })).attr('target', '_blank');
      embedUrl = 'http://docs.google.com/viewer?' + $.param({
        url: url,
        embedded: 'true'
      });
      para = $(".copy .section p:contains(et this document in PDF format from the ):last");
      iframe = $('<iframe src="' + embedUrl + '" style="width:750px; height:500px;" frameborder="0"></iframe>');
      if (para.length) {
        iframe.insertAfter(para);
      } else {
        iframe.appendTo('.copy .section:first');
      }
    });

    $('a').each(function() {
      var $this = $(this),
          href = $this.attr('href') || '',
          key,
          match = href.match(QOA_RE) || href.match(QWA_RE);

      if (match) {
        key = match[1];
        generateLink(key, '#').insertAfter($this);
      }
    });

    $('div.answer').each(function() {
      var $this = $(this),
          re = /((?:QWA )?(\d+) \((\d{4})\))/g,
          text = $this.html(),
          match = text.match(re);

      if (match) {
        $this.html(text.replace(re, '<a href="http://www.parliament.nz/' + locale + '/?document=QWA_$2_$3">$1</a>'));
      }
    });


  });

}(jQuery));
