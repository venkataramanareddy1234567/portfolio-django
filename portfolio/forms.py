from django import forms
from django.core.validators import RegexValidator
from .models import ClientRequest


class ClientRequestForm(forms.ModelForm):

    class Meta:
        model = ClientRequest

        fields = [
            'name',
            'email',
            'phone',
            'work_required',
            'message',
            'budget'
        ]

        widgets = {
            'name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Enter your full name'
            }),

            'email': forms.EmailInput(attrs={
                'class': 'form-control',
                'placeholder': 'Enter your email address'
            }),

            'phone': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Enter 10-digit phone number',
                'inputmode': 'numeric',
                'maxlength': '10'
            }),

            'work_required': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Example: Website, Python Project, Dashboard'
            }),

            'message': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 5,
                'placeholder': 'Tell me about your project requirements'
            }),

            'budget': forms.NumberInput(attrs={
                'class': 'form-control',
                'placeholder': 'Enter your budget amount',
                'min': '1',
                'step': '1'
            }),
        }

    def clean_name(self):
        name = self.cleaned_data['name']

        if not all(char.isalpha() or char.isspace() for char in name):
            raise forms.ValidationError(
                'Name should contain letters and spaces only.'
            )

        return name

    def clean_phone(self):
        phone = self.cleaned_data['phone']

        if not phone.isdigit():
            raise forms.ValidationError(
                'Phone number should contain numbers only.'
            )

        if len(phone) != 10:
            raise forms.ValidationError(
                'Please enter a valid 10-digit phone number.'
            )

        return phone

    def clean_budget(self):
        budget = self.cleaned_data['budget']

        if not budget:
            return budget

        if not budget.isdigit():
            raise forms.ValidationError(
                'Budget should contain numbers only.'
            )

        if int(budget) <= 0:
            raise forms.ValidationError(
                'Budget must be greater than 0.'
            )

        return budget