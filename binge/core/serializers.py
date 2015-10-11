from __future__ import absolute_import

from rest_framework import serializers
from .models import Element


class ElementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Element
        fields = ('name', 'trakt_id', 'bucket')
