//You can edit ALL of the code here
function setup() {
  fetch(`https://api.tvmaze.com/shows/1/episodes`)
    .then(response => response.json())
    .then(allEpisodes => {
      globalAllEpisodes = allEpisodes;
      makePageForEpisodes(allEpisodes);
    });
};
let globalAllEpisodes;
let allShows = getAllShows();

let toLow = () => {
  allShows = allShows.map(show => show.name = show.name.toUpperCase());
  return allShows
};

let sortedAllShows = allShows.sort(function (x, y) {

  if (x.name > y.name) {
    return 1;
  } else if (x.name < y.name) {
    return -1;
  }
  return 0;
});


function makePageForEpisodes(episodeList) {
  let root = document.getElementById("root");
  root.innerHTML = "";
  const rootElem = document.getElementById("root");
  rootElem.className = "root";

  var nav = document.createElement("nav");
  nav.className = "nav";
  rootElem.appendChild(nav);


  var filEpisodeList = episodeList;
  // create dropdown list
  // var dropDownContainer = document.createElement("div");
  // nav.appendChild(dropDownContainer);
  // dropDownContainer.className="dropDownContainer";
  var dropDown = document.createElement("SELECT");
  nav.appendChild(dropDown);
  dropDown.className = "dropDown";

  //show selector
  // create dropdown list
  // var dropDownShowsContainer = document.createElement("div");
  // nav.appendChild(dropDownShowsContainer);
  // dropDownShowsContainer.className="dropDownShowsContainer";
  var dropDownShows = document.createElement("SELECT");
  nav.appendChild(dropDownShows);
  dropDownShows.className = "dropDownShows";
  // console.log(sortedAllShows);


  // add shows to selector
  let addShowToSelector = function (show) {

    let showOption = document.createElement("option");
    showOption.text = `${show.name}`;
    dropDownShows.add(showOption);
  };
  sortedAllShows.forEach(show => addShowToSelector(show));

  // display.textContent = "";
  // display.textContent = `showing ${filEpisodeList.length} episodes`;

  // };
  let showImage;

  let prefetch = function () {

    let selectedShow = allShows.find(show => show.name.includes(dropDownShows.value));
    let showId = selectedShow.id;
    console.log(selectedShow);
    showImage = selectedShow.image.medium;

    fetchNow(showId, selectedShow);
    //  build(filEpisodeList);
  }
  function padToTwo(number) {
    if (number <= 9999) { number = ("000" + number).slice(-2); }
    return number;
  };
  let makeCode = (episode) => {
    let padEpisode = padToTwo(episode.number);
    let padSeason = padToTwo(episode.season);
    let episCode = `S${padSeason}E${padEpisode}`;
    episode.episCode = `${episCode} - ${episode.name}`

    series.innerHTML = "";
    dropDown.innerHTML = "";
  }
  // filEpisodeList = allEpisodes;

  let rebuildEpisodeTiles = (allEpisodes) => {
    allEpisodes.forEach(
      el => makeCode(el)
    );

    build(allEpisodes);

  }
  let fetchNow = function (showId, showArray) {
    fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
      .then(response => response.json())
      .then(allEpisodes => {
        globalAllEpisodes = allEpisodes;
        rebuildEpisodeTiles(allEpisodes);
      });

    //  build(showArray);
  };
  dropDownShows.addEventListener("change", prefetch);
  let build = function (filEpisodeList) {
    console.log(filEpisodeList.length)
    filEpisodeList.forEach((episode) => {
      var tile = document.createElement("section");
      tile.className = "tile";
      series.appendChild(tile);
      // console.log(episode);

      // let filteredEpisodeList =  episodeList;


      var season = document.createElement("h1");
      tile.appendChild(season);
      season.className = "season";

      if (episode.hasOwnProperty("season")) {
        season.textContent = `SEASON:${episode.season}`;
      }
      else (
        season.textContent = "none"
      );
      let tileHead = document.createElement("div");
      tileHead.className = "tileHead";
      tile.appendChild(tileHead);

      let plate = document.createElement("div");
      tileHead.appendChild(plate);
      plate.className = "plate";




      var id = document.createElement("h1");
      plate.appendChild(id);
      id.textContent = `# ${episode.id}`;
      id.className = "id";


      var episName = document.createElement("h1");
      plate.appendChild(episName);
      episName.className = "episName";
      episName.textContent = `${episode.name}`;

      let episodePara = document.createElement("p");
      plate.appendChild(episodePara);
      episodePara.className = "episode";
      episodePara.textContent = `episode:${episode.number}`;

      var para = document.createElement("p");
      tile.appendChild(para);
      para.className = "para";
      // console.log(episode);
      let cleanText = episode.summary.slice(3, (episode.summary.length - 4));
      para.textContent = `${cleanText}`;

      var img = document.createElement("img");
      tile.appendChild(img);
      if (episode.hasOwnPropertyimage, img) {
        img.src = episode.image.medium;
        img.className = "img";
      }
      else { (img.src = show.img); }

      //generate episode code
      let generateEpisodeCode = (episode) => {

        function padToTwo(number) {
          if (number <= 9999) { number = ("000" + number).slice(-2); }
          return number;
        };
        let padEpisode = padToTwo(episode.number);
        let padSeason = padToTwo(episode.season);
        let episCode = `S${padSeason}E${padEpisode}`;

        var code = document.createElement("h1");
        plate.appendChild(code);
        code.className = "code";


        code.textContent = episCode;
        //append dropdown items
        var option = document.createElement("option");
        option.text = `${episCode} - ${episode.name}`;
        dropDown.add(option);
        episode.episCode = option.text;
      };
      generateEpisodeCode(episode);


      let dropEpisodeSelect = () => {
        // console.log(episCode)

        let thatEpisode = globalAllEpisodes.find(x => x.episCode == dropDown.value);
        if (!thatEpisode) {
          console.error("can't find episode", dropDown.value)
        }
        filEpisodeList = [];
        filEpisodeList.push(thatEpisode);

        // console.log(thatEpisode);
        series.textContent = "";
        build(filEpisodeList);
      };


      dropDown.addEventListener("change", dropEpisodeSelect);
      // 
    });
  };

  // show how many episodes are displayed;
  var display = document.createElement("p");
  display.className = "display";
  root.appendChild(display);

  var series = document.createElement("div");
  series.className = "series";
  rootElem.appendChild(series);

  var link = document.createElement("a");
  rootElem.appendChild(link);
  link.className = "link";
  link.setAttribute('href', "https://www.tvmaze.com/");
  link.textContent = "Original info from tvmaze";
  // console.log(link);

  build(filEpisodeList);

  let searchBox = document.createElement("INPUT");
  searchBox.setAttribute("type", "search");
  searchBox.className = "searchBox ";
  nav.appendChild(searchBox);
  searchBox.placeholder = "Type search here..";
  // let filEpisodeList = [];
  searchBox.addEventListener('keyup', event => {
    // get the current searchBox value
    const searchValue = event.target.value

    // then do something with it
    filEpisodeList = episodeList.filter(el => el.summary.includes(searchValue));
    series.textContent = "";
    build(filEpisodeList);



  });

}
window.onload = setup;
