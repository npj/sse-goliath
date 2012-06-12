$: << File.dirname(__FILE__)

require 'goliath'
require 'source'
require 'message'

class Server < Goliath::API

  use Rack::Static, :urls => [ "/js", "/css" ], :root => Goliath::Application.app_path("public")
  
  # handles all connection close events
  def on_close(env)
    Pubsub.callbacks(:on_close) { |callback| callback.call(env) }
  end
  
  map "/" do
    run Rack::File.new(File.join(File.dirname(__FILE__), 'public', 'index.html'))
  end
  
  map "/message" do
    run Message.new
  end
  
  map "/source" do
    run Source.new
  end
end
  