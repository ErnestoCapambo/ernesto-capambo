const getEspecialityUrl = `https://portifolio-backend-6u5u.onrender.com/especiality/get-especiality/`;
const getUserUrl = `https://portifolio-backend-6u5u.onrender.com/users/get-user/b62def04-c569-43e0-a195-74c33ae62dee`;

const tokenString = localStorage.getItem('token');
const { token } = JSON.parse(tokenString || '{}');
const decodedToken = token ? jwt_decode(token) : null;

async function exibirEspecialidades() {
    const flexEspecialidadesBox = document.querySelector('#flexespecialidades-box');
    flexEspecialidadesBox.innerHTML = ''
    try {
        const especialidades = await (await fetch(getEspecialityUrl)).json();
        const dados = await (await fetch(getUserUrl)).json();
        
        let cont = 0;
        const { email, password, id } = dados;

        especialidades.forEach(especiality => {
            const img = new Image();
            img.src = `https://portifolio-backend-6u5u.onrender.com/especiality/get-especiality-img/${especiality.id}`;
            const divEspecialidadesBox = document.createElement('div');
            divEspecialidadesBox.className = 'especialidades-box';
            

            flexEspecialidadesBox.appendChild(divEspecialidadesBox);
            const especialidadeContainer = document.querySelectorAll('.especialidades-box')[cont];

            especialidadeContainer.appendChild(img);

            const isAuthorized = decodedToken && decodedToken.id == id && decodedToken.email == email && decodedToken.password == password;
            
            especialidadeContainer.innerHTML += `
                <h3>${especiality.name}</h3>
                <p>${especiality.description}</p>
                ${isAuthorized ? `
                    <div class="btn-especiality">
                        <input type="button" class="btn-del" value="Eliminar" data-user_id="${especiality.User_id}" data-id="${especiality.id}" onclick="eliminarEspecialidade(event)" />
                        <input type="button" class="btn-edit" value="Editar" data-user_id="${especiality.User_id}" data-id="${especiality.id}" onclick="editarEspecialidadeForm(event)" />
                    </div>
                ` : ''}
            `;

            cont += 1;
        });
    } catch (error) {
        console.log(error);
    }
}

function ocultarBoxForm() {
    document.getElementById('box-form').style.display = "none";
}

async function editarEspecialidadeForm(event) {
    document.getElementById('box-form').style.display = "block";
    const especialityId = event.target.dataset.id;

    try {
        const especiality = await (await fetch(`https://portifolio-backend-6u5u.onrender.com/especiality/get-especiality/${especialityId}`)).json();
        document.getElementById('box-form').innerHTML += `
            <section class="formulario" id="formulario">
                <div class="interface">
                    <h2 class="titulo">EDITAR <span>ESPECIALIDADE</span></h2>
                    <form id="form" onsubmit="editarEspecialidade(event, ${especiality.id})">
                        <input type="text" name="nome" id="nome" placeholder="Nome:" value="${especiality.name}" required>
                        <input type="text" name="description" id="description" placeholder="Descrição:" value="${especiality.description}" required>
                        <label for="file">Selecionar:</label>
                        <input type="file" name="file" id="file">
                        <div class="btn-enviar"><input type="submit" id="send-msg" value="Editar"></div>
                    </form>
                </div>
            </section>
        `;
    } catch (error) {
        console.log(error);
    }
}

document.getElementById('add-especiality').addEventListener('click', async () => {
    try {
        const boxForm = document.getElementById('box-form');
        if (decodedToken) {
            boxForm.style.display = 'block'
        } else {
            boxForm.style.display = 'none'
        }
        boxForm.innerHTML += `
            <section class="formulario" id="formulario">
                <div class="interface">
                    <h2 class="titulo">ADD <span>ESPECIALIDADE</span></h2>
                    <form id="form" method="post" action="https://portifolio-backend-6u5u.onrender.com/especiality/create-especiality/b62def04-c569-43e0-a195-74c33ae62dee" enctype="multipart/form-data">
                        <input type="text" name="name" id="name" placeholder="Nome:" required>
                        <input type="text" name="description" id="description" placeholder="Descrição:" required>
                        <label for="file">Selecionar:</label>
                        <input type="file" name="file" id="file">
                        <div class="btn-enviar" id="add-especiality-btn"><input type="submit" id="send-msg" value="Adicionar"></div>
                    </form>
                </div>
            </section>
        `;
    } catch (error) {
        alert(error);
        console.log(error);
    }
});

async function eliminarEspecialidade(event) {
    const especialityId = event.target.dataset.id;
    const userId = event.target.dataset.user_id;

    try {
        const response = await fetch(`https://portifolio-backend-6u5u.onrender.com/especiality/delete-especiality/${userId}/${especialityId}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        if (response.ok) {
            console.log(data);
            await exibirEspecialidades()
        } else {
            alert('Falha ao eliminar especialidade.')
            console.log("Falha ao eliminar Especialidade.")
        }
    } catch (err) {
        console.log(err);
    }
}

async function editarEspecialidade(event, especialityId) {
    event.preventDefault(); // Prevenir o envio do formulário padrão

    const form = event.target;
    const formData = new FormData(form);

    try {
        const response = await fetch(`https://portifolio-backend-6u5u.onrender.com/especiality/update-especiality/b62def04-c569-43e0-a195-74c33ae62dee/${especialityId}`, {
            method: 'PUT',
            body: formData
        });
        const dados = await response.json();
        console.log(dados);
        await exibirEspecialidades()
    } catch (err) {
        console.log(err);
    }
}

exibirEspecialidades();
