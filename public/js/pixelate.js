/* Close Pixelate
 * http://desandro.com/resources/close-pixelate/
 * 
 * Developed by
 * - David DeSandro  http://desandro.com
 * - John Schulz  http://twitter.com/jfsiii
 * 
 * Thanks to Max Novakovic for getImageData API http://www.maxnov.com/getimagedata
 * 
 * Copyright (c) 2010
 * Licensed under MIT license
 * 
 */
(function($){

    var supportsCanvas = function() {
        var elem = document.createElement('canvas');
              return !!(elem.getContext && elem.getContext('2d'));
            },
        renderOptions;

    var methods = {
      init : function(options) {
        return this.each(function(){
          if (!supportsCanvas()) {
            return false;
          }
          renderOptions = options;
          methods.replaceImageNode(this);
        });
      },
      replaceImageNode : function(img) { 
        var w = img.width,
            h = img.height,
            canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d');

        // render image in canvas
        canvas.width = w;
        canvas.height = h;
        canvas.className = img.className;
        canvas.id = img.id;
        ctx.drawImage( img, 0, 0 );

        // perform the Close pixelations
        methods.renderClosePixels(ctx, w, h );

        // add canvas and remove image
        img.parentNode.replaceChild(canvas, img);
      },
      renderClosePixels : function(ctx, w, h) {
        var PI2 = Math.PI*2, 
            PI1_4 = Math.PI/4,
            imgData = ctx.getImageData(0, 0, w, h).data, 
            isArray = function ( o ){ return Object.prototype.toString.call( o ) === "[object Array]"; },
            isObject = function ( o ){ return Object.prototype.toString.call( o ) === "[object Object]"; };

            ctx.clearRect( 0, 0, w, h);

            for (var i=0, len = renderOptions.length; i < len; i++) {
              var opts = renderOptions[i],
                res = opts.resolution,
                // option defaults
                size = opts.size || res,
                alpha = opts.alpha || 1,
                offset = opts.offset || 0,
                offsetX = 0, 
                offsetY = 0,
                cols = w / res + 1,
                rows = h / res + 1,
                halfSize = size / 2,
                diamondSize = size / Math.SQRT2,
                halfDiamondSize = diamondSize / 2;

              if ( isObject( offset ) ){ 
                offsetX = offset.x || 0;
                offsetY = offset.y || 0;
              } else if ( isArray( offset) ){
                offsetX = offset[0] || 0;
                offsetY = offset[1] || 0;
              } else {
                offsetX = offsetY = offset;
              }

            for ( var row = 0; row < rows; row++ ) {
              var y = ( row - 0.5 ) * res + offsetY,
                  // normalize y so shapes around edges get color
                  pixelY = Math.max( Math.min( y, h-1), 0);

              for ( var col = 0; col < cols; col++ ) {
                var x = ( col - 0.5 ) * res + offsetX,
                    // normalize y so shapes around edges get color
                    pixelX = Math.max( Math.min( x, w-1), 0),
                    pixelIndex = ( pixelX + pixelY * w ) * 4,
                    red = imgData[ pixelIndex + 0 ],
                    green = imgData[ pixelIndex + 1 ],
                    blue = imgData[ pixelIndex + 2 ],
                    pixelAlpha = alpha * (imgData[ pixelIndex + 3 ] / 255);

                ctx.fillStyle = 'rgba(' + red +','+ green +','+ blue +','+ pixelAlpha + ')';

                switch ( opts.shape ) {
                  case 'circle' :
                    ctx.beginPath();
                      ctx.arc ( x, y, halfSize, 0, PI2, true );
                      ctx.fill();
                    ctx.closePath();
                    break;
                  case 'diamond' :
                    ctx.save();
                      ctx.translate( x, y );
                      ctx.rotate( PI1_4 );
                      ctx.fillRect( -halfDiamondSize, -halfDiamondSize, diamondSize, diamondSize );
                    ctx.restore();
                    break;
                  default :  
                    // square
                    ctx.fillRect( x - halfSize, y - halfSize, size, size );
                }
              }
            }
          } // options
      }
    };

  $.fn.closePixelate = function(method) {

    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
    } 

  };
})(jQuery);
