//will assume incoming data includes all counties.  countyfips=1 will be used for all data breadth calcs

//var jsonData = require("pop_county_year.json");
module.exports = function() {


    var CMap = function(data) {

        /*var jsonData = $.get("data/pop_county_year.json", function(data){
            jsonData = JSON.parse(data);
            console.log(jsonData);
            return jsonData;
        })*/
        
        /*var request = new XMLHttpRequest();  
        request.open("GET", "data/pop_county_year.csv", false);   
        request.send(null);  
        var csvData = new Array();
        var jsonObject = request.responseText.split(/\r?\n|\r/);
        for (var i = 0; i < jsonObject.length; i++) {
        csvData.push(jsonObject[i].split(','));
        }*/

        function getData(year) {

        var fips_str = "1,3,5,7,9,11,13,14,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123,125";    
        var data = $.ajax({
        url: "https://storage.googleapis.com/co-publicdata/agemigration_1970_2010.json",
        dataType: 'json',
        async: false,

        });
            console.log("https://storage.googleapis.com/co-publicdata/agemigration_1970_2010.json");
        return data.responseJSON;

        }
        
        console.log("Passed");



        var fips_array = [1, 3, 5, 7, 9, 11, 13, 14, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63, 65, 67, 69, 71, 73, 75, 77, 79, 81, 83, 85, 87, 89, 91, 93, 95, 97, 99, 101, 103, 105, 107, 109, 111, 113, 115, 117, 119, 121, 123, 125];
        

        
        

        this.data = data;
        this.alldata = this.data;


        var first_year = function() {
            var low_year_value = 5000;
            for (let i = 0; i < data.length; i++) {
                if (data[i].year < low_year_value) {
                    low_year_value = data[i].year;
                }
            }
            return low_year_value;
        }();
        this.first_year = first_year;

        var last_year = function() {
            var high_year_value = 0;
            for (let i = 0; i < data.length; i++) {
                if (data[i].year > high_year_value) {
                    high_year_value = data[i].year;
                }
            }
            return high_year_value;
        }();
        this.last_year = last_year;

        var number_of_years = function() {
            return (last_year - first_year);
        }();
        this.number_of_years = number_of_years;
        
        var jsonData = getData(first_year);
        
        /* POPULATION */
        // Net migration
        this.retrieveCountyPop = function(fips, year) {
            var agepop = 0;
            for (let i = 0; i < data.length; i++) {
                    if (data[i].countyfips === fips && data[i].year === year) {
                        agepop = agepop + parseInt(data[i].netmigration);
                    }
                }
            return agepop; 
        }

        // Population
        this.retrieveCountyXPop = function(fips, year) {
            var agepop = 0;
            for (let i = 0; i < data.length; i++) {
                    if (data[i].countyfips === fips && data[i].year === year) {
                        agepop = agepop + parseInt(data[i].population);
                    }
                }
            return agepop; 
        }
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //just do 0 to number of age categories
        this.retrieveTtlCountyPop = function(fips, year) {
            
            var allpop = 0;
            for (let j = 0; j < jsonData.length; j++) {

                if (parseInt(jsonData[j].countyfips) === fips && parseInt(jsonData[j].year) === year) {

                allpop = jsonData[j].estimate;
                    console.log(allpop);
                }
                    
            }
            return allpop;
                                        
        }

        this.getMaxTtl = function() {
            var max_value = -Infinity;
            for (let i = 0; i < fips_array.length; i++) {
                var current_county = this.retrieveCountyPop(fips_array[i], first_year);
                if (current_county > max_value) {
                    max_value = current_county;
                }
            }
            return max_value;
        }

        this.getMinTtl = function() {
            var min_value = Infinity;
            for (let i = 0; i < fips_array.length; i++) {
                var current_county = this.retrieveCountyPop(fips_array[i], first_year);
                if (current_county < min_value) {
                    min_value = current_county;
                }
            }
            return min_value;
        }

        this.getMedianTotalPop = function() {
            var values = [];
            for (let i = 0; i < fips_array.length; i++) {
                var current_county = parseFloat(this.retrieveTtlPop(fips_array[i]));
                values.push(current_county);
            }

            values.sort(function(a, b) {
                return a - b;
            });

            var half = Math.floor(values.length / 2);
            if (values.length % 2)
                return values[half];
            else
                return (values[half - 1] + values[half]) / 2.0;
        }
      
        //Total Migrants
        this.retrieveTtlPop = function(fips) {
            return this.retrieveCountyPop(fips, first_year);
        }
        //Total Population
        this.retrieveXTtlPop = function(fips) {
            return this.retrieveXCountyPop(fips, first_year);
        }

        this.retrieveCountyMigrationRate = function(fips, year) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].countyfips === fips && data[i].year === year) {
                    return (this.retrieveCountyPop / this.retrieveCountyXPop) * 1000;
                }
            }
            return 0;
        }

        this.retrieveTtlMigration = function(fips) {
            var running_total_migration = 0;
            for (let j = (first_year + 1); j < (last_year + 1); j++) {
                running_total_migration += this.retrieveCountyPop(fips, j);
            }
            return running_total_migration;
        }

        this.getMaxTtlMigration = function() {
            var max_value = -Infinity;
            for (let i = 0; i < fips_array.length; i++) {
                var current_county = this.retrieveTtlMigration(fips_array[i]);
                if (current_county > max_value) {
                    max_value = current_county;
                }
            }
            return max_value;
        }

        this.getMinTtlMigration = function() {
            var min_value = Infinity;
            for (let i = 0; i < fips_array.length; i++) {
                var current_county = this.retrieveTtlMigration(fips_array[i]);
                if (current_county < min_value) {
                    min_value = current_county;
                }
            }
            return min_value;
        }

        this.retrieveMigrationRate = function(fips) {
            var running_total = 0;
            for (let j = (first_year + 1); j < (last_year + 1); j++) {
                running_total += this.retrieveCountyMigrationRate(fips, j);
            }
            return (running_total / number_of_years).toFixed(2);
        }

        this.getMaxMigrationRate = function() {
            var max_value = -Infinity;
            for (let i = 0; i < fips_array.length; i++) {
                var current_county = parseFloat(this.retrieveMigrationRate(fips_array[i]));
                if (current_county > max_value) {
                    max_value = current_county;
                }
            }
            return max_value;
        }

        this.getMinMigrationRate = function() {
            var min_value = Infinity;
            for (let i = 0; i < fips_array.length; i++) {
                var current_county = parseFloat(this.retrieveMigrationRate(fips_array[i]));
                if (current_county < min_value) {
                    min_value = current_county;
                }
            }
            return min_value;
        }
        

    }

    return CMap; // return constructor function
    //});
}