Timestamp Microservice
		
  This microservice accepts a url and checks if it is in natural or unix date and returns the unix and natural date stamps in json format. The natural dates are not case sensitive and will be returned as "January 01, 2017".

Example request</h3>
		
<ul>
	<li>"https://timestamp-microsvc.glitch.me/January%2001,%202017"</li>
	<li>"https://timestamp-microsvc.glitch.me/Jan%2001,%202017"</li>
  <li>"https://timestamp-microsvc.glitch.me/1483228800"</li>
</ul>

Example Response

{ "unix": 1483228800, "natural", "January 01, 2017"}

GitHub Repository: <a target="_blank" href="https://github.com/whackdev/timestamp-microsvc">Click here</a> 
