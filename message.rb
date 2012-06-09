require 'utils'

class Message < Goliath::API  
  
  @@pub = Utils.redis_connect(:driver => :synchrony)
  
  def response(env)
    @@pub.publish("messages", MultiJson.encode({ 
      :message => env.params["message"], 
      :lat     => env.params["lat"],
      :lng     => env.params["lng"]
    }))
    
    [ 200, { }, [ ] ]
  end
end