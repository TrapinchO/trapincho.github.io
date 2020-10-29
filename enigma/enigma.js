alert("WARNING: This page is a prototype. Functionality will be added later")

var abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";


var rotors = {
    1: "JCWHGUSEZIBDYFARQPTONMXLKV",
    2: "VRMCUEYXIFSBJZQWDGNKTHAPOL",
    3: "EBPAYJNIUKQTCHZFWORGVMSDXL",
    4: "APLVRMDZWBXCOHINQGKJYFTEUS",
    5: "IWBEXJFTUZDCAPLHKRYVMSNQOG",
    6: "QVOWGPINUFMEKBDCJLZXATSYRH"
    };

rotor_pos = {
    1: 1,
    2: 1,
    3: 1
}


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
    var rot_pos1 = parseInt(document.getElementById('rotor_pos1').value);
    if (!rot_pos1) { out = out.concat("* Rotor position 1: Please enter a valid number<br>"); }
    else if (rot_pos1 < 1 || rot_pos1 > 26) { out = out.concat("* Rotor position 1: Please enter valid position<br>"); }
    var rot_pos2 = parseInt(document.getElementById('rotor_pos2').value);
    if (!rot_pos2) { out = out.concat("* Rotor position 2: Please enter a valid number<br>"); }
    else if (rot_pos2 < 1 || rot_pos2 > 26) { out = out.concat("* Rotor position 2: Please enter valid position<br>"); }
    var rot_pos3 = parseInt(document.getElementById('rotor_pos3').value);
    if (!rot_pos3) { out = out.concat("* Rotor position 3: Please enter a valid number<br>"); }
    else if (rot_pos3 < 1 || rot_pos2 > 26) { out = out.concat("* Rotor position 3: Please enter valid position<br>"); }

    if (out) {
        document.getElementById('output').innerHTML = "Error:<br>" + out;
        return;
    };
    document.getElementById('output').innerHTML = character;
}