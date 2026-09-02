from django.shortcuts import render, redirect
from .forms import ClientRequestForm


def home(request):
    if request.method == 'POST':
        form = ClientRequestForm(request.POST)

        if form.is_valid():
            form.save()
            return redirect('success')

    else:
        form = ClientRequestForm()

    return render(request, 'portfolio/index.html', {'form': form})


def success(request):
    return render(request, 'portfolio/success.html')
