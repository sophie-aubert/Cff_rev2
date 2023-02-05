"use strict";
const affichageVille = document.querySelector("h1");
const affichageBoard = document.querySelector("#board");

//const recupStation = fetch(`http://transport.opendata.ch/v1/stationboard?station=Aarau&limit=10`)
//.then((res) => res.json()
//.then((recupStation) => console.log(recupStation)));

const recupDonnee = (ville) => {
  fetch(
    `https://transport.opendata.ch/v1/stationboard?station=${ville}&limit=10`
  )
    .then((resultat) => {
      if (resultat.status === 404) {
        throw new Error("Oupss... Erreur 404");
      }
      return resultat.json();
    })
    .then((data) => {
      if (data.stationboard.length === 0) {
        throw new Error(
          (affichageVille.innerHTML = "Oups, la ville n'existe pas")
        );
      } else {
        data.stationboard.forEach((element) => afficheDestination(element));
        affichageVille.innerHTML = ville;
      }
    });
};

recupDonnee("Morges");

const afficheDestination = (villeDestination) => {
  const html = `<article>
    <div class="time">13:50</div>
    <div class="category" data-category="${villeDestination.category}">${villeDestination.category}</div>
    <div class="destination">${villeDestination.to}</div>
</article>`;

  affichageBoard.insertAdjacentHTML("beforeend", html);
};
