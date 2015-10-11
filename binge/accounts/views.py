from __future__ import absolute_import

from django.shortcuts import render, redirect
from .forms import SignupForm
from core.models import Bucket


def profile(request):
    return render(request, 'profile/base.html')


def signup(request):
    if request.POST:
        signup_form = SignupForm(request.POST)

        if signup_form.is_valid():
            user = signup_form.save()
            Bucket.objects.create(name="to_watch", user=user)
            Bucket.objects.create(name="watched", user=user)
            return redirect('homepage')

    else:
        signup_form = SignupForm()

    return render(request, 'registration/signup.html', {'form': signup_form})
