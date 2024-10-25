
let planetPageUrl = 'https://swapi.dev/api/planets/'

window.onload = async () => {
    try{
        await loadPlanets(planetPageUrl);
    } catch (error) {
        console.log(error);
        alert('Erro ao carregar cards');
    }

    const nextButtonPlanet = document.getElementById('next-button-planet')
    const backButtonPlanet = document.getElementById('back-button-planet')

    nextButtonPlanet.addEventListener('click', loadNextPagePlanet)
    backButtonPlanet.addEventListener('click', loadPreviousPagePlanet)
};

async function loadPlanets(urlPlanet) {
    const mainContentPlanet = document.getElementById('main-content-planet')
    mainContentPlanet.innerHTML = ''; // Limpar os resultados interiores

    try {

        const responsePlanet = await fetch(urlPlanet);
        const responseJsonPlanet = await responsePlanet.json();

        responseJsonPlanet.results.forEach((planet) => {
            const cardPlanet = document.createElement("div")
            cardPlanet.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/big-placeholder.jpg')`
            cardPlanet.className = "cardPlanets"

            const planetNamePT = document.createElement("div")
            planetNamePT.className = "planet-name-pt"

            const planetName = document.createElement("span")
            planetName.className = "planet-name"
            planetName.innerText = `${planet.name}`

            planetNamePT.appendChild(planetName)
            cardPlanet.appendChild(planetNamePT)


            cardPlanet.onclick = ()=> {
                const planetal = document.getElementById("planetal")
                planetal.style.visibility = "visible"

                const planetalContent = document.getElementById("planetal-content")
                planetalContent.innerHTML = ''

                const name = document.createElement("span")
                name.className = "planet-details"
                name.innerText = `Nome: ${planet.name}`

                const planetClimate = document.createElement("span")
                planetClimate.className = "planet-details"
                planetClimate.innerText = `Clima: ${convertClima(planet.climate)}`

                const gravity = document.createElement("span")
                gravity.className = "planet-details"
                gravity.innerText = `Gravidade: ${convertGravidade(planet.gravity)}`

                const terrain = document.createElement("span")
                terrain.className = "planet-details"
                terrain.innerText = `Terreno: ${convertTerreno(planet.terrain)}`

                const population = document.createElement("span")
                population.className = "planet-details"
                population.innerText = `Populacao: ${planet.population}`

                planetalContent.appendChild(name)
                planetalContent.appendChild(planetClimate)
                planetalContent.appendChild(gravity)
                planetalContent.appendChild(terrain)
                planetalContent.appendChild(population)

            }

            mainContentPlanet.appendChild(cardPlanet)

        });

        
        const nextButtonPlanet = document.getElementById('next-button-planet')
        const backButtonPlanet = document.getElementById('back-button-planet')

        nextButtonPlanet.disabled = !responseJsonPlanet.next;
        backButtonPlanet.disabled = !responseJsonPlanet.previous;

        backButtonPlanet.style.visibility = responseJsonPlanet.previous? "visible" : "hidden"


        planetPageUrl = urlPlanet

    } catch (error) {
        alert('Erro ao carregar os planetas');
        console.log(error)
    }
}


async function loadNextPagePlanet() {
    if(!planetPageUrl) return;

    try {
        const responsePlanet = await fetch(planetPageUrl)
        const responseJsonPlanet = await responsePlanet.json()

        await loadPlanets(responseJsonPlanet.next)

    } catch (error) {
        console.log(error)
        alert('Erro ao carregar a próxima página')
    }
}

async function loadPreviousPagePlanet() {
    if(!planetPageUrl) return;

    try {
        const responsePlanet = await fetch(planetPageUrl)
        const responseJsonPlanet = await responsePlanet.json()

        await loadPlanets(responseJsonPlanet.previous)

    } catch (error) {
        console.log(error)
        alert('Erro ao carregar a próxima anterior')
    }
}

function hidePlanetal() {
    const planetal = document.getElementById("planetal")
    planetal.style.visibility = "hidden"
}


function convertClima(climate) {
    const clima = {

        arid: "Arido",
        temperate: "Temperado",
        tropical: "Tropical",
        frozen: "Congelado",
        murky: "Obscuro",
        unknown: "Desconehcido"

    };

    return clima[climate.toLowerCase()] || climate;
}

function convertGravidade(gravity) {
    const gravidade = {
        
        standard: "Padrão",
        unknown: "Desconhecido",
        surface: "Superficie", 
    };

    return gravidade[gravity.toLowerCase()] || gravity;
}

function convertTerreno(terrain) {
    const terreno = {
        
        unknown: "Desconhecido",
        desert: "Deserto",
        grasslands: "Pastagens", 
        mountains: "Montanhas",
        jungle: "Selva",
        rainforests: "Florestas tropicais",
        tundra: "Tundra",
        icecaves: "Cavernas de gelo",
        mountainranges: "Cadeias de montanhas",
        swamp: "pântano",
        gasgiant: "Gigante gasoso",
        forests: "Florestas",
        lakes: "Lagos",
        grassyhills: "Colinas gramadas",
        cityscape: "Paisagem urbana",
        ocean: "Oceano",
    };

    return terreno[terrain.toLowerCase()] || terrain;
}