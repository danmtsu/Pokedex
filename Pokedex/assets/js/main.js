const loadButton = document.getElementById('loadMoreButton')
var limit = 10
var offset = 0
const maxRecords = 151

const pokemonsOl = document.getElementById('pokemonList')

//pokemons.map() pode passar a transformação de um tipo de elemento em outro, passa um parametro em forma de função na qual será aplicado a todos os elementos do array


function loadPokemonItens (offset, limit){
    pokeAPI.getPokemons(offset, limit).then((pokemons =[]) =>{
        const newHtml = pokemons.map((pokemon)=>
            `            
            <li class="pokemon  ${pokemon.type}">
            <span class="number"> #${pokemon.id}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type)=> `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>`).join('')

        pokemonsOl.innerHTML += newHtml
    })
}

loadPokemonItens(offset,limit)

loadButton.addEventListener('click',()=>{
    offset += limit

    const qtdRecordNextPage = offset + limit
    if(qtdRecordNextPage >= maxRecords){
        const newLimit = maxRecords - offset
        loadPokemonItens(offset,limit)
        loadButton.parentElement.removeChild(loadButton)
    }else{
        loadPokemonItens(offset,limit)

    }
})

/*const pokemonsHtml = []

for (let i = 0; i < pokemons.length; i++) {
    const pokemon = pokemons[i];
    pokemonsHtml.push(pokemon)
    pokemonOl.innerHTML += convertPokemonLi(pokemon)
}*/
/*
//pokemonOl.appendChild()colocar mais um filho nessa lista com o id= pokemonList


//then possui um argumento que é uma função na qual pode retorna duas chamadas de promise sendo elas uma realizada e outra rejeitada 
fetch(url).then(function(response) {
    return response.json()
    // retorna um objeto do body já convertido em json
}).then((jsonBody)=> jsonBody.results) // pegando o json boddy.results que é a lista de pokemons para poder trabalhar com ela
.then((pokemonsList)=> {
    for (let i = 0; i < pokemonsList.length; i++) {
        const pokemon = pokemonsList[i];
        console.log(convertPokemonLi(pokemon))
        pokemonOl.innerHTML += convertPokemonLi(pokemon) //Adicionando o Li classs pokemon na lista dos pokemons da pokedex
    }
    
    /*debugger
    console.log(pokemonsList)}) // imprime o objeto json do body passado na response do primeiro the, encadeamento de thens
})
    .catch(function(error){
    console.error(error)
}).finally(() =>{
    console.log('Requisição concluída')
})//fetch vai retornar uma response promisse(promessa de um resultado)
// olhar network -> Fetch/xhr -> preview a lista dos 20 primeiros pokemons
// para debuggar só colocar um debugger na lista/ função na qual deseja debuggar

*/