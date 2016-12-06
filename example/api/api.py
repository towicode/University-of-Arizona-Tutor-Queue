from rest_framework import generics, permissions


from .serializers import UserSerializer, EntrySerializer
from .models import User, Entry
from .permissions import PostAuthorCanEditPermission


class EntryMixin(object):
    model = Entry
    queryset = Entry.objects.all()
    serializer_class = EntrySerializer
    
    def perform_create(self, serializer):
        """Force author to the current user on save"""
        serializer.save()
        
class EntryList(EntryMixin, generics.ListCreateAPIView):
    pass

class EntryDetail(EntryMixin, generics.RetrieveUpdateDestroyAPIView):
    pass
    
class UserMixin(object):
    model = User
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserList(UserMixin, generics.ListAPIView):
    permission_classes = [
        permissions.AllowAny
    ]


class UserDetail(UserMixin, generics.RetrieveAPIView):
    lookup_field = 'username'
