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

    // --- Validação visual das regras de senha ---
    function isCommonPassword(pw) {
        // Lista reduzida de senhas comuns para exemplo
        const common = ["123456", "password", "qwerty", "abc123", "senha", "111111"];
        return common.includes(pw.toLowerCase());
    }
    const ruleLength = document.getElementById('rule-length');
    const ruleNumeric = document.getElementById('rule-numeric');
    const ruleCommon = document.getElementById('rule-common');
    const ruleSimilar = document.getElementById('rule-similar');
    function validatePasswordRules() {
        if (!password1) return;
        const pw = password1.value;
        const email = emailInput ? emailInput.value : '';
        // Regra: mínimo de 8 caracteres
        if (ruleLength) {
            if (pw.length >= 8) {
                ruleLength.classList.remove('text-danger');
                ruleLength.classList.add('text-success');
            } else {
                ruleLength.classList.add('text-danger');
                ruleLength.classList.remove('text-success');
            }
        }
        // Regra: não pode ser totalmente numérica
        if (ruleNumeric) {
            if (!/^\d+$/.test(pw) || pw.length === 0) {
                ruleNumeric.classList.remove('text-danger');
                ruleNumeric.classList.add('text-success');
            } else {
                ruleNumeric.classList.add('text-danger');
                ruleNumeric.classList.remove('text-success');
            }
        }
        // Regra: não pode ser uma senha comum
        if (ruleCommon) {
            if (!isCommonPassword(pw) || pw.length === 0) {
                ruleCommon.classList.remove('text-danger');
                ruleCommon.classList.add('text-success');
            } else {
                ruleCommon.classList.add('text-danger');
                ruleCommon.classList.remove('text-success');
            }
        }
        // Regra: não pode ser similar ao email
        if (ruleSimilar) {
            if (email && pw && !pw.toLowerCase().includes(email.toLowerCase().split('@')[0])) {
                ruleSimilar.classList.remove('text-danger');
                ruleSimilar.classList.add('text-success');
            } else if (!email || !pw) {
                ruleSimilar.classList.add('text-danger');
                ruleSimilar.classList.remove('text-success');
            } else {
                ruleSimilar.classList.add('text-danger');
                ruleSimilar.classList.remove('text-success');
            }
        }
    }
    if (password1) {
        password1.addEventListener('input', validatePasswordRules);
    }
    if (emailInput) {
        emailInput.addEventListener('input', validatePasswordRules);
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