class Source < Goliath::API
    
  def response(env)
        
    EM.synchrony do
      redis = Redis.new(:driver => :synchrony)
      redis.subscribe('messages') do |on|
        on.message do |channel, msg|
          env.stream_send(data(msg))
        end
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