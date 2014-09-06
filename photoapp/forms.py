from django import forms
from django.contrib.auth.models import User
from photoapp.models import  UserProfile, Picture

class UserForm(forms.ModelForm):
	password = forms.CharField(widget=forms.PasswordInput())

	class Meta:
		model = User
		fields = ('username', 'email', 'password')

class UserProfileForm(forms.ModelForm):
	class Meta:
		model = UserProfile
		fields = ('image',)

class PictureForm(forms.ModelForm):
	picture = forms.ImageField(label="Upload a Picture")
	class Meta:
		model = Picture
		fields = ('picture', )