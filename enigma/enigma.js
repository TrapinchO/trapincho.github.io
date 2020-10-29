//alert("WARNING: This page is a prototype. Functionality will be added later")

var abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";


var rotors = {
    1: "JCWHGUSEZIBDYFARQPTONMXLKV",
    2: "VRMCUEYXIFSBJZQWDGNKTHAPOL",
    3: "EBPAYJNIUKQTCHZFWORGVMSDXL",
    4: "APLVRMDZWBXCOHINQGKJYFTEUS",
    5: "IWBEXJFTUZDCAPLHKRYVMSNQOG",
    6: "QVOWGPINUFMEKBDCJLZXATSYRH"
    };

rotor_pos = [1, 1, 1]


function enigma(character) {
    //document.getElementById('rotor1').value = 2;
    // reset
    document.getElementById('output').innerHTML = "";
    var out = "";

    // get the variables
    // check if they are valid number
    // check if they are within 1-6
    // rotor selection
    var rot1 = parseInt(document.getElementById('rotor1').value);
    if (rot1 != 0 && !rot1) { out = out.concat("* Rotor 1: Please enter a valid number<br>"); }
    else if (rot1 < 1 || rot1 > 6) { out = out.concat("* Rotor 1: Please enter valid rotor<br>")}
    var rot2 = parseInt(document.getElementById('rotor2').value);
    if (rot2 != 0 && !rot2) { out = out.concat("* Rotor 2: Please enter a valid number<br>"); }
    else if (rot2 < 1 || rot2 > 6) { out = out.concat("* Rotor 2: Please enter valid rotor<br>")}
    var rot3 = parseInt(document.getElementById('rotor3').value);
    if (rot3 != 0 && !rot3) { out = out.concat("* Rotor 3: Please enter a valid number<br>"); }
    else if (rot3 < 1 || rot3 > 6) { out = out.concat("* Rotor 3: Please enter valid rotor<br>")}


    // rotor position
    rotor_pos[0] = parseInt(document.getElementById('rotor_pos1').value);
    if (!rotor_pos[0]) { out = out.concat("* Rotor position 1: Please enter a valid number<br>"); }
    else if (rotor_pos[0] < 1 || rotor_pos[0] > 26) { out = out.concat("* Rotor position 1: Please enter valid position<br>"); }

    rotor_pos[1] = parseInt(document.getElementById('rotor_pos2').value);
    if (!rotor_pos[1]) { out = out.concat("* Rotor position 2: Please enter a valid number<br>"); }
    else if (rotor_pos[1] < 1 || rotor_pos[1] > 26) { out = out.concat("* Rotor position 2: Please enter valid position<br>"); }

    rotor_pos[2] = parseInt(document.getElementById('rotor_pos3').value);
    if (!rotor_pos[2]) { out = out.concat("* Rotor position 3: Please enter a valid number<br>"); }
    else if (rotor_pos[2] < 1 || rotor_pos[2] > 26) { out = out.concat("* Rotor position 3: Please enter valid position<br>"); }

    if (out) {
        document.getElementById('output').innerHTML = "Error:<br>" + out;
        return;
    };


    rotor_pos[0]++;
    document.getElementById('rotor_pos1').value = rotor_pos[0];
    if (rotor_pos[0] > 26) {
        console.log("R1: " + rotor_pos[0]);
        rotor_pos[0] = 1;
        document.getElementById('rotor_pos1').value = rotor_pos[0];
        rotor_pos[1]++;
        document.getElementById('rotor_pos2').value = rotor_pos[1];

        if (rotor_pos[1] > 26) {
            console.log("R1: " + rotor_pos[1]);
            rotor_pos[1] = 1;
            document.getElementById('rotor_pos2').value = rotor_pos[1];
            rotor_pos[2]++;
            document.getElementById('rotor_pos3').value = rotor_pos[2];

            if (rotor_pos[2] > 26) {
                rotor_pos[2] = 1;
                document.getElementById('rotor_pos3').value = rotor_pos[2];
            }
        }
    }

    document.getElementById('output').innerHTML = character;
}