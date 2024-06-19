import structlog
from django.contrib.auth import authenticate, login as auth_login
from django.http import HttpResponseRedirect
from django.shortcuts import redirect, render

from .forms import LoginForm

logger = structlog.get_logger(__name__)


def admin_login(request):
    form = LoginForm(request.POST or None)
    if request.method == 'POST':
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(request, username=username, password=password)
            if user is not None:
                auth_login(request, user)
                return HttpResponseRedirect('/admin/')
            else:
                logger.error('Login failed', username=username)

    return render(request, 'auth/login.html', {'form': form})
