//get the json from file text.json
var lore;

$.getJSON( "wynn_lore.json", function( json ) {
    lore = json;
    //console.log( "JSON Data received: " + JSON.stringify(lore));
});


function getLS() {
    // get the table
    const table = document.getElementById("entries");

    resetTables();

    // search by name
    const search_name = document.getElementById('search_name').value.toLowerCase();
    // search by tags
    let search_tags = document.getElementById('search_tags').value.toLowerCase();

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
        document.getElementById('found').innerHTML = "No entry named \"" + search_name + "\" was found, searching by tags";
    }

    search_tags = search_tags.split(" "); // make it an array

    let ls = false; // check for entries

    for (info in lore) {
        info = lore[info]; // gets the entry - json

        let found = true; // reset it
        for (tag in search_tags) {
            found = true; // reset it
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


function showAllEntries() {
    resetTables();

    // put info on table
    for (info in lore) {
        addToTable(lore[info]);
    }
}


function addToTable(info) {
    let table = document.getElementById("entries");

    let rowCount = table.rows.length;
    let row = table.insertRow(rowCount);
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


function resetTables() {
    // reset
    document.getElementById('found').innerHTML = "";
    // ----- reset -----
    // lore database
    let table = document.getElementById("entries");
    while (table.rows.length > 1) { table.deleteRow(1); }
    // tags
    table = document.getElementById("tag_table");
    while (table.rows.length > 0) { table.deleteRow(0); }
}


function allTags() {
    resetTables();

    // ----- get all unique tags -----
    let all_tags = new Set();
    for (info in lore) {
        for (_tag in lore[info]["tags"]) { all_tags.add(lore[info]["tags"][_tag]); }
    }
    // ----- create sorted array from the set -----
    all_tags = Array.from(all_tags).sort();

    // ----- create table with tags -----
    let table = document.getElementById("tag_table");
    // ----- go by rows -----
    for (let row_iter=0; row_iter <= Math.floor((all_tags.length)/10); row_iter++) {
        let row = table.insertRow(row_iter);

        // ----- go by columns -----
        for (let cell_iter=0; cell_iter < 10; cell_iter++) {
            if (!all_tags[(row_iter*10)+cell_iter]) { row.insertCell(cell_iter).innerHTML = ""; }
            else { row.insertCell(cell_iter).innerHTML = all_tags[(row_iter*10)+cell_iter]; }
        }
    }
}