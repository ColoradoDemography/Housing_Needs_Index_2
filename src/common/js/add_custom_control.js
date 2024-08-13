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
        div.innerHTML = 
            //"Statistic:<br /><select id='stat'><option value='4'>Percent of Jobs</option><option value='3'>Total Jobs</option></select><br />" +
            "Select Variables: Hover over each for more info<br /><select multiple size='20' id='agegroups'>" +
                "<option value='EPLOU75Burd' selected title='Cost Burdened % of Owner Households Making Less Than $75,000'>Cost Burdened % of Owner Households Under 75K</option>" + 
                "<option value='EPLOU75XBurd' title='Extremely Cost Burdened % of Owner Households Making Less Than $75,000'>Extremely Cost Burdened % of Owner Households Under 75K</option>" +
                "<option value='EPLRU75Burd' title='Cost Burdened % of Renter Households Making Less Than $75,000'>Cost Burdened % of Renter Households Under 75K</option>" +
                "<option value='EPLRU75XBurd' title='Extremely Cost Burdened % of Renter Households Making Less Than $75,000'>Extremely Cost Burdened Renter Households Under 75K</option>" +
                "<option value='ALLBURDEN' title='Percent of Households that are 30% or more Cost Burdened'>Cost Burdened % of All Households</option>" +
                "<option value='TOTBURDI' title='Total Number of Households that are 30% or more Cost Burdened'>Total Cost Burdened Households</option>" +
                "<option value='COMMUTE' title='Median Commute Time by County'>Commute Time (county average)</option>" +
                "<option value='JOBHU' title='New Jobs to New Housing Units, 2019-2023 (the larger the number the fewer housing units built vs. new jobs)'>New Jobs to Housing Units Ratio</option>" +
                "<option value='PROPTAXCAP' title='Inverse Property Tax Per Capita (The larger the number, the lower the property tax per capita'>Inverse Property Tax Per Capita</option>" +
                "<option value='MEDHHINC' title='Inverse Median Household Income (The larger the number the lower the median household income'>Inverse Median Household Income</option>" +
                "<option value='CROWD' title='Households With More People Than Rooms (The larger the number the more crowded households as a percent of total households'>Crowded</option>" +
                "<option value='BPPERCAP' title='Inverse New Housing Units per Household Population (The higher the number the fewer new housing units per new household population'>Inverse New Housing Units per Household Population</option>" +
                "<option value='HHHU' title='Total Household Population to Housing Units (The larger the number the fewer total households per total household population'>Total Household Population to Housing Units</option>" +
                "<option value='HHPOP' title='Population Living in Households'>Household Population</option>" +
                "<option value='HHP2BP' title='Total Household Population to Building Permits Issued in the last 3 years'>Total Household Population to Building Permits Ratio</option>" +
                "<option value='OHFS2HHPI' title='OHFS Gap Funding Dollars Divided by Household Population'>OHFS Gap Funding Per Person</option>" +
            "</select>";
            //"<br /><button name='display' id='display' align='center'>Show Data</button>";
            
        div.padding = "20px";
        return div;
    };
    command.addTo(map);


    //document.getElementById("stat").addEventListener("change", function() {
        //refreshdata(layer, main_data);
        //hide second year option if viewing single year
        //var stat_element = document.getElementById("stat");
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
        /* console.log(main_data);
    }, false);

    document.getElementById("selfrom").addEventListener("change", function() {
        refreshdata(layer, main_data);
        console.log(main_data);
        console.log("selfrom");
    }, false); */

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
            //let e: any = document.querySelector('#selfrom [value="2010"]');
            //e.selected = true;
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
