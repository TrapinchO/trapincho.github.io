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

var reflector = {
    "A": "N", "N": "A",
    "B": "O", "O": "B",
    "C": "P", "P": "C",
    "D": "Q", "Q": "D",
    "E": "R", "R": "E",
    "F": "S", "S": "F",
    "G": "T", "T": "G",
    "H": "U", "U": "H",
    "I": "V", "V": "I",
    "J": "W", "W": "J",
    "K": "X", "X": "K",
    "L": "Y", "Y": "L",
    "M": "Z", "Z": "M",
};

var rotor_pos = [1, 1, 1];
var rotor_sel = [1, 2, 3];


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


    // set rotors to prevent error
    rotor_pos[0]--;
    rotor_pos[1]--;
    rotor_pos[2]--;

    character = rotors[rot1][(abc.indexOf(character) + rotor_pos[0]) % 26];
    character = rotors[rot2][(abc.indexOf(character) + rotor_pos[1]) % 26];
    character = rotors[rot3][(abc.indexOf(character) + rotor_pos[2]) % 26];

    // reflector
    character = reflector[character];

    var t = rotors[rot3].indexOf(character) - rotor_pos[2];
    if (t < 0) { t += 26; }
    character = abc[t];

    t = rotors[rot2].indexOf(character) - rotor_pos[1];
    if (t < 0) { t += 26; }
    character = abc[t];

    t = rotors[rot1].indexOf(character) - rotor_pos[0];
    if (t < 0) { t += 26; }
    character = abc[t];

    // restore rotor positions
    rotor_pos[0]++;
    rotor_pos[1]++;
    rotor_pos[2]++;

    // check if rotors should turn
    rotor_pos[0]++;
    document.getElementById('rotor_pos1').value = rotor_pos[0];
    if (rotor_pos[0] > 26) {
        rotor_pos[0] = 1;
        document.getElementById('rotor_pos1').value = rotor_pos[0];
        rotor_pos[1]++;
        document.getElementById('rotor_pos2').value = rotor_pos[1];

        if (rotor_pos[1] > 26) {
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