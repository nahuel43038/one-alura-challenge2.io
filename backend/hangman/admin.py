from django.contrib import admin
from .models import Task, User, Words, Invitation, Room, Profile
from rest_framework_simplejwt import token_blacklist

admin.site.register(User)
admin.site.register(Task)
admin.site.register(Words)
admin.site.register(Invitation)
admin.site.register(Room)
admin.site.register(Profile)
