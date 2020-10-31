//alert("WARNING: This page is not finished, however it works.")

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

var rotor_sel = [1, 2, 3]; // selected rotors
var rotor_pos = [1, 1, 1]; // rotor positions


function enigma(character) {
    //document.getElementById('rotor1').value = 2;
    // reset
    document.getElementById('output').innerHTML = "";
    var out = "";

    // get the variables
    // check if they are valid number
    // check if they are within 1-6
    // ---------- rotor selection ----------
    rotor_sel[0] = parseInt(document.getElementById('rotor1').value);
    if (rotor_sel[0] != 0 && !rotor_sel[0]) { out = out.concat("* Rotor 1: Please enter a valid number<br>"); }
    else if (rotor_sel[0] < 1 || rotor_sel[0] > 6) { out = out.concat("* Rotor 1: Please enter valid rotor<br>")}

    rotor_sel[1] = parseInt(document.getElementById('rotor2').value);
    if (rotor_sel[1] != 0 && !rotor_sel[1]) { out = out.concat("* Rotor 2: Please enter a valid number<br>"); }
    else if (rotor_sel[1] < 1 || rotor_sel[1] > 6) { out = out.concat("* Rotor 2: Please enter valid rotor<br>")}

    rotor_sel[2] = parseInt(document.getElementById('rotor3').value);
    if (rotor_sel[2] != 0 && !rotor_sel[2]) { out = out.concat("* Rotor 3: Please enter a valid number<br>"); }
    else if (rotor_sel[2] < 1 || rotor_sel[2] > 6) { out = out.concat("* Rotor 3: Please enter valid rotor<br>")}

    if (rotor_sel[0] == rotor_sel[1] == rotor_sel[2]) { out = out.concat("* All rotors are the same<br>"); }
    else if (rotor_sel[0] == rotor_sel[1]) { out = out.concat("* 1st and 2nd rotors are the same<br>"); }
    else if (rotor_sel[0] == rotor_sel[2]) { out = out.concat("* 1st and 3rd rotors are the same<br>"); }
    else if (rotor_sel[1] == rotor_sel[2]) { out = out.concat("* 2nd and 3rd rotors are the same<br>"); }


    // ---------- rotor position ----------
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

    var plugboard = document.getElementById("plugboard").value;
    console.log(plugboard);
    plugboard = plugboard.split(" ");


    // ---------- en/decrypt ----------
    var old_character = character;
    // set rotors to prevent error
    rotor_pos[0]--;
    rotor_pos[1]--;
    rotor_pos[2]--;

    // ----- 1st rotors -----
    character = rotors[rotor_sel[0]][(abc.indexOf(character) + rotor_pos[0]) % 26];
    character = rotors[rotor_sel[1]][(abc.indexOf(character) + rotor_pos[1]) % 26];
    character = rotors[rotor_sel[2]][(abc.indexOf(character) + rotor_pos[2]) % 26];

    // ----- reflector -----
    character = reflector[character];

    // ----- 2nd rotors -----
    var t = rotors[rotor_sel[2]].indexOf(character) - rotor_pos[2];
    if (t < 0) { t += 26; }
    character = abc[t];

    t = rotors[rotor_sel[1]].indexOf(character) - rotor_pos[1];
    if (t < 0) { t += 26; }
    character = abc[t];

    t = rotors[rotor_sel[0]].indexOf(character) - rotor_pos[0];
    if (t < 0) { t += 26; }
    character = abc[t];

    // restore rotor positions
    rotor_pos[0]++;
    rotor_pos[1]++;
    rotor_pos[2]++;


    // ---------- check if rotors should turn ----------
    // ----- 1st rotor -----
    rotor_pos[0]++;
    document.getElementById('rotor_pos1').value = rotor_pos[0];
    if (rotor_pos[0] > 26) {
        rotor_pos[0] = 1;
        document.getElementById('rotor_pos1').value = rotor_pos[0];
        rotor_pos[1]++;
        document.getElementById('rotor_pos2').value = rotor_pos[1];

        // ----- 2nd rotor -----
        if (rotor_pos[1] > 26) {
            rotor_pos[1] = 1;
            document.getElementById('rotor_pos2').value = rotor_pos[1];
            rotor_pos[2]++;
            document.getElementById('rotor_pos3').value = rotor_pos[2];

            // ----- 3rd rotor -----
            if (rotor_pos[2] > 26) {
                rotor_pos[2] = 1;
                document.getElementById('rotor_pos3').value = rotor_pos[2];
            }
        }
    }

    // ---------- display character ----------
    document.getElementById('output').innerHTML = old_character + " = " + character;
    return character;
}