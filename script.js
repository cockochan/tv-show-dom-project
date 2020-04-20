//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.className = "root";

  episodeList.forEach((element) => {
    var tile = document.createElement("section");
    tile.className = "tile";
    rootElem.appendChild(tile);
    var id = document.createElement("h1");
    tile.appendChild(id);
    id.textContent = `Id:${element.id}`;
    id.className = "id";
    var episName = document.createElement("h1");
    tile.appendChild(episName);
    episName.textContent = `${element.name}`;
    var season = document.createElement("p");
    tile.appendChild(season);
    season.textContent = `season:${element.season}`;
    var episode = document.createElement("p");
    tile.appendChild(episode);
    season.textContent = `episode:${element.number}`;
    var img = document.createElement("img");
    tile.appendChild(img);
    img.src = element.image.medium;
    console.log(element.image.medium)
    img.className = "img";
  });
  console.log(rootElem);
}
window.onload = setup;
