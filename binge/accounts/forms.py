from django import forms
from django.contrib.auth.models import User
from django.utils.translation import ugettext, ugettext_lazy as _


class SignupForm(forms.ModelForm):
    password1 = forms.CharField(label=_("Password"), widget=forms.PasswordInput())
    password2 = forms.CharField(label=_("Password Confirmation"), widget=forms.PasswordInput())

    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")

        if password1 and password2 and password1 != password2:
            raise forms.ValidationError(
                _("The two password fields didn't match"),
                code='password_mismatch',
                )
        
        return password2

    class Meta:
        model = User
        fields = ("username", "email")

    def save(self, *args, **kwargs):
        user = super(SignupForm, self).save(commit=False, *args, **kwargs)
        user.set_password(self.cleaned_data.get("password1"))
        user.save(*args, **kwargs)
        return user
        
