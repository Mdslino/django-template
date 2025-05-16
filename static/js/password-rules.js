document.addEventListener('DOMContentLoaded', function() {
    // Função para verificar se a senha é comum
    function isCommonPassword(pw) {
        const common = ["123456", "password", "qwerty", "abc123", "senha", "111111"];
        return common.includes(pw.toLowerCase());
    }

    // Seletores dos campos
    const passwordInput = document.getElementById('id_password1') || document.getElementById('id_password');
    const emailInput = document.getElementById('id_email') || document.getElementById('id_login');
    const ruleLength = document.getElementById('rule-length');
    const ruleNumeric = document.getElementById('rule-numeric');
    const ruleCommon = document.getElementById('rule-common');
    const ruleSimilar = document.getElementById('rule-similar');

    function validatePasswordRules() {
        if (!passwordInput) return;
        const pw = passwordInput.value;
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

    if (passwordInput) {
        passwordInput.addEventListener('input', validatePasswordRules);
    }
    if (emailInput) {
        emailInput.addEventListener('input', validatePasswordRules);
    }
}); 