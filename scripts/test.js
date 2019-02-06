console.log('Plotting Script Running...')

FIRST_TESTER = document.getElementById('first_tester');
SECOND_TESTER = document.getElementById('second_tester');
THIRD_TESTER = document.getElementById('third_tester');

let intensity = [];
let countries = [];
let sectors = [];
let topics = [];
let pestles = [];

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
    if(element["topic"] != '') {
        topics.push(element["topic"]);
    }
    if(element["pestle"] != '') {
        pestles.push(element["pestle"]);
    }
});

let unique_countries = [... new Set(countries)];
let unique_sectors = [... new Set(sectors)];
let unique_topics = [... new Set(topics)];
let unique_pestles = [... new Set(pestles)];

unique_countries.sort();
unique_sectors.sort();
unique_topics.sort();
unique_pestles.sort();

//console.log(unique_topics);

let heat1 = [];
for (sector in unique_sectors) {
    heat1[unique_sectors[sector]] = [];
    for (country in unique_countries) {
        heat1[unique_sectors[sector]][unique_countries[country]] = 0;
    }
};


myData.forEach(element => {
        if((element["intensity"] != "") && (element["country"] != "")
                && (element["sector"] != "" )) {
                    heat1[element["sector"]][element["country"]] += element["intensity"];
        } 
});

let z1 = [];
for (let i=0; i < unique_sectors.length; i++) {
    z1[i] = [];
    for (let j=0; j < unique_countries.length; j++) {
        z1[i][j] = heat1[unique_sectors[i]][unique_countries[j]];
    }
}

let heat2 = [];
for (topic in unique_topics) {
    heat2[unique_topics[topic]] = [];
    for (country in unique_countries) {
        heat2[unique_topics[topic]][unique_countries[country]] = 0;
    }
};


myData.forEach(element => {
        if((element["intensity"] != "") && (element["country"] != "")
                && (element["topic"] != "" )) {
                    heat2[element["topic"]][element["country"]] += element["intensity"];
        } 
});

let z2 = [];
for (let i=0; i < unique_topics.length; i++) {
    z2[i] = [];
    for (let j=0; j < unique_countries.length; j++) {
        z2[i][j] = heat2[unique_topics[i]][unique_countries[j]];
    }
}

let heat3 = [];
for (pestle in unique_pestles) {
    heat3[unique_pestles[pestle]] = [];
    for (country in unique_countries) {
        heat3[unique_pestles[pestle]][unique_countries[country]] = 0;
    }
};


myData.forEach(element => {
        if((element["intensity"] != "") && (element["country"] != "")
                && (element["pestle"] != "" )) {
                    heat3[element["pestle"]][element["country"]] += element["intensity"];
        } 
});

let z3 = [];
for (let i=0; i < unique_pestles.length; i++) {
    z3[i] = [];
    for (let j=0; j < unique_countries.length; j++) {
        z3[i][j] = heat3[unique_pestles[i]][unique_countries[j]];
    }
}

let colorscaleValue = [
    [0, '#ffffff'],
    [0.1, '#0000ff'],
    [0.2, '#00ff00'],
    [1, '#ff0000']
  ];

function change(i) {
    if (i === 0) {
        return {
            y: unique_sectors,
            z: z1,
            x: unique_countries,
            type: 'heatmap',
            colorscale: colorscaleValue,
            layout1,
            responsive,
            visible: i === 0,
        }
    } else if (i === 1) {
        return {
            y: unique_topics,
            z: z2,
            x: unique_countries,
            type: 'heatmap',
            colorscale: colorscaleValue,
            layout1,
            responsive,
            visible: i === 0,
        }
    } else {
        return {
            y: unique_pestles,
            z: z3,
            x: unique_countries,
            type: 'heatmap',
            colorscale: colorscaleValue,
            layout1,
            responsive,
            visible: i === 0,
        }
    }
}

const layout1 = {
    title: "Heatmap Activity",
    font: {size: 12},
    yaxis: {
        automargin: true
    },
  };

const responsive = {responsive: true};

Plotly.plot(FIRST_TESTER, [0,1,2].map(change), {
    updatemenus: [{
        y: 1.2,
        yanchor: 'top',
        buttons: [{
            method: 'restyle',
            args: ['visible', [true, false, false]],
            label: 'Sectors'
        }, {
            method: 'restyle',
            args: ['visible', [false, true, false]],
            label: 'Topics'
        }, {
            method: 'restyle',
            args: ['visible', [false, false, true]],
            label: 'Pestles'
        }],
    }],
});

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