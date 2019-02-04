console.log('Plotting Script Running...')

FIRST_TESTER = document.getElementById('first_tester');
SECOND_TESTER = document.getElementById('second_tester');
THIRD_TESTER = document.getElementById('third_tester');

let intensity = [];
let countries = [];
let sectors = [];

//console.log(myData.length);

myData.forEach(element => {
    if(element["intensity"] != 0) {
        intensity.push(element["intensity"]);
    }
    if(element["country"] != '') {
        countries.push(element["country"]);
    }
    if(element["sector"] != '') {
        sectors.push(element["sector"]);
    }
});

let unique_countries = [... new Set(countries)];
let unique_sectors = [... new Set(sectors)];
unique_countries.sort();
unique_sectors.sort();

//console.log(unique_sectors);

let heat = [];
for (sector in unique_sectors) {
    heat[unique_sectors[sector]] = [];
    for (country in unique_countries) {
        heat[unique_sectors[sector]][unique_countries[country]] = 0;
    }
};


myData.forEach(element => {
        if((element["intensity"] != "") && (element["country"] != "")
                && (element["sector"] != "" )) {
                    heat[element["sector"]][element["country"]] += element["intensity"];
        } 
});

let z = [];
for (let i=0; i < unique_sectors.length; i++) {
    z[i] = [];
    for (let j=0; j < unique_countries.length; j++) {
        z[i][j] = heat[unique_sectors[i]][unique_countries[j]];
    }
}

let colorscaleValue = [
    [0, '#ffffff'],
    [0.1, '#0000ff'],
    [0.2, '#00ff00'],
    [1, '#ff0000']
  ];

const data1 = [{
    x: unique_countries,
    y: unique_sectors,
    z: z,
    type: 'heatmap',
    colorscale: colorscaleValue,
}];

const layout1 = {
    title: "A simple and responsive chart",
    font: {size: 12},
  };

const responsive = {responsive: true};

Plotly.plot(FIRST_TESTER,
    data1,
    layout1,
    responsive
);

const data2 = [{
    x: intensity,
    type: 'histogram',
    marker: {
        color: 'green',
    },
}];

const layout2 = {
    title: "Histogram of Intensity",
    font: {size: 12},
};

Plotly.plot(SECOND_TESTER,
    data2,
    layout2,
    responsive
);

let testing = {};

myData.forEach(element => {
    let cur_country = element["country"];
    let cur_intensity = element["intensity"];
    if(cur_country != "") {
        if(cur_intensity != "") {
            if (testing[cur_country] == undefined) {
                testing[cur_country] = cur_intensity;
            } else {
                testing[cur_country] = testing[cur_country] + cur_intensity;
            }
        }
    }
});

//console.log(testing);

let ordered = [];

Object.keys(testing).sort().forEach(function(key) {
  ordered[key] = testing[key];
});

xarr = [];
yar = [];
ordered.forEach(element => {
    xarr.push(element["intensity"]);
    yarr.push(element["country"]);
});

function sortObject(obj) {
    var arr = [];
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            arr.push({
                'key': prop,
                'value': obj[prop]
            });
        }
    }
    arr.sort(function(a, b) { return a.value - b.value; });
    //arr.sort(function(a, b) { a.value.toLowerCase().localeCompare(b.value.toLowerCase()); }); //use this to sort as strings
    return arr; // returns array
}

let sortable = sortObject(testing);
//console.log(sortable);
// Get this into an object agian to plot it
  

const bar_data = [{
      x: Object.keys(ordered),
      y: Object.values(ordered),
      type: 'bar',
}];

const layout3 = {
    title: "Third Chart",
    font: {size: 12},
};

Plotly.newPlot(THIRD_TESTER,
    bar_data,
    layout3,
    responsive,
);

//console.log(subset);