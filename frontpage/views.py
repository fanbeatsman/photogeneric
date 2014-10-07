from django.shortcuts import render
from django.template import RequestContext
from django.shortcuts import render_to_response
# Create your views here.
def home(request):
	context = RequestContext(request)
	context_dict={}
	return render_to_response("frontpage/index.html",context_dict,context)
