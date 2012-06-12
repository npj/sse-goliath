require 'pubsub'
require 'awesome_print'

class Message < Goliath::API  
  
  def response(env)
    Pubsub.channel.push(MultiJson.encode({
      :message => env.params["message"], 
      :lat     => env.params["lat"],
      :lng     => env.params["lng"]
    }))
    
    [ 200, { }, [ ] ]
  end
end