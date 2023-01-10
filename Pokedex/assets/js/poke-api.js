

function convertPokemonAPIinPoke(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.name = pokeDetail.name
    pokemon.id = pokeDetail.id
    const types = pokeDetail.types.map((typeSlot)=>typeSlot.type.name)
    pokemon.types = types
    const [type] = types
    pokemon.type = type


    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    

    return pokemon

}

const pokeAPI = {}


pokeAPI.getpokemonDetails = (pokemon) =>{
    return fetch(pokemon.url).then((response) =>response.json()).then(convertPokemonAPIinPoke)
}
// fazendo uma requisição http para conseguir a lista de pokemons
pokeAPI.getPokemons = (offset=0, limit=20) => { // instanciando valores default para offset e limit
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url).then(function(response) {
        return response.json()
        // retorna um objeto do body já convertido em json
    }).then((jsonBody)=> jsonBody.results).then((pokemons) => pokemons.map(pokeAPI.getpokemonDetails))
        .then((detailRequests)=> Promise.all(detailRequests)).then((pokemonDetail)=> {
            console.log(pokemonDetail)
            return pokemonDetail})
        .catch((error)=>{console.error(error)})
}