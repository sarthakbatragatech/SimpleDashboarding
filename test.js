console.log('Hello')

const data1 = [{
    x: [1, 2, 3, 4, 5],
    y: [1, 2, 4, 8, 16],
    marker: {color: 'red'
}}];

const data2 = [{
    x: [1, 2, 3, 4, 5],
    y: [1, 2, 4, 8, 16],
    mode: 'markers',
    marker: {color: 'green'
}}];

const layout = {
    title: "A simple and responsive chart",
    font: {size: 12},
  };

const responsive = {responsive: true};

FIRST_TESTER = document.getElementById('first_tester');
SECOND_TESTER = document.getElementById('second_tester');

Plotly.plot(FIRST_TESTER,
    data1,
    layout,
    responsive
);

Plotly.plot(SECOND_TESTER,
    data2,
    layout,
    responsive
);