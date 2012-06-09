# Real-Time, Geolocated Chat with Server-Sent Events, Redis Pub-Sub, and Goliath

This is more of a proof-of-concept, or experiment than anything. Chats are pushed to the server along with latitude and longitude obtained using HTML5 Geolocation. The chats are then pushed out to all connected clients via Redis Pub-Sub. The client listens for new chats, which arrive as server-sent events, and displays an info window on the map at the specified coordinates, along with the chat message.

To run it locally, just <code>cd</code> to the app directory and type the following:
<code>ruby server.rb -sv</code>

To see it in action, head to [sse-goliath.herokuapp.com](http://sse-goliath.herokuapp.com)

Then, point your browser to <code>0.0.0.0:9000</code>. You'll probably want to use two computers to experiment, or your mobile device.

Copyright &copy; 2012 Peter Brindisi