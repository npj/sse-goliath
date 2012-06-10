module Utils
  def self.redis_connect(options)
    if ENV['REDIS_URI']
      uri = URI.parse()
      Redis.new(options.merge(:host => uri.host, :port => uri.port, :password => uri.password))
    else
      Redis.new(options)
    end
  end
end