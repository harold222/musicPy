import json

from django.http import HttpResponse, Http404, JsonResponse
import pytube


def index(request):
    return HttpResponse("api para musica desde youtube")


def search_suggestion(request, term):
    result = pytube.Search(term)
    json_array = json.dumps({'suggestions': result.completion_suggestions })
    return HttpResponse(json_array, content_type="application/json")


def search_music(request, term):
    return HttpResponse("You're looking at question %s." % term)


def download_music(request, url):
    return HttpResponse("You're looking at question %s." % url)


def download_playlist(request, url):
    return HttpResponse("You're looking at question %s." % url)