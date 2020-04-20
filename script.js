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
    id.textContent = `# ${element.id}`;
    id.className = "id";

    var season = document.createElement("h1");
    tile.appendChild(season);
    season.className = "season";
    season.textContent = `SEASON:${element.season}`;
    
    

    var episName = document.createElement("h1");
    tile.appendChild(episName);
    episName.className = "episName";
    episName.textContent = `${element.name}`;
    
    var episode = document.createElement("p");
    tile.appendChild(episode);
    episode.className = "episode";
    episode.textContent =`episode:${element.number}`;

    var para = document.createElement("p");
    tile.appendChild(para);
    para.className = "para";
    let cleanText = element.summary.slice(3,(element.summary.length-4));
    para.textContent =`${cleanText}`;

    var img = document.createElement("img");
    tile.appendChild(img);
    img.src = element.image.medium;
    console.log(element.image.medium)
    img.className = "img";
  });
  console.log(rootElem);
}
window.onload = setup;
