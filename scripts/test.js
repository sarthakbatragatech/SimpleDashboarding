console.log('Plotting Script Running...')

const data1 = [{
    x: [1, 2, 3, 4, 5],
    y: [1, 2, 4, 8, 16],
    marker: {color: 'red'
}}];

const layout1 = {
    title: "A simple and responsive chart",
    font: {size: 12},
  };

const responsive = {responsive: true};

FIRST_TESTER = document.getElementById('first_tester');
SECOND_TESTER = document.getElementById('second_tester');
THIRD_TESTER = document.getElementById('third_tester');


Plotly.plot(FIRST_TESTER,
    data1,
    layout1,
    responsive
);

let intensity = [];
let countries = [];

//console.log(myData.length);

myData.forEach(element => {
    intensity.push(element["intensity"]);
    countries.push(element["country"]);
});

var unique_countries = [... new Set(countries)];
//console.log(unique_countries);
var contry_intensity = [];
var testing = {};

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

console.log(testing);

let ordered = [];

Object.keys(testing).sort().forEach(function(key) {
  ordered[key] = testing[key];
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
console.log(sortable);
// Get this into an object agian to plot it
  
const x1 = {
    x: intensity,
    type: 'histogram',
    marker: {
        color: 'green',
    },
};

const layout2 = {
    title: "Histogram of Intensity",
    font: {size: 12},
};

Plotly.plot(SECOND_TESTER,
    [x1],
    layout2,
    responsive
);

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