const sendMensageUrl = `https://portifolio-backend-6u5u.onrender.com/mensages/create-mensage/`

document.getElementById('mensageForm').addEventListener('submit', async function() {    

    const formData = new FormData(this)
    
    const formularioMensagem = {
        costumer_name: formData.get('nome'),
        costumer_email: formData.get('email'),
        costumer_contact: formData.get('contacto'),
        description: formData.get('mensagem')
    }

    
    await fetch(sendMensageUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formularioMensagem)
    })
    .then(response => response.json())
    .then(dados => console.log(dados))
    .catch(err => console.log(err))

})