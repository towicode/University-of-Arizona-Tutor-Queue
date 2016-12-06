from django.conf.urls import url, include

from .api import UserList, UserDetail
from .api import EntryList, EntryDetail

user_urls = [
    url(r'^/(?P<username>[0-9a-zA-Z_-]+)$', UserDetail.as_view(), name='user-detail'),
    url(r'^$', UserList.as_view(), name='user-list')
]

entry_urls =[
    url(r'^$', EntryList.as_view(), name='entry-list'),
    url(r'^/(?P<pk>\d+)$', EntryDetail.as_view(), name='entry-detail'),
]



urlpatterns = [
    url(r'^users', include(user_urls)),
    url(r'^entries', include(entry_urls)),
]
