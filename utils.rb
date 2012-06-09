module Utils
  def self.redis_connect(options)
    uri = URI.parse(ENV['REDIS_URI'])
    Redis.new(options.merge(:host => uri.host, :port => uri.port, :password => uri.password))
  end
end