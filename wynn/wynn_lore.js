//get the json from file text.json
var lore;

$.getJSON( "wynn_lore.json", function( json ) {
    lore = json;
    //console.log( "JSON Data received: " + JSON.stringify(lore));
});

/**
* Function for page initialisation
*/
function init() {
    console.log('Page loaded on version 1.9.2');
    resetPage();
}

/**
* Search for entries
*/
function searchEntries() {
    // get the table
    const table = document.getElementById("entries");

    resetPage();

    // search by id
    const search_id = parseInt(document.getElementById('search_id').value.toLowerCase());
    if (search_id < 1) {
        document.getElementById('found').innerHTML = "Id cannot be lower than 1";
        return;
    }
    else if (search_id > lore.length-1) {
        document.getElementById('found').innerHTML = "Id cannot be higher than " + lore.length-1;
        return;
    }
    // search by name
    const search_name = document.getElementById('search_name').value.toLowerCase();
    // search by tags
    const search_tags = document.getElementById('search_tags').value.toLowerCase();

    // if id field is not empty
    // id search has the highest priority
    if (search_id) {
        showEntryById(search_id)
    }
    // if name not empty -> search name
    // name search has higher priority
    else if (search_name) {
        showEntryByName(search_name)
    }
    // if tag not empty -> search tag
    // name search has lowest priority
    else if (search_tags) {
        showEntryByTags(search_tags) // search by tags
    }
    // search boxes are empty
    else {
        document.getElementById('found').innerHTML = "Search boxes are empty";
    }
}

function showEntryById(search_id) {
    addHeaderLine();
    addRowToTable(lore[search_id-1]);
}

/**
* Show entry with given name
*/
function showEntryByName(search_name) {
    for (info of lore) {
        const lore_name = info["name"].toLowerCase();
        if (!lore_name.localeCompare(search_name)) {
           // put it into table
           addHeaderLine();
           addRowToTable(info);
            return;
        }
    }
    document.getElementById('found').innerHTML = "No entry named \"" + search_name + "\" was found";
}

/**
* List all entries with given tags
*/
function showEntryByTags(search_tags) {
    addHeaderLine();

    search_tags = search_tags.split(","); // make it an array

    let anyEntry = false; // check for entries
    for (info of lore) { // iterates over entry list

        let found = true; // reset it
        for (tag of search_tags) {
            tag = tag.trim(); // gets the tag - string
            found = true; // reset it

            if (!tag) { continue; }

            // if not found break
            if (!info["tags"].includes(tag)) {
                found = false;
                break;
            }
        }
        // else add it to string
        if (found) {
            anyEntry = true; // found entry
            addRowToTable(info);
        }
    }
    if (!anyEntry) { // if no entries were found
        resetPage();
        document.getElementById('found').innerHTML = "No entries found";
    }
}

/**
* Show all entries
*/
function showAllEntries() {
    resetPage();
    addHeaderLine();

    // put info on table
    for (info of lore) {
        addRowToTable(info);
    }
}


/**
* Show all tags
*/
function showAllTags() {
    resetPage();

    // ----- get all unique tags -----
    let all_tags = new Set();
    for (info of lore) {
        for (_tag in info["tags"]) { all_tags.add(info["tags"][_tag]); }
    }
    // ----- create sorted array from the set -----
    all_tags = Array.from(all_tags).sort();

    // ----- create table with tags -----
    let table = document.getElementById("tag_table");
    table.border = 3;
    // ----- go by rows -----
    for (let row_iter=0; row_iter <= Math.floor((all_tags.length)/10); row_iter++) {  // TODO: mess
        let row = table.insertRow(row_iter);

        // ----- go by columns -----
        for (let cell_iter=0; cell_iter < 10; cell_iter++) {
            if (!all_tags[(row_iter*10)+cell_iter]) { row.insertCell(cell_iter).innerHTML = ""; }
            else { row.insertCell(cell_iter).innerHTML = all_tags[(row_iter*10)+cell_iter]; }
        }
    }
}


/**
* Add header line to the table
*/
function addHeaderLine() {
    let table = document.getElementById("entries");
    table.border = 3;

    let row = table.insertRow(0);
    row.insertCell(0).innerHTML = "<b>ID</b>";
    row.insertCell(1).innerHTML = "<b>Name</b>";
    row.insertCell(2).innerHTML = "<b>Source</b>";
    row.insertCell(3).innerHTML = "<b>Coords</b>";
    row.insertCell(4).innerHTML = "<b>Info</b>";
    row.insertCell(5).innerHTML = "<b>Tags</b>";
    row.insertCell(6).innerHTML = "<b>Images</b>";
}


/**
* Add a row to table
*/
function addRowToTable(info) {
    let table = document.getElementById("entries");

    let rowCount = table.rows.length;
    let row = table.insertRow(rowCount);
    row.insertCell(0).innerHTML = lore.indexOf(info)+1;
    row.insertCell(1).innerHTML = info["name"];
    row.insertCell(2).innerHTML = info["source"];
    row.insertCell(3).innerHTML = info["coords"];
    row.insertCell(4).innerHTML = info["info"];
    row.insertCell(5).innerHTML = info["tags"].join(",<br>");
    let img_name = 'wynn_images/' + info["name"].replaceAll(" ", "_").toLowerCase() + '.png'; // so I can save some code
    row.insertCell(6).innerHTML = '<img src="' + img_name + '"'
        + ' style="width:160px;height:90px;"'
        + ' onclick="window.open(\'' + img_name + '\')">';
}


/**
* Resets the tables and text below the guide
*/
function resetPage() {
    // reset
    document.getElementById('found').innerHTML = "";
    // ----- reset -----
    // lore table
    let table = document.getElementById("entries");
    table.border = 0;
    while (table.rows.length > 0) { table.deleteRow(0); }
    // tags table
    table = document.getElementById("tag_table");
    table.border = 0;
    while (table.rows.length > 0) { table.deleteRow(0); }
}
