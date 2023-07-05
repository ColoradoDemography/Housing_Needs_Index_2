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

    //for (let i = 0; i < 7; i++) {
    //    queriedYears += "<option style='color:" + ((main_data[i].datatype === "Estimate") ? "black" : "red") + "' value='" + main_data[i].year + "'>" + main_data[i].year + "</option>";
    //}

    command.onAdd = function() {
        var div = L.DomUtil.create('div', 'command bord');
        div.innerHTML = "Statistic:<br /><select id='stat'><option value='1'>Net Migrants</option><option value='2'>Migration Rate per 1,000</option></select><br />" +
            "<br /><span>Decade:</span>&nbsp;&nbsp;<select id='selfrom'>" + //queriedYears + "</select>&nbsp;&nbsp;&nbsp;<to>To:</to>&nbsp;&nbsp;<select id='selto'>" + queriedYears + 
            //"<option value='1950'>1950</option>" +
            //"<option value='1960'>1960</option>" +
            "<option value='1970'>1970s</option>" +
            "<option value='1980'>1980s</option>" +
            "<option value='1990'>1990s</option>" +
            "<option value='2000'>2000s</option>" +
            "<option value='2010' selected>2010s</option>" +
            "</select><br />" +
            "<br />Select Age Groups:<br /><select multiple size='15' id='agegroups'><option value='00_04' selected>0 to 4</option>" + 
                "<option value='05_09'>5 to 9</option>" +
                "<option value='10_14'>10 to 14</option>" +
                "<option value='15_19'>15 to 19</option>" +
                "<option value='20_24'>20 to 24</option>" +
                "<option value='25_29'>25 to 29</option>" +
                "<option value='30_34'>30 to 34</option>" +
                "<option value='35_39'>35 to 39</option>" +
                "<option value='40_44'>40 to 44</option>" +
                "<option value='45_49'>45 to 49</option>" +
                "<option value='50_54'>50 to 54</option>" +
                "<option value='55_59'>55 to 59</option>" +
                "<option value='60_64'>60 to 64</option>" +
                "<option value='65_69'>65 to 69</option>" +
                "<option value='70_74'>70 to 74</option>" +
                "<option value='75_79'>75 to 79</option>" +
            "</select><br />" +
            "<p>Data for older age groups is unavailable. <br>Data for Broomfield before 2000 and <br>Arapahoe 1970s is unavailable.</p>"+
            "<p>Source: Colorado State Demography Office and<br>"+
            "Applied Population Lab, Univ. of Wisconsin - Madison<br>"+
            "<a href=https://storage.googleapis.com/co-publicdata/Colorado_Age_Migration_By_Decade.csv>Download the data</a></p>";
            
            
        div.padding = "20px";
        return div;
    };
    command.addTo(map);


    document.getElementById("stat").addEventListener("change", function() {
        refreshdata(layer, main_data);
        //hide second year option if viewing single year
        var stat_element = document.getElementById("stat");
        //console.log(stat_element.options[stat_element.selectedIndex].value);
        /* if (stat_element.options[stat_element.selectedIndex].value === '1') {
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
        } */
        console.log(main_data);
    }, false);

    document.getElementById("selfrom").addEventListener("change", function() {
        refreshdata(layer, main_data);
        console.log(main_data);
        console.log("selfrom");
    }, false);

    /* document.getElementById("selto").addEventListener("change", function() {
        refreshdata(layer, main_data);
        //console.log(main_data);
    }, false); */
    
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
           // let g: any = document.querySelector('#selto [value="' + querystring.to + '"]');
            //g.selected = true;
            //console.log(querystring.stat);

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
            //let selto: any = document.getElementById("selto");
            console.log(stat_select);
            /* if (stat_select.options[stat_select.selectedIndex].text == 'Age Group Population'||stat_select.options[stat_select.selectedIndex].text == 'Age Group Percent'){
                title_h2.innerHTML = "Colorado, " + selfrom.value + ":&nbsp;&nbsp;" + stat_text + ":&nbsp;&nbsp;" + querystring.age;
            } else {
                title_h2.innerHTML = "Colorado, " + selfrom.value + " to " + selto.value + ":&nbsp;&nbsp;" + stat_text + ":&nbsp;&nbsp;" + querystring.age;
            } */
            
            refreshdata(layer, main_data);
        } else {
            let e: any = document.querySelector('#selfrom [value="2010"]');
            e.selected = true;
            refreshdata(layer, main_data);
    
            require("./add_stat_caption.js")(map);
        }

        $(document).ready(function(){
            $("#selfrom").change(function(){
          hideOption();
            
            })
            /* $("#agegroups").change(function(){
            hideOption();
            }) */
         })
         function hideOption(){
           var dec=$("#selfrom").val();
            //var subject=$("#agegroups").val();
            if(dec=="1970" || dec=="1980"){
             $("#agegroups [value='75_79']").hide();
            }
            else{
             $("#agegroups [value='75_79']").show();
            }
         }
    
}
