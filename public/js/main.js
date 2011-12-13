window.onload = function() {

  flavors = [
    [ { shape: 'circle', resolution: 32, size: 6, offset: 8 },
      { shape: 'circle', resolution: 32, size: 9, offset: 16 },
      { shape: 'circle', resolution: 8, size: 19, offset: 0 },
      { shape: 'circle', resolution: 4, size: 2, offset: 0 } ],
    [ { resolution: 24 } ],
    [ { shape: 'square', resolution: 32 },
      { shape: 'circle', resolution: 22, offset: 12 },
      { shape: 'circle', resolution: 22, offset: 0, alpha: 0.5 },
      { shape: 'circle', resolution: 16, size: 9, offset: 0, alpha: 0.5 } ],
    [ { shape : 'circle', resolution : 24 },
      { shape : 'circle', resolution : 24, size: 9, offset: 12 } ],
    [ { shape: 'circle', resolution: 12, size: 29, offset: 0 } ],
    [ { shape: 'circle', resolution: 8, size: 50, offset: 0, alpha: 0.741 },
      { shape: 'diamond', resolution: 10, size: 13, offset: 13, alpha: 0.611 } ],
    [ { shape: 'diamond', resolution: 14, size: 27, offset: 15, alpha: 0.991 },
      { shape: 'circle', resolution: 50, size: 23, offset: 8, alpha: 0.501 },
      { shape: 'circle', resolution: 50, size: 11, offset: 8, alpha: 0.441 } ],
    [ { shape: 'circle', resolution: 12, size: 29, alpha: 0.3 } ]
  ];

  $('img:not(#normal)').each(function(i, img) {
    if (flavors[i]) {
      $(img).closePixelate(flavors[i]);
    }
  });

  $('#nav a').click(function(e) {
    e.preventDefault();
    var scrollTo = $($(this).attr('href')).offset().top - 10;
    $('body').animate({scrollTop: scrollTo}, 1000, 'easeInOutExpo');
  });

};
