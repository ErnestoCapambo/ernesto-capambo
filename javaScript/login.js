const loginUrl = `https://portifolio-backend-6u5u.onrender.com/auth/login`

document.getElementById('reserved-form').addEventListener('submit', async function() {
    event.preventDefault()

    const formData = new FormData(this)

    const user = {
        nome: formData.get('username'),
        email: formData.get('email'),
        secretkey: formData.get('secretKey')
    }

    await fetch(loginUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(dados => {
        localStorage.removeItem('token')
        localStorage.setItem('token', JSON.stringify(dados))
        console.log(dados)
    })
    .catch(err => console.log(err))
})
