from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import ugettext_lazy as _
# Create your models here.


class UserProfile(models.Model):
	"""Adds a website and profile picture field in addition to the
	 User model which provides basic fields such as Username and password.
	  User built and provided by django"""

	#linking UserProfile to 1 and only "User" model instance
	user = models.OneToOneField(User)

	image = models.ImageField(upload_to='profile_images', blank=True)

	def __unicode__(self):
		return self.user.username

class Picture(models.Model):
	picture = models.ImageField(upload_to='pictures/%Y/%m/%d', blank=False)
	title = models.CharField(_('Picture Title'), max_length=128, blank=False)
	def __unicode__(self):
		return "picture"