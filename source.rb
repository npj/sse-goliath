class Source < Goliath::API
  def response(env)
    
    EventMachine.add_periodic_timer(1) do
      env.stream_send(message(Time.now.strftime("%A %B %d, %Y %H:%M:%S %p")))
    end
    
    streaming_response(200, { 'Content-Type' => "text/event-stream" })
  end
  
  private
    def message(msg)
      "id:#{Time.now.to_i}\r\n" +
      "data:#{MultiJson.encode(:message => msg)}\r\n\n"
    end
end