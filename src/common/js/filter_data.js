module.exports = function(main_data, age_string, years_string, callback) {

    //create array from years_string
    var ages_array = age_string.split(",");
    var years_array = years_string.split(",");

    var filtered_data = main_data.filter(function(d) {

        for (let i = 0; i < ages_array.length; i++) {
            for (let i = 0; i < years_array.length; i++) {
                if ((d.age === parseInt(ages_array[i])) && (d.year === parseInt(years_array[i]))) {
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

    if (callback) callback(filtered_data);
}