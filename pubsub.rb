module Pubsub
  
  @@channel   = nil
  @@callbacks = { }
  
  def self.channel
    @@channel ||= EventMachine::Channel.new
  end
  
  def self.callback(event, id, &block) 
    @@callbacks[event]     ||= { }
    @@callbacks[event][id] ||= block
  end
  
  def self.remove(event, id)
    @@callbacks.fetch(event, { }).delete(id)
  end
  
  def self.callbacks(event)
    if @@callbacks[event]
      (@@callbacks[event] || { }).each { |id, block| yield(block) }
    end
  end
end