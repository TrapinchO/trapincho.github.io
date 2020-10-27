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
  {"source": "TV discovery", "info": "THe Olm built Tv", "tags":  ["Olm", "Time Valley", "Discovery"]},
  {"source": "SE final", "info": "Bakak serves Dern", "tags":  ["Bakal", "Dern", "Discovery"]}
]


function getLS() {
    let search_tags = document.getElementById('tags').value
    console.log(search_tags);
    if (!search_tags) {console.log("EMPTY"); return;}
    search_tags = search_tags.split(" ");
    console.log(search_tags);


    var ls = "";
    let found = true;
    for (info in lore) {
        info = lore[info];

        for (tag in search_tags) {
            tag = search_tags[tag];

            if (!info["tags"].includes(tag)) {
                found = false;
                break;
            }
            if (found) {
                console.log("########## FOUND " + JSON.stringify(info));
                ls = ls.concat("<br>", JSON.stringify(info));
            }
        }
    }
    if (!ls) {console.log("NOT FOUND");}
    document.getElementById('found').innerHTML = ls;
}