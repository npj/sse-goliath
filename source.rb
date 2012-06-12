require 'pubsub'
require 'awesome_print'

class Source < Goliath::API
      
  def response(env)
    
    unless env['HTTP_ACCEPT'] == 'text/event-stream'
      return [ 406, { }, [ ] ]
    end
        
    sub_id = Pubsub.channel.subscribe do |msg|
      env.stream_send(data(msg))
    end
    
    env['pubsub.subscriber.id'] = sub_id
    
    Pubsub.callback(:on_close, sub_id) do |e|
      if e['pubsub.subscriber.id'] == sub_id
        Pubsub.channel.unsubscribe(sub_id)
        Pubsub.remove(:on_close, sub_id)
      end
    end
    
    streaming_response(200, { 'Content-Type' => "text/event-stream" })
  end
  
  private
  
    def data(msg)
      "id:#{Time.now.to_i}\r\n" +
      "data:#{msg}\r\n\n"
    end
end