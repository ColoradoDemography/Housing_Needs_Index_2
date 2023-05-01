var refreshdata = require("./refresh_data.js");


module.exports = function(map: Object, layer: Object, worker_data: any) {
    'use strict';

    //Custom Layer Control
    var command: Object = L.control({
        position: 'topleft'
    });
    //var ages_data = worker_data[2];
    //var yrs_data = worker_data[1];

    var main_data = worker_data[0];

    //var queriedYears: string = "";

    //for (let i = 0; i < yrs_data.length; i++) {
    //    queriedYears += "<option style='color:" + ((yrs_data[i].datatype === "Estimate") ? "black" : "red") + "' value='" + yrs_data[i].year + "'>" + yrs_data[i].year + "</option>";
    //}

    command.onAdd = function() {
        var div = L.DomUtil.create('div', 'command bord');
        div.innerHTML = "Statistic:<br /><select id='stat'><option value='2'>Net Migrants</option><option value='1'>Migration Rate per 1,000</option></select><br />" +
            "<br /><span>From:</span>&nbsp;&nbsp;<select id='selfrom'>" + queriedYears + "</select>&nbsp;&nbsp;&nbsp;<to>To:</to>&nbsp;&nbsp;<select id='selto'>" + queriedYears + "</select><br />" +
            "<br />Select Age Groups:<br /><select multiple size='19' id='agegroups'><option value='0 to 4'>0 to 4</option>" + 
                "<option value='5 to 9'>5 to 9</option>" +
                "<option value='10 to 14'>10 to 14</option>" +
                "<option value='15 to 19'>15 to 19</option>" +
                "<option value='20 to 24'>20 to 24</option>" +
                "<option value='25 to 29'>25 to 29</option>" +
                "<option value='30 to 34'>30 to 34</option>" +
                "<option value='35 to 39'>35 to 39</option>" +
                "<option value='40 to 44'>40 to 44</option>" +
                "<option value='45 to 49'>45 to 49</option>" +
                "<option value='50 to 54'>50 to 54</option>" +
                "<option value='55 to 59'>55 to 59</option>" +
                "<option value='60 to 64'>60 to 64</option>" +
                "<option value='65 to 69'>65 to 69</option>" +
                "<option value='70 to 74'>70 to 74</option>" +
                //"<option value='75 to 79'>75 to 79</option>" +
                //"<option value='80 to 84'>80 to 84</option>" +
                //"<option value='85 to 89'>85 to 89</option>" +
                //"<option value='90 to 94'>90 to 94</option>" +
                //"<option value='95 and over'>95 and over</option>" +
            "</select>";
            //"<br /><button name='display' id='display' align='center'>Show Data</button>";
            
        div.padding = "20px";
        return div;
    };
    command.addTo(map);


    document.getElementById("stat").addEventListener("change", function() {
        refreshdata(layer, main_data);
        //hide second year option if viewing single year
        var stat_element = document.getElementById("stat");
        console.log(stat_element.options[stat_element.selectedIndex].value);
        if (stat_element.options[stat_element.selectedIndex].value === '1') {
            $("span:first").text("Year:");
            $("to:first").text("");
            $("#selto").hide();
            //selto_element.style.display = "none";
        } else if (stat_element.options[stat_element.selectedIndex].value === '2') {
            $("span:first").text("Year:");
            $("to:first").text("");
            $("#selto").hide();
            //selto_element.style.display = "none";
        } else {
            $("span:first").text("From:");
            $("to:first").text("To:");
            $("#selto").show();
            //selto_element.style.display = "block";
        }
        // //console.log(main_data);
    }, false);

    document.getElementById("selfrom").addEventListener("change", function() {
        refreshdata(layer, main_data);
        //console.log(main_data);
    }, false);

    document.getElementById("selto").addEventListener("change", function() {
        refreshdata(layer, main_data);
        //console.log(main_data);
    }, false);
    
    document.getElementById("agegroups").addEventListener("change", function() {
        refreshdata(layer, main_data);
        //console.log(main_data);
    }, false);
    


    var a: Object = document.getElementsByClassName('leaflet-control-container')[0];

    a.addEventListener('dblclick', function(event) {
        event = event || window.event // cross-browser event
        if (event.stopPropagation) {
            event.stopPropagation()
        } else {
            event.cancelBubble = true
        }
    });

    a.addEventListener('mousemove', function(event) {
        event = event || window.event // cross-browser event
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    });


    function getJsonFromUrl() {
        var query = location.search.substr(1);
        var result = {};
        query.split("&").forEach(function(part) {
            var item = part.split("=");
            result[item[0]] = decodeURIComponent(item[1]);
        });
        return result;
    }

    //intialize!
    var querystring = getJsonFromUrl();
    
    if ('print' in querystring && 'stat' in querystring && 'from' in querystring && 'to' in querystring && 'age' in querystring) {
    
            map.panTo(L.latLng(39.35, -104.3));
    
            let e: any = document.querySelector('#stat [value="' + querystring.stat + '"]');
            e.selected = true;
            let f: any = document.querySelector('#selfrom [value="' + querystring.from + '"]');
            f.selected = true;
            let g: any = document.querySelector('#selto [value="' + querystring.to + '"]');
            g.selected = true;
            console.log(querystring.stat);

            var ageselector = document.querySelectorAll('select#agegroups option');
            querystring.age.split(",").forEach(function(h){
                for (var k = 0; k < ageselector.length; k++){
                    if (h.indexOf(ageselector[k].value) != -1){
                        ageselector[k].setAttribute('selected', 'selected');
                    } 
                }
            });
            document.getElementsByClassName('command')[0].style.display = 'none';
            document.getElementsByClassName('leaflet-top leaflet-right')[0].style.display = 'none';
    
            let stat_select: any = document.getElementById('stat');
            let stat_text: any = stat_select.options[stat_select.selectedIndex].text;

            let title_h2 = document.querySelector('.title h2');
            let selfrom: any = document.getElementById("selfrom");
            let selto: any = document.getElementById("selto");
            console.log(stat_select);
            if (stat_select.options[stat_select.selectedIndex].text == 'Age Group Population'||stat_select.options[stat_select.selectedIndex].text == 'Age Group Percent'){
                title_h2.innerHTML = "Colorado, " + selfrom.value + ":&nbsp;&nbsp;" + stat_text + ":&nbsp;&nbsp;" + querystring.age;
            } else {
                title_h2.innerHTML = "Colorado, " + selfrom.value + " to " + selto.value + ":&nbsp;&nbsp;" + stat_text + ":&nbsp;&nbsp;" + querystring.age;
            }
            
            refreshdata(layer, main_data);
        } else {
            let e: any = document.querySelector('#selto [value="2010"]');
            e.selected = true;
            refreshdata(layer, main_data);
    
            require("./add_stat_caption.js")(map);
        }
    
}
