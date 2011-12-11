require 'sinatra/base'

class Application < Sinatra::Base
  set :haml, { :format       => :html5,
               :attr_wrapper => '"'     }

  get '/' do
    @images = []
    my_rand, ann_rand = Random.new(), Random.new()
    25.times do
      @image = {:height => my_rand.rand(100..500), :width => my_rand.rand(100..300),}

      if ann_rand.rand(1..5) == 2
        @image[:color] = ''
      else
        @image[:color] = 'g/'
      end

      @images << @image
    end

    haml :index
  end

end

