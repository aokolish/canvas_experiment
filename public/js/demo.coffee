class Demo
  constructor: () ->
    one()
    meme()
    setupCanvas()

    $('#nav a.up').click (e) ->
      navClick(e, 'up')

    $('#nav a.down').click (e) ->
      navClick(e, 'down')

  # position of each of the sections
  positions = ($(elem).offset().top - 10 for elem in $('body > div:not("#nav")'))
  position = 0 # starting position

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
  ]

  navClick = (e, direction) ->
    e.preventDefault()
    #scrollTo = $($(this).attr('href')).offset().top - 10

    if direction == 'down'
      if position >= 2
        return false
      else
        scrollTo = positions[position+1]
        $('html, body').animate({scrollTop: scrollTo}, 1000, 'easeInOutExpo')
        position++
    else if direction == 'up'
      if position <= 0
        return false
      else
        scrollTo = positions[position-1]
        $('html, body').animate({scrollTop: scrollTo}, 1000, 'easeInOutExpo')
        position--

  one = ->
    $('img:not(#normal)').each (i, img) -> 
      if (flavors[i])
        $(img).closePixelate(flavors[i])

  # changes pixels in a canvas context to grayscale
  #
  # ctxt - canvas context
  grayscale = (ctxt) ->
    imgd = ctxt.getImageData(0, 0, 300, 150)
    pix = imgd.data

    for i in pix by 4
      gray = pix[_i] * .3 + pix[_i+1] * .59 + pix[_i+2] * .11
      pix[_i  ] = gray; # red
      pix[_i+1] = gray; # green
      pix[_i+2] = gray; # blue

    ctxt.putImageData(imgd, 0, 0)

  # sets up the canvas for the second demo
  setupCanvas = ->
    x = 0
    y = 0
    img = document.getElementById('normal')

    for i in [1..9]
      endOfRow = i > 0 && i % 3 == 0

      canvas = "canvas-" + i
      canvas = document.getElementById(canvas)


      ctxt = canvas.getContext('2d')
      ctxt.scale(3,3)
      ctxt.drawImage(img,x,y,300,150)

      grayscale(ctxt)

      x -= 100

      if (endOfRow)
        y -= 50
        x = 0


  #
  replaceImage = ->
    img = document.getElementById('dwight')
    w = img.width
    h = img.height
    canvas = document.createElement('canvas')
    ctxt = canvas.getContext('2d')

    # render image in canvas
    canvas.width = w
    canvas.height = h
    canvas.id = img.id

    ctxt.drawImage(img, 0, 0 )

    # add canvas and remove image
    img.parentNode.replaceChild(canvas, img)
    ctxt

  meme = ->
    ctxt = replaceImage()

    ctxt.shadowOffsetX = 2
    ctxt.shadowOffsetY = 2
    ctxt.shadowBlur    = 12
    ctxt.shadowColor   = 'hsl(0, 0%, 0%)'

    ctxt.font = '40pt Impact'
    ctxt.fillStyle = 'white'
    ctxt.fillText("I am faster ...", 10, 50)
    ctxt.fillText("than 80% of all snakes.", 65, 360)

window.onload = ->
  new Demo()
