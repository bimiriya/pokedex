const pokeapi = fetch("http://pokeapi.co/api/v2/pokemon/");
pokeapi
  .then(response => response.json())
  .then(data => {
    console.log(data);
    $.each(data.results, function(pkm, i) {
      const sprites = fetch("http://pokeapi.co/api/v2/pokemon/" + i.name);
      sprites.then(response => response.json()).then(data => {
        $("#results").append(`<div class="col-lg-2"><div class="card">
      <img src=${data.sprites.front_default}>
      <p>${i.name}</p>
      </div></div>`);
      });
    });
  })
  .catch(error => {
    alert("Unable to load content :-(", error);
  });

$("#results").on("click", ".card", function() {
  console.log(
    $(this)
      .find("p")
      .text()
  );
  const sprites = fetch(
    `http://pokeapi.co/api/v2/pokemon/${$(this)
      .find("p")
      .text()}`
  );
  sprites.then(response => response.json()).then(data => {
    console.log(data);
    $.each(data.abilities, function(abil, i) {

      $("#profile").html(`<div id="profile-box">
      <h2>${data.name}</h2>
      <p>Weight: <span>${data.height}</span></p>
      <p>Abilities: <span>${i.ability.name}</span></p>
      </div>`);
    });
  });
});
