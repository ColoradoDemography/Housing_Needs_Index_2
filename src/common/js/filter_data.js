module.exports = function(main_data, age_string, years_string, callback) {

    //console.log(main_data);
    //create array from ages_string
    //console.log("Ages");
    //console.log(age_string);
    var ages_array = age_string.split(",");
    //console.log(ages_array);
    
    //create array from years_string
    //console.log("Years");
    //console.log(years_string);
    var years_array = years_string.split(",");
    //console.log(years_array);

    var filtered_data = main_data.filter(function(d) {

        for (let i = 0; i < ages_array.length; i++) {
            for (let j = 0; j < years_array.length; j++) {
                if ((d.age === ages_array[i]) && (d.year === parseInt(years_array[j]))) {
                    return true;
                }
            }
        }
        
        // for (let i = 0; i < ages_array.length; i++) {
        //     if (d.age === parseInt(ages_array[i])) {
        //         return true;
        //     }
        // }
        
        // for (let i = 0; i < years_array.length; i++) {
        //     if (d.year === parseInt(years_array[i])) {
        //         return true;
        //     }
        // }

        return false;

    });
    console.log(filtered_data);
    if (callback) callback(filtered_data);
}