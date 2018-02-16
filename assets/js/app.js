const pokeapi = fetch("http://pokeapi.co/api/v2/pokemon/");
pokeapi
  .then(response => response.json())
  .then(data => {
    $.each(data.results, function (pkm, i) {
      const sprites = fetch("http://pokeapi.co/api/v2/pokemon/" + i.name);
      sprites.then(response => response.json()).then(data => {
        $("#results").append(`<div class="col-lg-2"><div class="card">
      <img src=${data.sprites.front_default} data-toggle="modal" data-target="#myModal">
      <p>${i.name.toUpperCase()}</p>
      </div></div>`);
      });
    });
  })
  .catch(error => {
    alert("Unable to load content :-(", error);
  });
  window.onload = function() {
$("#results").on("click", ".card", function () {
  const sprites = fetch(
    `http://pokeapi.co/api/v2/pokemon/${$(this)
      .find("p")
      .text()}`
  );
  sprites.then(response => response.json()).then(data => {
    console.log(data);
    $.each(data.abilities, function (abil, i) {
      
      namePokemon.innerHTML = data.name.toUpperCase();
      type.innerHTML = data.type;
      height.innerHTML = data.height/10 + 'm';
      weight.innerHTML = data.weight/10 + 'kg';
      abilities.innerHTML = i.ability.name;
      speed.setAttribute("value", data.stats[0].base_stat);
      specialDefense.setAttribute("value", data.stats[1].base_stat);
      specialAttack.setAttribute("value", data.stats[2].base_stat);
      defense.setAttribute("value", data.stats[3].base_stat);
      attack.setAttribute("value", data.stats[4].base_stat);
      hp.setAttribute("value", data.stats[5].base_stat);
    });
  });
});
}
