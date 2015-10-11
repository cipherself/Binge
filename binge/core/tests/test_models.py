from django.test import TestCase

from django.utils.text import slugify

from django.contrib.auth.models import User
from core.models import Element, Bucket


class BucketTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create(username="Tyson",
                                       password="GOA",
                                       email="goa@league.com")
        cls.watched = Bucket.objects.create(name="Watched", user=cls.user)
        cls.to_watch = Bucket.objects.create(name="To Watch", user=cls.user)
        
    def test_bucket_creation(self):
        watched = Bucket.objects.get(name="Watched")
        to_watch = Bucket.objects.get(name="To Watch")
        user = User.objects.get(username="Tyson")

        assert watched
        assert to_watch
        assert user

        assert watched.name == "Watched"
        assert watched.slug == slugify("{} {}".format(user.username, watched.name))
        assert watched.user.username == "Tyson"
        assert to_watch.name == "To Watch"
        assert to_watch.slug == slugify("{} {}".format(user.username, to_watch.name))
        assert to_watch.user.username == "Tyson"
        
        assert watched.name == self.watched.name
        assert watched.slug == self.watched.slug
        assert watched.user == self.user
        assert watched.user.username == self.user.username
        assert to_watch.name == self.to_watch.name
        assert to_watch.slug == self.to_watch.slug
        assert to_watch.user == self.user
        assert to_watch.user.username == self.user.username


class ElementTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create(username="Tyson",
                                       password="GOA",
                                       email="goa@league.com")
        cls.watched = Bucket.objects.create(name="Watched", user=cls.user)
        cls.mad_max = Element.objects.create(name="Mad Max",
                                             imdb_id="tt1234",
                                             bucket=cls.watched)
        cls.the_pink_panther = Element.objects.create(name="The Pink Panther",
                                                      imdb_id="tt5678",
                                                      bucket=cls.watched)

    def test_elements_creation(self):
        mad_max = Element.objects.get(name="Mad Max")
        the_pink_panther = Element.objects.get(imdb_id="tt5678")

        assert mad_max
        assert the_pink_panther

        assert mad_max.name == "Mad Max"
        assert mad_max.imdb_id == "tt1234"
        assert mad_max.slug == slugify(mad_max.imdb_id)
        assert mad_max.bucket.name == "Watched"

        assert the_pink_panther.name == "The Pink Panther"
        assert the_pink_panther.imdb_id == "tt5678"
        assert the_pink_panther.slug == slugify(the_pink_panther.imdb_id)
        assert the_pink_panther.bucket.name == "Watched"

        assert mad_max.name == self.mad_max.name
        assert mad_max.imdb_id == self.mad_max.imdb_id
        assert mad_max.slug == self.mad_max.slug
        assert mad_max.bucket == self.watched

        assert the_pink_panther.name == self.the_pink_panther.name
        assert the_pink_panther.imdb_id == self.the_pink_panther.imdb_id
        assert the_pink_panther.slug == self.the_pink_panther.slug
        assert the_pink_panther.bucket == self.watched
