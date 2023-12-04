function redirectTo(route) {
    window.location.href = route;
}

document.querySelectorAll('.desenvolvimento').forEach(function (element) {
    element.addEventListener('click', function () {
        alert('Ainda em fase de desenvolvimento')
    })
})

const usuarioNome = localStorage.getItem('usuarioNome');

// if (!usuarioNome) {
//     // Se não houver, redirecionar para a página de login
//     window.location.href = '/sign-in';
// } else {
//     // Aqui você pode realizar ações adicionais se o usuário estiver autenticado
//     console.log('Usuário autenticado:', usuarioNome);
// }

const username = document.querySelector(".user-name")

username.innerHTML = usuarioNome;

function logout() {
    // Remover 'usuarioNome' do localStorage
    localStorage.removeItem('usuarioNome');

    // Redirecionar para a página de login
    window.location.href = '/sign-in';
}