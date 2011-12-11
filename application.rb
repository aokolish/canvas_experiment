require 'sinatra/base'

class Application < Sinatra::Base
  set :haml, { :format       => :html5,
               :attr_wrapper => '"'     }

  get '/' do
    haml :index
  end

end

