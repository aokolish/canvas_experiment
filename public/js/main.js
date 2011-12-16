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

  function setupCanvas() {
    var canvas,
        ctxt,
        x = 0,
        y = 0,
        img = document.getElementById('normal');

    for (i=1; i < 10; i++) {
      var endOfRow = i > 0 && i % 3 === 0;

      canvas = "canvas-" + i;
      canvas = document.getElementById(canvas);


      ctxt = canvas.getContext('2d');
      ctxt.scale(3,3);
      ctxt.drawImage(img,x,y,300,150);

      grayscale(ctxt);

      x -= 100;

      if (endOfRow) {
        y -= 50;
        x = 0;
      }
    }
  }

  //given a canvas context, it changes the pixels
  //to grayscale
  function grayscale (ctxt) {
    var imgd = ctxt.getImageData(0, 0, 300, 150),
        pix = imgd.data;

    for (var i = 0, n = pix.length; i < n; i += 4) {
      var grayscale = pix[i  ] * .3 + pix[i+1] * .59 + pix[i+2] * .11;
      pix[i  ] = grayscale; // red
      pix[i+1] = grayscale; // green
      pix[i+2] = grayscale; // blue
    }

    ctxt.putImageData(imgd, 0, 0);
  }

  function meme() {
    var ctxt = replaceImage();

    ctxt.shadowOffsetX = 2;
    ctxt.shadowOffsetY = 2;
    ctxt.shadowBlur    = 12;
    ctxt.shadowColor   = 'hsl(0, 0%, 0%)';

    ctxt.font = '40pt Impact';
    ctxt.fillStyle = 'white';
    ctxt.fillText("I like . . . The Office", 10, 50);
  }

  //creates a canvas, fills it with image data,
  //and removes the image
  function replaceImage() {
    var img = document.getElementById('dwight'),
        w = img.width,
        h = img.height,
        canvas = document.createElement('canvas'),
        ctxt = canvas.getContext('2d');

    canvas.width = w;
    canvas.height = h;
    canvas.id = img.id;

    ctxt.drawImage(img, 0, 0 );

    // replace image with canvas
    img.parentNode.replaceChild(canvas, img);
    return ctxt;
  }

  setupCanvas();
  meme();
};


//how to invert colors
/*for (var i = 0, n = pix.length; i < n; i += 4) {
  pix[i  ] = 255 - pix[i  ]; // red
  pix[i+1] = 255 - pix[i+1]; // green
  pix[i+2] = 255 - pix[i+2]; // blue
  // i+3 is alpha (the fourth element)
}*/
