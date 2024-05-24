const getMensagesUrl = `https://portifolio-backend-6u5u.onrender.com/mensages/get-mensage/`;

async function exibirMensagens() {
    const msgContainer = document.getElementById('msg-container');
    const totalMsg = document.getElementById('total-msg');

    try {
        const response = await fetch(getMensagesUrl);
        const mensagens = await response.json();

        totalMsg.innerHTML = `(${mensagens.length})`;
        msgContainer.innerHTML = ''; // Limpar o contêiner antes de adicionar novas mensagens
        
        mensagens.forEach(msg => {
            msgContainer.innerHTML += `
                <ul>
                    <li class="style">Username: <p class="style">${msg.costumer_name}</p></li>
                    <li class="style">Email: <p class="style">${msg.costumer_email}</p></li>
                    <li class="style">Contacto: <p class="style">${msg.costumer_contact}</p></li>
                    <li class="style">Data de envio: <p class="style">${msg.created_at}</p></li>
                    <div class="msg-box flex">
                        <h3 class="style">Mensagem</h3>
                        <p>${msg.description}</p>
                        <button class="btn-del-msg" 
                            data-id="${msg.id}"
                            onclick="eliminarMensagem(event)"
                            >Eliminar</button>
                    </div>
                </ul>
            `;
        });

    } catch (error) {
        console.log('Erro ao exibir mensagens:', error);
    }
}

async function eliminarMensagem(event) {
    const msgId = event.target.dataset.id;
    const deleteUrl = `https://portifolio-backend-6u5u.onrender.com/mensages/delete-mensage/b62def04-c569-43e0-a195-74c33ae62dee/${msgId}`;

    try {
        const response = await fetch(deleteUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            console.log('Mensagem eliminada com sucesso');
            await exibirMensagens(); // Atualizar a lista de mensagens após a eliminação
        } else {
            console.log('Falha ao eliminar mensagem');
        }
    } catch (error) {
        console.log('Erro ao eliminar mensagem:', error);
    }
}

exibirMensagens();
