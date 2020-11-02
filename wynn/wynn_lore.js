//get the json from file text.json
var lore;

$.getJSON( "wynn_lore.json", function( json ) {
    lore = json;
    //console.log( "JSON Data received: " + JSON.stringify(lore));
});


function getLS() {
    // get the table
    var table = document.getElementById("entries");

    // reset from previous searches
    document.getElementById('found').innerHTML = "";
    while (table.rows.length > 1) { table.deleteRow(1); }

    // search by name
    var search_name = document.getElementById('search_name').value.toLowerCase();
    // search by tags
    var search_tags = document.getElementById('search_tags').value.toLowerCase();

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
                addToTable(lore[info]);
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
            addToTable(info);
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
        addToTable(lore[info]);
    }
}

function addToTable(info) {
    var table = document.getElementById("entries");

    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    row.insertCell(0).innerHTML = info["name"];
    row.insertCell(1).innerHTML = info["source"];
    row.insertCell(2).innerHTML = info["coords"];
    row.insertCell(3).innerHTML = info["info"];
    row.insertCell(4).innerHTML = info["tags"].join("<br>");
    row.insertCell(5).innerHTML = '<img src="' + "wynn_images/"
        + info["name"].replaceAll(" ", "_")
        + '.png" style="width:160px;height:90px;">';
    return;
}

function allTags() {
    var all_tags = new Set();
    for (info in lore) {
        for (_tag in lore[info]["tags"]) {
            all_tags.add(lore[info]["tags"][_tag]);
        }
    }
    console.log(all_tags);
    var all_tags_str = "";
    all_tags = Array.from(all_tags)
    for (_tag of all_tags.sort()) {
        all_tags_str = all_tags_str.concat(_tag) + "<br>";
    }
    document.getElementById('found').innerHTML = all_tags_str;
}