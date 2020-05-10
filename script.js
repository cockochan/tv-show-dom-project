//You can edit ALL of the code here
function setup() {
  // const allEpisodes = getAllEpisodes();
  // makePageForEpisodes(allEpisodes);
  
  
  //   fetch(`https://api.tvmaze.com/shows/1/episodes`)
  //   .then(response => response.json())
  //   .then(allEpisodes =>makePageForEpisodes(allEpisodes));
  // };
 
  fetch(`https://api.tvmaze.com/shows/1/episodes`)
  .then(response => response.json())
  .then(allEpisodes =>makePageForEpisodes(allEpisodes));
  
};
let fetchNow = function(showId,showArray){
  fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
  .then(response => response.json())
  .then(allEpisodes =>makePageForEpisodes(allEpisodes));
  // dropDownShows.innerText=showArray.name;
};
let allShows = getAllShows();

let toLow =() =>{
allShows = allShows.map(show=>show.name=show.name.toUpperCase());
return allShows};

let sortedAllShows = allShows.sort(function(x,y){
 
  if (x.name>y.name){
        return 1;
      } else if (x.name<y.name) {
        return -1;
      }
      return 0;
    });
    

function makePageForEpisodes(episodeList) {
  let root = document.getElementById("root");
  // root.innerHTML="";
  const rootElem = document.getElementById("root");
  rootElem.className = "root";
  
  var nav = document.createElement("nav");
  nav.className = "nav";
  rootElem.appendChild(nav);


  var filEpisodeList = episodeList;
  // create dropdown list
  var dropDownContainer = document.createElement("div");
  nav.appendChild(dropDownContainer);
  dropDownContainer.className="dropDownContainer";
  var dropDown = document.createElement("SELECT");
  dropDownContainer.appendChild(dropDown);
  dropDown.className="dropDown";

  //show selector
  // create dropdown list
  var dropDownShowsContainer = document.createElement("div");
  nav.appendChild(dropDownShowsContainer);
  dropDownShowsContainer.className="dropDownShowsContainer";
  var dropDownShows = document.createElement("SELECT");
  dropDownContainer.appendChild(dropDownShows);
  dropDownShows.className="dropDownShows";
  // console.log(sortedAllShows);
  
  let prefetch = function(){
    let showArray = allShows.find(show =>show.name.includes(dropDownShows.value));
   
   let showId = showArray.id;
   
  fetchNow(showId,showArray);
  //  build(filEpisodeList);
  }
  dropDownShows.addEventListener("change",prefetch);
// add shows to selector
let addShowToSelector = function(show){

  let showOption  = document.createElement("option");
   showOption.text = `${show.name}`;
  dropDownShows.add(showOption);
};
sortedAllShows.forEach(show =>addShowToSelector(show));
  
  // display.textContent = "";
  // display.textContent = `showing ${filEpisodeList.length} episodes`;

// };
 
// for each stuff
  let build = function(filEpisodeList){
    console.log(filEpisodeList)
    filEpisodeList.forEach((element) => {
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
    //generate episode code
   function padToTwo(number) {
      if (number<=9999) { number = ("000"+number).slice(-2); }
      return number;
    };
    let padEpisode = padToTwo(element.number);
    let padSeason = padToTwo(element.season);
    let episCode = `S${padSeason}E${padEpisode}`;
   
    var code = document.createElement("h1");
    plate.appendChild(code);
    code.className = "code";
    

    code.textContent = episCode;
    //append dropdown items
  var option = document.createElement("option");
  option.text = `${episCode} - ${element.name}`;
  dropDown.add(option);
  element.episCode = option.text;
  
  });
  
let dropEpisodeSelect =() => {
  
  let thatEpisode = filEpisodeList.find(x=>x.episCode==dropDown.value);
  filEpisodeList =[];
  filEpisodeList.push(thatEpisode);

  console.log(thatEpisode);
  series.textContent = "";
  build(filEpisodeList);
  

};
dropDown.addEventListener("change",dropEpisodeSelect);
// 
  
};

  // show how many episodes are displayed;
  var display = document.createElement("p");
  display.className = "display";
  root.appendChild(display);
 
var series= document.createElement("div");
series.className = "series";
rootElem.appendChild(series);

var link = document.createElement("a");
rootElem.appendChild(link);
link.className = "link";
link.setAttribute('href',"https://www.tvmaze.com/");
link.textContent="Original info from tvmaze";
// console.log(link);

build(filEpisodeList);

let searchBox  = document.createElement("INPUT");
searchBox.setAttribute("type", "search");
searchBox.className = "searchBox ";
nav.appendChild(searchBox);
searchBox.placeholder = "Type search here..";
// let filEpisodeList = [];
searchBox.addEventListener('keyup', event => {
  // get the current searchBox value
  const searchValue = event.target.value

  // then do something with it
  filEpisodeList = episodeList.filter(el=>el.summary.includes(searchValue));
  series.textContent = "";
  build(filEpisodeList);
 


});

}
window.onload = setup;
