import json
from io import BytesIO
from django.http import HttpResponse, Http404, JsonResponse, HttpResponseBadRequest, HttpResponseNotAllowed
from pytube import YouTube, Search

error = {
    'message': 'An error has occurred, please try again',
    'status': False
}


def index(request):
    return HttpResponse("api para musica desde youtube")


def search_suggestion(request, term):
    result = Search(term)
    json_array = json.dumps({'suggestions': result.completion_suggestions})
    return HttpResponse(json_array, content_type="application/json")


def search_music(request, term):
    try:
        if request.method != "GET":
            return HttpResponseNotAllowed(['GET'])

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
    except:
        return HttpResponseBadRequest(json.dumps(error), content_type="application/json")


def download_music(request):
    try:
        if request.method != "POST":
            return HttpResponseNotAllowed(['POST'])

        body = json.loads(request.body)
        url = body.get('url')

        if str(url).strip() != '':
            song = YouTube(str(url)).streams.filter(abr='160kbps', progressive=False, only_audio=True).first()

            buffer = BytesIO()
            song.stream_to_buffer(buffer)
            buffer.seek(0)

            response = HttpResponse(buffer)
            response['Content-Disposition'] = 'attachment; filename=song.mp3'
            response['Content-Type'] = 'audio/wav'

            return response
        else:
            return HttpResponseBadRequest("Send a url of song")
    except:
        return HttpResponseBadRequest(json.dumps(error), content_type="application/json")


def download_playlist(request, url):
    return HttpResponse("You're looking at question %s." % url)