document.addEventListener('DOMContentLoaded', function () {
    const senhaInput = document.querySelector('.senha');
    const confirmaSenhaInput = document.querySelector('.confirma_senha');
    const verSenhaButton = document.querySelector('.ver_senha');

    verSenhaButton.addEventListener('click', function () {
        togglePasswordVisibility(senhaInput);
        togglePasswordVisibility(confirmaSenhaInput);
    });

    // Função para alternar a visibilidade da senha
    function togglePasswordVisibility(input) {
        input.type = input.type === 'password' ? 'text' : 'password';
    }
    
});