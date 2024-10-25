let starShipPageUrl = 'https://swapi.dev/api/starships/'

window.onload = async () => {
    try {
        await loadStarShips(starShipPageUrl);
    } catch (error) {
        console.log(error);
        alert('Erro ao carregar cards');
    }

    const nextButtonStarShip = document.getElementById('next-button-star-ship')
    const backButtonStarShip = document.getElementById('back-button-star-ship')

    nextButtonStarShip.addEventListener('click', loadNextPageStarShip)
    backButtonStarShip.addEventListener('click', loadPreviousPageStarShip)

    
};

async function loadStarShips(urlStarShips) {
    const mainContentStarShip = document.getElementById('main-content-starship')
    mainContentStarShip.innerHTML = ''; // Limpar os resultados interiores

    try {
        const responseStarShip = await fetch(urlStarShips);
        const responseJsonStarShip = await responseStarShip.json();

        responseJsonStarShip.results.forEach((starShip) => {
            const cardStarShip = document.createElement("div")
            cardStarShip.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/big-placeholder.jpg')`
            cardStarShip.className = "cardStarShip"

            const starShipNameSS = document.createElement("div")
            starShipNameSS.className = "star-ship-name-ss"

            const starName = document.createElement("span")
            starName.className = "star-name"
            starName.innerText = `${starShip.name}`

            starShipNameSS.appendChild(starName)
            cardStarShip.appendChild(starShipNameSS)


            cardStarShip.onclick = () => {
                const startal = document.getElementById("startal")
                startal.style.visibility = "visible"

                const startalContent = document.getElementById("startal-content")
                startalContent.innerHTML = ''

                const name = document.createElement("span")
                name.className = "star-details"
                name.innerText = `Nome: ${starShip.name}`

                const starModel = document.createElement("span")
                starModel.className = "star-details"
                starModel.innerText = `Modelo: ${starShip.model}`

                const length = document.createElement("span")
                length.className = "star-details"
                length.innerText = `Comprimento: ${starShip.length}`

                const passengers = document.createElement("span")
                passengers.className = "star-details"
                passengers.innerText = `Passageiros: ${starShip.passengers}`

                const cargoCapacity = document.createElement("span")
                cargoCapacity.className = "star-details"
                cargoCapacity.innerText = `Capacidade de Carga: ${starShip.cargo_capacity}`

                startalContent.appendChild(name)
                startalContent.appendChild(starModel)
                startalContent.appendChild(length)
                startalContent.appendChild(passengers)
                startalContent.appendChild(cargoCapacity)

            }

            mainContentStarShip.appendChild(cardStarShip)
            
        });

        const nextButtonStarShip = document.getElementById('next-button-star-ship')
        const backButtonStarShip = document.getElementById('back-button-star-ship')

        nextButtonStarShip.disabled = !responseJsonStarShip.next;
        backButtonStarShip.disabled = !responseJsonStarShip.previous;

        backButtonStarShip.style.visibility = responseJsonStarShip.previous? "visible" : "hidden"


        starShipPageUrl = urlStarShips

    }catch (error) {
        alert('Erro ao carregar as naves');
        console.log(error)
    }

}


async function loadNextPageStarShip() {
    if(!starShipPageUrl) return;

    try {
        const responseStarShip = await fetch(starShipPageUrl)
        const responseJsonStarShip = await responseStarShip.json()

        await loadStarShips(responseJsonStarShip.next)

    } catch (error) {
        console.log(error)
        alert('Erro ao carregar a próxima página')
    }
}

async function loadPreviousPageStarShip() {
    if(!starShipPageUrl) return;

    try {
        const responseStarShip = await fetch(starShipPageUrl)
        const responseJsonStarShip = await responseStarShip.json()

        await loadStarShips(responseJsonStarShip.previous)

    } catch (error) {
        console.log(error)
        alert('Erro ao carregar a próxima anterior')
    }
}

function hideStartal() {
    const startal = document.getElementById("startal")
    startal.style.visibility = "hidden"
}


