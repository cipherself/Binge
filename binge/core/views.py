from django.shortcuts import render
from django.contrib.auth.models import User
from django.utils.text import slugify
from django.core.exceptions import ObjectDoesNotExist

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import JSONParser

from .models import Element, Bucket
from .serializers import ElementSerializer


def homepage(request):
    if request.user.is_authenticated():
        to_watch_slug = slugify("{} {}".format(request.user.username, 'to_watch'))
        to_watch = Bucket.objects.get(slug=to_watch_slug)
        watched_slug = slugify("{} {}".format(request.user.username, 'watched'))
        watched = Bucket.objects.get(slug=watched_slug)

        to_watch_elements = to_watch.element_set.all()
        watched_elements = watched.element_set.all()
        context = {'to_watch': to_watch_elements, 'watched': watched_elements}

    else:
        context = {}

    return render(request, 'core/lists.html', context)


@api_view(['POST'])
def add_element(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        bucket_slug = slugify("{} {}".format(request.user.username, data['bucket']))
        bucket = Bucket.objects.get(slug=bucket_slug)
        data['bucket'] = bucket.id
        try:
            inst = Element.objects.get(name=data['name'], trakt_id=data['trakt_id'])
            serializer = ElementSerializer(inst, data=data)
        except ObjectDoesNotExist:
            serializer = ElementSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
