from django import forms


class LoginForm(forms.Form):
    username = forms.EmailField(label='Email Address',
        widget=forms.EmailInput(
            attrs={
                'autofocus': True,
                'placeholder': 'Email Address',
                'required': 'required',
            }
        )
    )
    password = forms.CharField(widget=forms.PasswordInput)
