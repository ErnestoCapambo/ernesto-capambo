const projectUrl = `https://portifolio-backend-6u5u.onrender.com/projects/get-project/`;

async function exibirProjecto() {
    const projectBoxes = document.querySelector('.project-boxes');
    
    const response = await fetch(projectUrl);
    const projetos = await response.json();
    let cont = 0;

    for (const projeto of projetos) {
        const fileUrl = `https://portifolio-backend-6u5u.onrender.com/projects/get-project-file/${projeto.id}`;

        const fileResponse = await fetch(fileUrl, { method: 'HEAD' });
        const contentType = fileResponse.headers.get('Content-Type');

        const imgPort = document.createElement('div');
        imgPort.className = 'img-port';

        if (contentType && contentType.startsWith('video/')) {
            // Se for um vídeo, crie um elemento de vídeo
            const videoElement = document.createElement('video');
            videoElement.src = fileUrl;
            videoElement.controls = true;
            videoElement.className = 'project-video';
            imgPort.appendChild(videoElement);
            
        } else {
            // Se não for um vídeo, assuma que é uma imagem
            imgPort.style.backgroundImage = `url(${fileUrl})`;
        }

        projectBoxes.appendChild(imgPort);

        const imgPortElement = document.querySelectorAll('.img-port');
        
        imgPortElement[cont].innerHTML += `
            <div class="overlay" onclick="playProject(event)" data-id=${projeto.id}>Projeto ${cont + 1}</div>
        `;
        cont += 1;
    }
}


document.getElementById('add-project').addEventListener('click', async () => {
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
                    <h2 class="titulo">ADD <span>PROJECT</span></h2>
                    <form id="project-form" enctype="multipart/form-data">
                        <input type="text" name="description" id="description" placeholder="Descrição:" required>
                        <label for="file">Selecionar:</label>
                        <input type="file" name="file" id="file">
                        <div class="btn-enviar" id="add-project-btn" onclick="createProject(event)"><input type="submit" id="send-msg" value="Adicionar"></div>
                    </form>
                </div>
            </section>
        `;
    } catch (error) {
        alert(error);
        console.log(error);
    }
});

async function createProject(event) {
    try {
        event.preventDefault()
        const myForm = document.getElementById('project-form')
        const formData = new FormData(myForm)
        
        const response = await fetch('https://portifolio-backend-6u5u.onrender.com/projects/create-project/b62def04-c569-43e0-a195-74c33ae62dee', {
            method: 'POST',
            body: formData
        })

        const dados = await response.json()
        console.log(dados)
        await exibirProjecto()
    } catch (error) {
        console.log(error)
    }
}

exibirProjecto()

async function playProject(event) {

    const visualisadorDeProjecto = document.getElementById('visualisador-de-projeto')
    const divDescricao = document.getElementById('descricao')
    const videoViewer = document.getElementById('video-viewer')
    
    const projectId = event.target.dataset.id

    const fileUrl = `https://portifolio-backend-6u5u.onrender.com/projects/get-project-file/${projectId}`
    const projectUrl = `https://portifolio-backend-6u5u.onrender.com/projects/get-project/${projectId}`

    const projectResponse = await fetch(projectUrl)
    const dadosDoProjecto = await projectResponse.json()

    const fileResponse = await fetch(fileUrl, { method: 'HEAD' })
    const contentType = fileResponse.headers.get('Content-Type')
    
    if (contentType && contentType.startsWith('image/')) {
        return
    }
    
    if (contentType && contentType.startsWith('video/')) {
        visualisadorDeProjecto.style.display = 'block'
        const { description } = dadosDoProjecto
        // Se for um vídeo, crie um elemento de vídeo
        const source = document.createElement('source')
        
        source.src = fileUrl;
        source.type = 'video/mp4'
        
        videoViewer.appendChild(source)
        divDescricao.innerHTML = `
        <strong>BREVE DESCRIÇÃO:</strong>
        <p>${description}</p>
        
        `
    }
}

// function eliminarProjeto(event) {
//     const projectId = event.target.dataset.id
//     alert(projectId)
// }

