const continents = {
    "Africa": {
        "bounds": [
            [-35.0, -20.0],
            [38.0, 55.0]
        ],
        "view": [1.6508, 20.0171],
        "zoom": 3,
        "view_panel": 'Views:\
        <input type="button" class="pannelButton" value="Home View" onclick="map.setView([6508, 20.0171],3)"/>\
        <input type="button" class="pannelButton" value="East Africa" onclick="map.setView([5,38],4)"/>\
        <input type="button" class="pannelButton" value="South Eastern Islands" onclick="map.setView([-20,46],4)"/>\
        <input type="button" class="pannelButton" value="Southwestern Africa" onclick="map.setView([-8,14],4)"/>\
        <input type="button" class="pannelButton" value="West Africa" onclick="map.setView([9,2],4)"/> \
        <input type="button" class="pannelButton" value="Maghreb" onclick="map.setView([30,6],4)"/>'
    },
    "Asia": {
        "bounds": [
            [-10,25],
            [55.0, 180.0]
        ],
        "view": [34.0479, 100.6197],
        "zoom": 3,
        "view_panel": 'Views:\
        <input type="button" class="pannelButton" value="Home View" onclick="map.setView([34.0479,100.6197],3)"/>\
        <input type="button" class="pannelButton" value="Arabian Peninsula" onclick="map.setView([28,41],4.25)"/>\
        <input type="button" class="pannelButton" value="South-East Asia" onclick="map.setView([4,100],4)"/>'
    },
    "Europe": {
        "bounds": [
            [33, -25.0],
            [72.0, 45.0]
        ],
        "view": [25, 0.2],
        "zoom": 3,
        "view_panel": 'Views:\
        <input type="button" class="pannelButton" value="Home View" onclick="map.setView([25, 0.2],3)"/>\
        <input type="button" class="pannelButton" value="Balkans" onclick="map.setView([41,21],6)"/>\
        <input type="button" class="pannelButton" value="Northern Europe" onclick="map.setView([60,18],5)"/>\
        <input type="button" class="pannelButton" value="Western Alps and Pyrenees" onclick="map.setView([46,6],6)"/>\
        <input type="button" class="pannelButton" value="Mediterranean Sea" onclick="map.setView([30,8],5)"/>'
        
    },
    "North and Central America": {
        "bounds": [
            [4,-40],
            [80, -170]
        ],
        "view": [18.0, -77.0],
        "zoom": 3,
        "view_panel": 'Views:\
        <input type="button" class="pannelButton" value="Home View" onclick="map.setView([18.0, -77.0],3)"/>\
        <input type="button" class="pannelButton" value="Central America" onclick="map.setView([9,-82],5)"/>\
        <input type="button" class="pannelButton" value="Caribbeans" onclick="map.setView([17,-64],5)"/>'
    },
    "Oceania": {
        "bounds": [
            [-180, 180],
            [180, -180]
        ],
        "view": [-27.7359, 150.0188],
        "zoom": 3,
        "view_panel": 'Views:\
        <input type="button" class="pannelButton" value="Home View" onclick="map.setView([-22.7359, 140.0188],3)"/>\
        <input type="button" class="pannelButton" value="Pacific Islands" onclick="map.setView([-16,-171],5)"/>'
    },
    "South America": {
        "bounds": [
            [-56.0, -82.0],
            [13.0, -34.0]
        ],
        "view": [-14.2350, -51.9253],
        "zoom": 3,
        "view_panel": 'Views:\
        <input type="button" class="pannelButton" value="Home View" onclick="map.setView([-22.7359, 140.0188],3)"/>\
        <input type="button" class="pannelButton" value="Northern South America" onclick="map.setView([5,-70],5)"/>'
    },
    "World": {
        "bounds": [
            [-90, -180],
            [90, 180]
        ],
        "view": [30.0,3.0],
        "zoom": 1.55,
        "view_panel": 'Views:\
        <input type="button" class="pannelButton" value="Home View" onclick="map.setView([30, 3],1.55)"/>\
        <input type="button" class="pannelButton" value="East Africa" onclick="map.setView([5,38],4)"/>\
        <input type="button" class="pannelButton" value="South Eastern Islands" onclick="map.setView([-20,46],4)"/>\
        <input type="button" class="pannelButton" value="Southwestern Africa" onclick="map.setView([-8,14],4)"/>\
        <input type="button" class="pannelButton" value="West Africa" onclick="map.setView([9,2],4)"/> \
        <input type="button" class="pannelButton" value="Maghreb" onclick="map.setView([30,6],4)"/>\
        <input type="button" class="pannelButton" value="Arabian Peninsula" onclick="map.setView([28,41],4.25)"/>\
        <input type="button" class="pannelButton" value="South-East Asia" onclick="map.setView([4,100],4)"/>\
        <input type="button" class="pannelButton" value="Balkans" onclick="map.setView([41,21],6)"/>\
        <input type="button" class="pannelButton" value="Northern Europe" onclick="map.setView([60,18],5)"/>\
        <input type="button" class="pannelButton" value="Western Alps and Pyrenees" onclick="map.setView([46,6],6)"/>\
        <input type="button" class="pannelButton" value="Mediterranean Sea" onclick="map.setView([30,8],5)"/>\
        <input type="button" class="pannelButton" value="Central America" onclick="map.setView([9,-82],5)"/>\
        <input type="button" class="pannelButton" value="Caribbeans" onclick="map.setView([17,-64],5)"/>\
        <input type="button" class="pannelButton" value="Pacific Islands" onclick="map.setView([-16,-171],5)"/>\
        <input type="button" class="pannelButton" value="Northern South America" onclick="map.setView([5,-70],5)"/>'
    }
};
let map;
let lyr;
let geoData;
let countries_completed = [];
let tooltip_layers = [];
let cont = "Europe";
let timerInterval;
let initialDuration = 600; 
let remainingTime = initialDuration;


