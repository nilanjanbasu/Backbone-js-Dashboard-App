import webapp2
import os
from google.appengine.ext.webapp import template	
import simplejson

class MainPage(webapp2.RequestHandler):
	def get(self):
		#~ self.response.write('<h1>Hello</h1>')
		path = os.path.join(os.path.dirname(__file__), 'static/index.html')
		self.response.out.write(template.render(path, {}))
	
	def post(self):
		data = self.request.GET
		self.response.out.write(simplejson.dumps({'redirectUrl':'/fokla'}))
		

app = webapp2.WSGIApplication([
								('/',MainPage)
							   ], debug = True)
