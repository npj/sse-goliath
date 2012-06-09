$: << File.dirname(__FILE__)

require 'goliath'
require 'source'
require 'awesome_print'

class Server < Goliath::API

  use Rack::Static, :urls => [ "/js", "/css" ], :root => Goliath::Application.app_path("public")
  
  map "/" do
    run Rack::File.new(File.join(File.dirname(__FILE__), 'public', 'index.html'))
  end
  
  map "/source" do
    run Source.new
  end
end
  