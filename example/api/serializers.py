from rest_framework import serializers

from .models import User, Entry


class UserSerializer(serializers.ModelSerializer):
    posts = serializers.HyperlinkedIdentityField(view_name='userpost-list', lookup_field='username')

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'posts', )

class EntrySerializer(serializers.ModelSerializer):
    created_time = serializers.DateTimeField(read_only=True)
    

    class Meta:
        model = Entry
        exclude = ('created_time',)
