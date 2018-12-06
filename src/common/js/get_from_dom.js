module.exports = function() {

    var first_year = "";
    var last_year = "";
    var stat_val = "";
    var age_string = "";

    var stat_element = document.getElementById("stat");

    //chicken and the egg.  if this has been called before custom control was created
    if (stat_element === null) {
        first_year = "1990";
        last_year = "1991";
        stat_val = "2";
    } else {

        var from_element = document.getElementById("selfrom");
        var to_element = document.getElementById("selto");

        first_year = parseInt(from_element.options[from_element.selectedIndex].value);
        last_year = parseInt(to_element.options[to_element.selectedIndex].value);
        stat_val = stat_element.options[stat_element.selectedIndex].value;
    }

    var yearset = "";

    for (let i = first_year; i <= last_year; i++) {
        if (i !== first_year) {
            yearset += ",";
        }
        yearset += i;
    }

    if (yearset === "") {
        yearset = String(first_year)
    }
    
    var agecontrol = document.getElementById("agegroups");
    var collection = agecontrol.selectedOptions;

    
    for (var i=0; i<collection.length; i++) {
         if (i !== 0) {
             age_string += ",";
         }
         age_string += collection[i].value;
    }
    
    if (age_string === "") {
        age_string = "1";
    }

    return [age_string, yearset, stat_val]

}