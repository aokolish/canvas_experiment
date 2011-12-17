(function() {
  var Demo;

  Demo = (function() {
    var flavors, grayscale, meme, one, replaceImage, setupCanvas;

    function Demo() {
      one();
      meme();
      setupCanvas();
      $('#nav a').click(function(e) {
        var scrollTo;
        e.preventDefault();
        scrollTo = $($(this).attr('href')).offset().top - 10;
        return $('body').animate({
          scrollTop: scrollTo
        }, 1000, 'easeInOutExpo');
      });
    }

    flavors = [
      [
        {
          shape: 'circle',
          resolution: 32,
          size: 6,
          offset: 8
        }, {
          shape: 'circle',
          resolution: 32,
          size: 9,
          offset: 16
        }, {
          shape: 'circle',
          resolution: 8,
          size: 19,
          offset: 0
        }, {
          shape: 'circle',
          resolution: 4,
          size: 2,
          offset: 0
        }
      ], [
        {
          resolution: 24
        }
      ], [
        {
          shape: 'square',
          resolution: 32
        }, {
          shape: 'circle',
          resolution: 22,
          offset: 12
        }, {
          shape: 'circle',
          resolution: 22,
          offset: 0,
          alpha: 0.5
        }, {
          shape: 'circle',
          resolution: 16,
          size: 9,
          offset: 0,
          alpha: 0.5
        }
      ], [
        {
          shape: 'circle',
          resolution: 24
        }, {
          shape: 'circle',
          resolution: 24,
          size: 9,
          offset: 12
        }
      ], [
        {
          shape: 'circle',
          resolution: 12,
          size: 29,
          offset: 0
        }
      ], [
        {
          shape: 'circle',
          resolution: 8,
          size: 50,
          offset: 0,
          alpha: 0.741
        }, {
          shape: 'diamond',
          resolution: 10,
          size: 13,
          offset: 13,
          alpha: 0.611
        }
      ], [
        {
          shape: 'diamond',
          resolution: 14,
          size: 27,
          offset: 15,
          alpha: 0.991
        }, {
          shape: 'circle',
          resolution: 50,
          size: 23,
          offset: 8,
          alpha: 0.501
        }, {
          shape: 'circle',
          resolution: 50,
          size: 11,
          offset: 8,
          alpha: 0.441
        }
      ], [
        {
          shape: 'circle',
          resolution: 12,
          size: 29,
          alpha: 0.3
        }
      ]
    ];

    one = function() {
      return $('img:not(#normal)').each(function(i, img) {
        if (flavors[i]) return $(img).closePixelate(flavors[i]);
      });
    };

    grayscale = function(ctxt) {
      var gray, i, imgd, pix, _i, _len, _step;
      imgd = ctxt.getImageData(0, 0, 300, 150);
      pix = imgd.data;
      for (_i = 0, _len = pix.length, _step = 4; _i < _len; _i += _step) {
        i = pix[_i];
        gray = pix[_i] * .3 + pix[_i + 1] * .59 + pix[_i + 2] * .11;
        pix[_i] = gray;
        pix[_i + 1] = gray;
        pix[_i + 2] = gray;
      }
      return ctxt.putImageData(imgd, 0, 0);
    };

    setupCanvas = function() {
      var canvas, ctxt, endOfRow, i, img, x, y, _results;
      x = 0;
      y = 0;
      img = document.getElementById('normal');
      _results = [];
      for (i = 1; i <= 9; i++) {
        endOfRow = i > 0 && i % 3 === 0;
        canvas = "canvas-" + i;
        canvas = document.getElementById(canvas);
        ctxt = canvas.getContext('2d');
        ctxt.scale(3, 3);
        ctxt.drawImage(img, x, y, 300, 150);
        grayscale(ctxt);
        x -= 100;
        if (endOfRow) {
          y -= 50;
          _results.push(x = 0);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    replaceImage = function() {
      var canvas, ctxt, h, img, w;
      img = document.getElementById('dwight');
      w = img.width;
      h = img.height;
      canvas = document.createElement('canvas');
      ctxt = canvas.getContext('2d');
      canvas.width = w;
      canvas.height = h;
      canvas.id = img.id;
      ctxt.drawImage(img, 0, 0);
      img.parentNode.replaceChild(canvas, img);
      return ctxt;
    };

    meme = function() {
      var ctxt;
      ctxt = replaceImage();
      ctxt.shadowOffsetX = 2;
      ctxt.shadowOffsetY = 2;
      ctxt.shadowBlur = 12;
      ctxt.shadowColor = 'hsl(0, 0%, 0%)';
      ctxt.font = '40pt Impact';
      ctxt.fillStyle = 'white';
      return ctxt.fillText("The Office", 10, 50);
    };

    return Demo;

  })();

  window.onload = function() {
    return new Demo();
  };

}).call(this);
