/* eslint-disable */

var fetchJSONFile = require("../fetch_json.js");
console.log("Worker is started");

   
onmessage = function(e) {

        

           // var queriedAges = "0,1,2,3,4";

            // for (let i = 0; i < ages.length; i++) {
            //     if (i !== 0) {
            //         queriedAges += ",";
            //     }
            //     queriedAges += ages[i].age;
            // }

           

            //fetchJSONFile('https://gis.dola.colorado.gov/lookups/sya?&year=' + queriedYears + '&county=1,3,5,7,9,11,13,14,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123,125&choice=5yr', function(data) {
            fetchJSONFile('../data/agemigration_1970_2010.json',function(data) {
                
                postMessage([data]);
                //console.log(data);
                close(); //worker is finished

            });
        

    }