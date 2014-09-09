from django.shortcuts import render
from django.template import RequestContext
from django.shortcuts import render_to_response
from django.http import HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout

from photoapp.forms import UserForm, UserProfileForm, PictureForm
from photoapp.models import UserProfile, Picture
# Create your views here.

def index(request):
	context = RequestContext(request)
	context_dict = {}
	return render_to_response('photoapp/index.html', context_dict, context)

def register(request):

	context = RequestContext(request)

	registered = False

	if request.method == 'POST':
		user_form = UserForm(data=request.POST)
		profile_form = UserProfileForm(data=request.POST)

		if user_form.is_valid() and profile_form.is_valid():
			user = user_form.save()
			user.set_password(user.password)
			user.save()

			profile = profile_form.save(commit=False)
			profile.user = user

			if 'image' in request.FILES:
				profile.image = request.FILES['image']

			profile.save()

			registered = True

		else:
			print user_form.errors, profile_form.errors

	else:
		user_form = UserForm()
		profile_form = UserProfileForm

	context_dict = {'user_form':user_form, 'profile_form':profile_form, 'registered': registered}

	return render_to_response(
		'photoapp/register.html', context_dict, context)

def user_login(request):
	context = RequestContext(request)
	if request.method == "POST":
		username = request.POST['username']
		password = request.POST['password']

		user = authenticate(username=username, password=password)

		if user:
			if user.is_active:
				login(request, user)
				return HttpResponseRedirect('/photoapp/')
			else:
				return HttpResponse("Your account is disabled")
		else:
			print "Invalid login details: {0}, {1}".format(username, password)
			return HttpResponse("Invalid username/password")

	else:
		return render_to_response('photoapp/login.html', {}, context)

def upload_picture(request):
	context = RequestContext(request)
	if request.method == 'POST':
		form = PictureForm(request.POST, request.FILES)
		if form.is_valid():
			newPicture = Picture(picture = request.FILES['picture'], title = request.FILES['title'])
			newPicture.save()

			return HttpResponseRedirect('/photoapp/upload_picture/')

	else:
		form = PictureForm()

	allPictures = Picture.objects.all()

	context_dict = {'allPictures': allPictures, 'form': form}
	return render_to_response('photoapp/upload_picture.html', context_dict, context)
	
	



@login_required

def user_logout(request):
	logout(request)
	return HttpResponseRedirect('/photoapp/')

