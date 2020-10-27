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
  {"source": "SE final", "info": "Bakak serves Dern", "tags":  ["Bakal", "Dern", "Discovery", "Final"]},
  {"source": "WP final", "info": "Bakak is gone", "tags":  ["Bakal", "Wynn", "Discovery", "Final"]},
  {"source": "TV discovery", "info": "THe Olm built Tv", "tags":  ["Olm", "Time_Valley", "Discovery"]},
  {"source": "SE final", "info": "They Eye is from Dern Beast", "tags":  ["Eye", "EO", "Discovery", "Final"]}
]


function getLS() {
    var search_name = document.getElementById('search_name').value

    // search by tags
    var search_tags = document.getElementById('search_tags').value // get tags
    console.log(search_tags);
    if (!search_tags) {
        // if empty return
        document.getElementById('found').innerHTML = "Tag search text box is empty";
        console.log("EMPTY");
        return;
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
        console.log("NOT FOUND");
        document.getElementById('found').innerHTML = "No entries found";
    }
    else { document.getElementById('found').innerHTML = "Entries:"+ls; }
}