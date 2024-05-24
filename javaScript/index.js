let btnMenu = document.getElementById('btn-menu')
let menu = document.getElementById('menu-mobile')
let overlay = document.getElementById('overlay-menu')
const urlMainTitle = `https://portifolio-backend-6u5u.onrender.com/title/get-title/`
const userUrl = `https://portifolio-backend-6u5u.onrender.com/users/get-user/`


btnMenu.addEventListener('click', ()=> {
    menu.classList.add('abrir-menu')
})

menu.addEventListener('click', ()=> {
    menu.classList.remove('abrir-menu')
})

overlay.addEventListener('click', ()=> {
    menu.classList.remove('abrir-menu')
})
function gerarAreaReservada() {
   
    const areaReservada = document.getElementById('area-reservada')
    areaReservada.style.display = 'block'

}


async function exibirTextoPrincipal() {
    const txtTopoDoSite = document.getElementById('topo-do-site')
    
    await fetch(urlMainTitle)
    .then(response => response.json())
    .then(title => {
        let text = title[0]

        txtTopoDoSite.innerHTML = `
        <div class="interface">
            <div class="flex">
                <div class="txt-topo-site">
                    <h1>${(text.title).toUpperCase()}<a href="#area-reservada"><span id="reserved-span"  onclick="gerarAreaReservada()">.</span></a></h1>
                    <p>${text.description}</p>
                    <div class="btn-contato">
                        <a href="#formulario"><button>Entrar em contato</button></a>
                        </div>
                        </div>
                        <div class="img-topo-site"">
                    <a href="#" id="user-img"></a>
                </div>
            </div>
        </div>
        `
    })

    const userImg = document.getElementById('user-img')
    const img = new Image()
    let imagePath = `https://portifolio-backend-6u5u.onrender.com/users/get-image/b62def04-c569-43e0-a195-74c33ae62dee`
    
    img.src = imagePath
    userImg.appendChild(img)
    
}
exibirTextoPrincipal()
