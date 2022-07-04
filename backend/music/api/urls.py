from django.urls import path

from . import views

urlpatterns = [
    # /music
    path('', views.index, name='index'),
    # /music/search_suggestion
    path('search_suggestion/<term>/', views.search_suggestion, name='search_suggestion'),
    # /music/search_music
    path('search_music/<term>/', views.search_music, name='search_music'),
    # /music/download_music
    path('download_music', views.download_music, name='download_music'),
    # /music/download_playlist
    path('download_playlist/<url>/', views.download_playlist, name='download_playlist'),
]
