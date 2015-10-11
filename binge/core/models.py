from django.db import models
from django.utils.text import slugify
from django.contrib.auth.models import User


# A Bucket might be (to_watch, watched, upcoming, subscribed)
class Bucket(models.Model):
    name = models.CharField(max_length=30)
    slug = models.SlugField(max_length=30)
    user = models.ForeignKey(User)

    def __unicode__(self):
        return "{} {}".format(self.user.username, self.name)

    def save(self, *args, **kwargs):
        if not self.id:
            self.slug = slugify("{} {}".format(self.user.username, self.name))

        super(Bucket, self).save(*args, **kwargs)


# An Element might be a movie, an episode, a series,..etc
class Element(models.Model):
    name = models.CharField(max_length=300)
    trakt_id = models.IntegerField()
    bucket = models.ForeignKey(Bucket)

    def __unicode__(self):
        return "{}".format(self.name)
