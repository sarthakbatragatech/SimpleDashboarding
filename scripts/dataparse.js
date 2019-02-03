console.log("Parsing Data Running...")

var myData;

const dataURL = "../data/jsondata.json";

$.ajax({
    url: dataURL,
    dataType: 'json',
    async: false,
    data: myData,
    success: function(data) {
    myData = data;
    console.log( "JSON Data Processed!");
    }
  });

