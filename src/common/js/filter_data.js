module.exports = function(main_data, age_string, callback) {

    //console.log(main_data);
    //create array from ages_string
    var ages_array = age_string.split(",");
    //console.log(ages_array);
    
    //create array from years_string
    //var years_array = years_string.split(",");
    //console.log(years_array);
    
    var filtered_data = main_data.filter(function(d) {

        for (let i = 0; i < ages_array.length; i++) {
            
            if (d.variable === ages_array[i]) {
                return true;
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
    console.log("Filtered Data");
    console.log(filtered_data);
    if (callback) callback(filtered_data);
}