
//get the json from file text.json
var lore;

$.getJSON( "text.json", function( json ) {
    lore = json;
    //console.log( "JSON Data received: " + JSON.stringify(lore));
});

/*
// currently import does not work, so I put it here
lore = [
  {"name": "BakalDern", "source": "SE final", "info": "Bakal serves Dern", "tags":  ["Bakal", "Dern", "Discovery", "Final"]},
  {"name": "BakalGone", "source": "WP final", "info": "Bakal is gone", "tags":  ["Bakal", "Wynn", "Discovery", "Final"]},
  {"name": "OlmBuild", "source": "TV discovery", "info": "The Olm built Time Valley", "tags":  ["Olm", "Time Valley", "Discovery"]},
  {"name": "EyeInEO", "source": "SE final", "info": "They Eye is from Dern Beast", "tags":  ["Eye", "EO", "Discovery", "Final"]},
  {"name": "CorruptionOrigin", "source": "WynnExcavation Site D", "info": "Corruption is created by mix of Light and Dark.", "tags": ["Corruption", "Light", "Dern", "Influence"]},
  {"name": "CorruptionUndead", "source": "Poisoning the Pest", "info": "Corruption rises the undead", "tags": ["Corruption", "Undead"]},
  {"name": "FrumaRecruit", "source": "A Kings Recruit", "info": "Player is recruit from Fruma", "tags": ["Fruma"]}
]
*/

function getLS() {
    // get the table
    var table = document.getElementById("entries");

    // reset from previous searches
    document.getElementById('found').innerHTML = "";
    while (table.rows.length > 1) { table.deleteRow(1); }

    // search by name
    var search_name = document.getElementById('search_name').value;
    // search by tags
    var search_tags = document.getElementById('search_tags').value;

    // if all empty -> return
    if (!search_tags && !search_name) {
        console.log(search_name);
        document.getElementById('found').innerHTML = "Search boxes are empty";
        return;
    }
    // if name not empty -> search name
    // name search has higher priority
    else if (search_name) {
        for (info in lore) {
            if (!lore[info]["name"].localeCompare(search_name)) {
                // put it into table
                var rowCount = 1;
                var row = table.insertRow(rowCount);
                row.insertCell(0).innerHTML = lore[info]["name"];
                row.insertCell(1).innerHTML = lore[info]["source"];
                row.insertCell(2).innerHTML = lore[info]["info"];
                row.insertCell(3).innerHTML = lore[info]["tags"];
                return;
            }
        }
    }

    search_tags = search_tags.split(" "); // make it an array


    var ls = false; // check for entries

    for (info in lore) {
        info = lore[info]; // gets the entry - json

        for (tag in search_tags) {
            var found = true; // reset it
            tag = search_tags[tag]; // gets the tag - string

            // if not found break
            if (!info["tags"].includes(tag)) {
                found = false;
                break;
            }
        }
        // else add it to string
        if (found) {
            ls = true; // found entry
            var rowCount = table.rows.length;
            var row = table.insertRow(rowCount);
            row.insertCell(0).innerHTML = info["name"];
            row.insertCell(1).innerHTML = info["source"];
            row.insertCell(2).innerHTML = info["info"];
            row.insertCell(3).innerHTML = info["tags"];
        }
    }
    if (!ls) { document.getElementById('found').innerHTML = "No entries found"; }
}


function showAll() {
    // get table
    var table = document.getElementById("entries");

    // reset
    document.getElementById('found').innerHTML = "";
    while (table.rows.length > 1) { table.deleteRow(1); }

    // put info on table
    for (info in lore) {
        info = lore[info];
        var rowCount = table.rows.length;
        var row = table.insertRow(rowCount);
        row.insertCell(0).innerHTML = info["name"];
        row.insertCell(1).innerHTML = info["source"];
        row.insertCell(2).innerHTML = info["info"];
        row.insertCell(3).innerHTML = info["tags"];
    }
}