document.addEventListener('DOMContentLoaded', function() {
    // Função para validar email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Função para mostrar mensagem de erro
    function showError(input, message) {
        const formControl = input.parentElement;
        const errorDiv = formControl.querySelector('.invalid-feedback') || document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        errorDiv.textContent = message;
        if (!formControl.querySelector('.invalid-feedback')) {
            formControl.appendChild(errorDiv);
        }
        input.classList.add('is-invalid');
    }

    // Função para remover mensagem de erro
    function removeError(input) {
        const formControl = input.parentElement;
        const errorDiv = formControl.querySelector('.invalid-feedback');
        if (errorDiv) {
            errorDiv.remove();
        }
        input.classList.remove('is-invalid');
    }

    // Validação de email
    const emailInput = document.getElementById('id_email') || document.getElementById('id_login');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (!validateEmail(this.value)) {
                showError(this, 'Por favor, insira um email válido');
            } else {
                removeError(this);
            }
        });
    }

    // Validação de senhas (apenas na página de cadastro)
    const password1 = document.getElementById('id_password1');
    const password2 = document.getElementById('id_password2');
    
    if (password1 && password2) {
        // Validação de força da senha
        password1.addEventListener('input', function() {
            if (this.value.length < 8) {
                showError(this, 'A senha deve ter pelo menos 8 caracteres');
            } else {
                removeError(this);
            }
        });

        // Validação de confirmação de senha
        password2.addEventListener('input', function() {
            if (this.value !== password1.value) {
                showError(this, 'As senhas não coincidem');
            } else {
                removeError(this);
            }
        });
    }

    // Validação do formulário antes do envio
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            let isValid = true;

            // Validar email
            if (emailInput && !validateEmail(emailInput.value)) {
                showError(emailInput, 'Por favor, insira um email válido');
                isValid = false;
            }

            // Validar senhas na página de cadastro
            if (password1 && password2) {
                if (password1.value.length < 8) {
                    showError(password1, 'A senha deve ter pelo menos 8 caracteres');
                    isValid = false;
                }
                if (password1.value !== password2.value) {
                    showError(password2, 'As senhas não coincidem');
                    isValid = false;
                }
            }

            if (!isValid) {
                e.preventDefault();
            }
        });
    }
}); 