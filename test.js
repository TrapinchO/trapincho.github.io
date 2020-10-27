// still in alpha phase
//alert("WARNING: This page is still under construction!");

//get the json from file text.json
var lore;

$.getJSON( "text.json", function( json ) {
    lore = json;
    //console.log( "JSON Data received: " + JSON.stringify(lore));
});

// currently import does not work, so I put it here
lore = [
  {"name": "BakalDern", "source": "SE final", "info": "Bakal serves Dern", "tags":  ["Bakal", "Dern", "Discovery", "Final"]},
  {"name": "BakalGone", "source": "WP final", "info": "Bakal is gone", "tags":  ["Bakal", "Wynn", "Discovery", "Final"]},
  {"name": "OlmBuild", "source": "TV discovery", "info": "The Olm built Time Valley", "tags":  ["Olm", "Time Valley", "Discovery"]},
  {"name": "EyeInEO", "source": "SE final", "info": "They Eye is from Dern Beast", "tags":  ["Eye", "EO", "Discovery", "Final"]}
]


function getLS() {
    // search by name
    var search_name = document.getElementById('search_name').value
    // search by tags
    var search_tags = document.getElementById('search_tags').value // get tags
    console.log(search_tags);
    // if all empty return
    if (!search_tags && !search_name) {
        document.getElementById('found').innerHTML = "Search boxes are empty";
        return;
    // if name not empty
    // name search has higher priority
    } else if (search_name) {
        for (info in lore) {
            if (!lore[info]["name"].localeCompare(search_name)) {
                console.log(search_name + "--" + lore[info]["name"]);
                document.getElementById('found').innerHTML = "Entry:<br>" + JSON.stringify(lore[info]);
                return;
            }
        }
    }

    search_tags = search_tags.split(" "); // make it an array
    console.log(search_tags);


    var ls = ""; // final string

    for (info in lore) {
        info = lore[info]; // gets the object

        for (tag in search_tags) {
            var found = true;
            tag = search_tags[tag]; // gets the tag - string

            // if not found break
            if (!info["tags"].includes(tag)) {
                found = false;
                break;
            }
            // else add it to string
        }
        if (found) {
            console.log("########## FOUND " + JSON.stringify(info));
            ls = ls.concat("<br>", JSON.stringify(info));
        }
    }
    if (!ls) {
        document.getElementById('found').innerHTML = "No entries found";
    }
    else { document.getElementById('found').innerHTML = "Entries:"+ls; }
}

function showAll() {
    var entries = "Entries:";
    for (info in lore) {
    entries = entries.concat("<br>" + JSON.stringify(lore[info]));
    }
    document.getElementById('found').innerHTML = entries;
}