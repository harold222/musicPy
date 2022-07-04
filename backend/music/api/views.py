import json

from django.http import HttpResponse, Http404, JsonResponse
from pytube import YouTube, Search


def index(request):
    return HttpResponse("api para musica desde youtube")


def search_suggestion(request, term):
    result = Search(term)
    json_array = json.dumps({'suggestions': result.completion_suggestions})
    return HttpResponse(json_array, content_type="application/json")


def search_music(request, term):
    result = Search(term)
    object_results = {'results': [], 'total': len(result.results)}

    init = request.GET.get('init', 0)
    limit = request.GET.get('limit', 10)

    for idx, v in enumerate(result.results, start=init):
        if idx < limit:
            object_results['results'].append({
                'title': v.title,
                'url': v.watch_url,
                'thumbnail': v.thumbnail_url,
                'author': v.author,
                'channel': v.channel_url,
                'views': v.views
            })
        else:
            break

    return HttpResponse(json.dumps(object_results), content_type="application/json")


def download_music(request, url):
    return HttpResponse("You're looking at question %s." % url)


def download_playlist(request, url):
    return HttpResponse("You're looking at question %s." % url)