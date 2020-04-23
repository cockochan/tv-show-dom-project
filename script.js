//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.className = "root";

  var nav = document.createElement("nav");
  nav.className = "nav";
  rootElem.appendChild(nav);

  var filEpisodeList = episodeList;
 

  let build = function(filEpisodeList){
    filEpisodeList.forEach((element) => {
      console.log(filEpisodeList);
    var tile = document.createElement("section");
    tile.className = "tile";
    series.appendChild(tile);
 

  // let filteredEpisodeList =  episodeList;

     
    var season = document.createElement("h1");
    tile.appendChild(season);
    season.className = "season";
    season.textContent = `SEASON:${element.season}`;

     let tileHead =  document.createElement("div");
     tileHead.className = "tileHead";
     tile.appendChild(tileHead);
    
    let plate =  document.createElement("div");
    tileHead.appendChild(plate);
    plate.className = "plate";
    
  
    
    
    var id = document.createElement("h1");
    plate.appendChild(id);
    id.textContent = `# ${element.id}`;
    id.className = "id";


    var episName = document.createElement("h1");
    plate.appendChild(episName);
    episName.className = "episName";
    episName.textContent = `${element.name}`;
    
    var episode = document.createElement("p");
    plate.appendChild(episode);
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
    img.className = "img";
  });

};
var series= document.createElement("div");
series.className = "series";
rootElem.appendChild(series);

build(filEpisodeList);

let searchBox  = document.createElement("INPUT");
searchBox.setAttribute("type", "search");
searchBox.className = "searchBox ";
nav.appendChild(searchBox);
// let filEpisodeList = [];
searchBox.addEventListener('keyup', event => {
  // get the current searchBox value
  const searchValue = event.target.value

  // then do something with it
  filEpisodeList = episodeList.filter(el=>el.summary.includes(searchValue));
  series.textContent = "";
  build(filEpisodeList);
  console.log(searchValue);

});

}
window.onload = setup;