async function initialiseMap() {
    map = L.map('map').setView([0,0],1);
    const geo =  await fetch("WORLD.geojson");
    geoData = await geo.json();
    lyr = L.geoJSON(geoData).addTo(map);
};

async function updateMap(continent) {
    cont = continent;
    const bounds = continents[continent].bounds;
    const view = continents[continent].view;
    const zoom = continents[continent].zoom;
    map.setMaxBounds(bounds);
    map.setMinZoom(zoom);
    map.setView(view, zoom, {animation: true});
    updateStyle(continent, lyr);
    countries_completed = [];
    returnProgress(continent);
    resetTimer();
    resetTooltips();
    document.getElementById("list_count").innerHTML = ""
    document.getElementById("buttonContainer").style.color = "black";
    document.getElementById("buttonContainer").style.fontWeight = 400;
    document.getElementById("header").innerText = "GUESS THE COUNTRY: " + continent;
    document.getElementById("rightpannel").innerHTML = continents[continent].view_panel
};

function updateStyle(continent, lyr) {
    if (continent === "World") {
        lyr.setStyle({ color: "#E5E4E2", fillColor: "#27221f", weight: 0.2, fillOpacity: 1})
    } else {
        lyr.setStyle(function(feature) {
            if (feature.properties.continent === continent) {
                return { color: "#E5E4E2", fillColor: "#27221f", weight: 0.2, fillOpacity: 1}
            } else {
                return { color: "#27221f", fillColor: "rgba(39, 34, 31, 0.2)", weight: 0.2, fillOpacity: 1}
            };
        });
    };
};

function returnProgress(continent) {
    var size = countFeaturesWithContinent(continent);
    var curr = countries_completed.length;
    document.getElementById("count").innerHTML = curr + "/" + size;
};

