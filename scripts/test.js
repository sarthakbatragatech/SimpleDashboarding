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

Plotly.plot(FIRST_TESTER,
    data1,
    layout1,
    responsive
);

var intensity = [];
var countries = [];

console.log(myData.length);

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
    if (cur_country != "") {

        if (typeof(testing[cur_country]) == undefined) {
            testing[cur_country] = element["intensity"];
        } else {
            testing[cur_country] += element["intensity"];
        }
        console.log(testing);
    }
});

console.log(testing);

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



//console.log(subset);