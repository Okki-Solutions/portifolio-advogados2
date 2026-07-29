/* ============================================
   FORMULÁRIO COM VALIDAÇÃO E MÁSCARA
   ============================================ */

function initForm() {
    const form = document.getElementById('contatoForm');
    if (!form) return;

    // Máscara de telefone
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 0) {
                value = value.replace(/^(\d{2})(\d)/, '($1) $2');
                if (value.length > 10) {
                    value = value.replace(/(\d{5})(\d{4})$/, '$1-$2');
                } else if (value.length > 6) {
                    value = value.replace(/(\d{4})(\d{4})$/, '$1-$2');
                }
            }
            this.value = value;
        });
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm(this)) {
            // Simula envio
            const btn = this.querySelector('.btn-submit');
            const originalText = btn.textContent;
            btn.textContent = 'Enviando...';
            btn.disabled = true;
            btn.style.opacity = '0.7';

            setTimeout(() => {
                alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
                this.reset();
                btn.textContent = originalText;
                btn.disabled = false;
                btn.style.opacity = '1';
                // Remove erros
                this.querySelectorAll('.form-group.error').forEach(g => g.classList.remove('error'));
            }, 1500);
        }
    });
}

function validateForm(form) {
    let valid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    inputs.forEach(input => {
        const group = input.closest('.form-group');
        const errorSpan = group?.querySelector('.form-error');
        let isValid = true;

        if (input.type === 'checkbox') {
            isValid = input.checked;
        } else if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = input.value.trim() !== '' && emailRegex.test(input.value.trim());
        } else if (input.id === 'telefone') {
            const phoneClean = input.value.replace(/\D/g, '');
            isValid = phoneClean.length >= 10;
        } else {
            isValid = input.value.trim() !== '';
        }

        if (!isValid) {
            valid = false;
            if (group) group.classList.add('error');
            if (errorSpan) errorSpan.style.display = 'block';
        } else {
            if (group) group.classList.remove('error');
            if (errorSpan) errorSpan.style.display = 'none';
        }
    });

    // Verifica checkbox LGPD
    const lgpd = document.getElementById('lgpd');
    if (lgpd && !lgpd.checked) {
        valid = false;
        const group = lgpd.closest('.form-group');
        if (group) group.classList.add('error');
        const error = group?.querySelector('.form-error');
        if (error) error.style.display = 'block';
    } else if (lgpd) {
        const group = lgpd.closest('.form-group');
        if (group) group.classList.remove('error');
        const error = group?.querySelector('.form-error');
        if (error) error.style.display = 'none';
    }

    return valid;
}

// Exporta
window.initForm = initForm;