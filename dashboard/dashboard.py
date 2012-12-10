import webapp2
import os
from google.appengine.ext.webapp import template
from google.appengine.ext import db
import simplejson

class JSONData(db.Model):
	json_data = db.StringProperty()


class MainPage(webapp2.RequestHandler):
	def get(self):
		#~ self.response.write('<h1>Hello</h1>')
		path = os.path.join(os.path.dirname(__file__), 'static/index.html')
		self.response.out.write(template.render(path, {}))
	
	def post(self):
		data = self.request.body
		e = JSONData(json_data = data)
		key = e.put()
		url = '/saved/'+str(key.id())
		self.response.out.write(simplejson.dumps({'redirectUrl': url}))
		
class SavePage(webapp2.RequestHandler):
	def get(self,saved_id):
		el = JSONData.get_by_id(int(saved_id))
		self.response.out.write(el.json_data)

app = webapp2.WSGIApplication([	(r'/saved/(\d+)',SavePage),
								('/',MainPage)
							   ], debug = True)