function countFeaturesWithContinent(continent) {
    if (continent ===  "World") {
        return geoData.features.filter(feature => (feature.properties.status === "Member State" || feature.properties.status === "Permanent Observer to the UN")).length
    } else {
    return geoData.features.filter(feature => feature.properties.continent === continent && (feature.properties.status === "Member State" || feature.properties.status === "Permanent Observer to the UN")).length;
  }};

  function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    initialDuration = duration;
    timerInterval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;
        remainingTime = timer;

        if (--timer < 0) {
            timer = 0;
        }
        if (timer === 0) {
            clearInterval(timerInterval);
            stopTimerButton();
            document.getElementById("buttonContainer").style.color = "red";
            document.getElementById("buttonContainer").style.fontWeight = "bold";
            lyr.setStyle(function(feature) {
                if (!countries_completed.includes(feature.properties.name) 
                    && (feature.properties.continent === cont || cont === "World") 
                    && (feature.properties.status === "Member State" || feature.properties.status === "Permanent Observer to the UN")) {
                    document.getElementById("countryInput").value = "";
                    var layer = L.geoJSON(feature, {
                        onEachFeature: function (feature, layer) {
                            layer.bindTooltip(feature.properties.name, {permanent: false, sticky: true, direction: "top", className: "sticker"});
                        }
                    });
                    layer.setStyle({
                        fillOpacity: 0,
                        weight: 0 
                    });
                    tooltip_layers.push(layer);
                    layer.addTo(map);
                }
                if (countries_completed.includes(feature.properties.name)) {
                    return { color: "black", fillColor: "#77DD77", weight: 1.33, fillOpacity: 1 };
                } else if (feature.properties.continent === cont) {
                    return { color: "grey", fillColor: "#FF6961", weight: 1.33, fillOpacity: 1 };
                } else {
                    return { color: "#27221f", fillColor: "rgba(39, 34, 31, 0.2)", weight: 0.2, fillOpacity: 1 };
                }
            });
        }
    }, 1000);
}


function startTimerButton() {
    let tenMinutes = 60 * 10,
        display = document.querySelector("#timer");
    startTimer(tenMinutes, display);
};

function stopTimerButton() {
    clearInterval(timerInterval);
    let elapsedTime = initialDuration - remainingTime; 
    let minutes = parseInt(elapsedTime / 60, 10);
    let seconds = parseInt(elapsedTime % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    document.querySelector("#timer").textContent = minutes + ":" + seconds; // Display elapsed time
}

function resetTimer() {
    clearInterval(timerInterval);
    document.querySelector("#timer").textContent = "10:00";

}

function changeColour(nameCountry) {
    const name = nameCountry.value.toLowerCase();
    lyr.setStyle(function(feature) {
        if ((feature.properties.name.toLowerCase() === name || feature.properties.alias.toLowerCase() === name) 
            && !countries_completed.includes(feature.properties.name) 
            && (feature.properties.continent === cont || cont === "World") 
            && (feature.properties.status === "Member State" || feature.properties.status === "Permanent Observer to the UN")) {
            countries_completed.push(feature.properties.name);
            returnProgress(cont);
            document.getElementById("countryInput").value = "";
            var layer = L.geoJSON(feature, {
                onEachFeature: function (feature, layer) {
                    layer.bindTooltip(feature.properties.name, {permanent: false, sticky: true, direction: "top", className: "sticker"});
                }});
            layer.setStyle(
                {
                    fillOpacity: 0,
                    weight: 0 
                });
            tooltip_layers.push(layer);
            layer.addTo(map);
            
            if (countries_completed.length === 1) {
                document.getElementById("list_count").innerHTML += feature.properties.name;
                startTimerButton();
            } else {
                document.getElementById("list_count").innerHTML += " - " + feature.properties.name;
                if (countries_completed.length === countFeaturesWithContinent(cont)) {
                    stopTimerButton();
                    document.getElementById("buttonContainer").style.color = "red";
                    document.getElementById("buttonContainer").style.fontWeight = "bold";
                }
        }
        if (countries_completed.includes(feature.properties.name)) {
            return { color: "black", fillColor: "#77DD77", weight: 1.33, fillOpacity: 1}
        } else {
            return { color: "grey", fillColor: "lightgrey", weight: 0.33, fillOpacity: 1};
        }
    }
    });
}

async function toolBox() {
    await initialiseMap();
    await updateMap("World");
};

function resetTooltips() {
     var tooltip_list_length = tooltip_layers.length;
     for (var i = 0; i < tooltip_list_length; i++) {
        map.removeLayer(tooltip_layers[i]);
     };
     tooltip_layers = []
};

function darkMode() {
    var bodyElement = document.body;
    bodyElement.classList.toggle("dark-mode");
    
    var h1Elements = document.querySelectorAll("h1");
    h1Elements.forEach(function(h1Element) {
        h1Element.classList.toggle("dark-mode");
    });
}


toolBox();   
