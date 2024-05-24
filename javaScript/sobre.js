const urlSobre = `https://portifolio-backend-6u5u.onrender.com/about/get-about/`

async function exibirSobre() {
    const sobre = document.getElementById('sobre')
    
    await fetch(urlSobre)
     .then(response => response.json())
     .then( async (dados) => {
        await fetch(userUrl)
        .then(user => user.json())
        .then(dadosUser => {

            let dadosSobre = dados[0]
            sobre.innerHTML = `
                <div class="interface">
                    <div class="flex">
                        <div class="img-sobre" id="img-sobre">
                           
                        </div>
                        <div class="txt-sobre">
                            <h2>MUITO PRAZER, <span>SOU ${(dadosUser[0].username).toUpperCase()}</span></h2>
                            <P>${dadosSobre.paragraph1}</P>
                            <P>${dadosSobre.paragraph2}</P>
                            <div class="btn-social">
                                <a href="https://github.com/ErnestoCapambo/ErnestoCapambo/"><button><i class="bi bi-github"></i></button></a>
                                <a href="https://www.linkedin.com/in/ernesto-capambo-1583b824a/"><button><i class="bi bi-linkedin"></i></button></a>
                                <a href="#"><button><i class="bi bi-facebook"></i></button></a>
                            </div>
                        </div>
                    </div>
                </div>
            `
            const img = new Image()
            img.src = `https://portifolio-backend-6u5u.onrender.com/users/get-image/b62def04-c569-43e0-a195-74c33ae62dee`
            document.getElementById('img-sobre').appendChild(img)
        })
     })


}

exibirSobre()