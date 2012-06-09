class Source < Goliath::API
  def response(env)
    
    fib = Fiber.new{|s|loop{Fiber.yield((s=(s[0]?[(s[1]||1),s[0]+(s[1]||1)]:[0]))[0])}}
    
    EventMachine.add_periodic_timer(0.01) do
      env.stream_send(message(fib.resume([ ])))
    end
    
    streaming_response(200, { 'Content-Type' => "text/event-stream" })
  end
  
  private
    def message(msg)
      "id:#{Time.now.to_i}\r\n" +
      "data:#{MultiJson.encode(:message => msg)}\r\n\n"
    end
end