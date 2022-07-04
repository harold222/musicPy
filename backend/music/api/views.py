import json

from django.http import HttpResponse, Http404, JsonResponse, HttpResponseBadRequest, HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt
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


@csrf_exempt
def download_music(request):
    try:
        if request.method != "POST":
            return HttpResponseNotAllowed(['POST'])

        body = json.loads(request.body)
        url = body.get('url')

        if str(url).strip() != '':
            song = YouTube(str(url))
            a = song
        #     retornar cierta informacion de la cancion y intentar
        #     url.streams.filter(abr='160kbps', progressive=False).first().download(output_path='C:/Users/harold.pedraza/Music', filename="a.mp3")
        #     para subirla a un servicio de hosting con eso guardo las canciones ya buscadas y solo seria verificar que no
        #     exista en ese drive para descargarla
        else:
            return HttpResponseBadRequest("Send a url of song")
    except:
        return HttpResponseBadRequest(json.dumps(error), content_type="application/json")


def download_playlist(request, url):
    return HttpResponse("You're looking at question %s." % url)