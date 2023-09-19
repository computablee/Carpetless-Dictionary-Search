function search() {
    let position = document.getElementById("pos").value;
    let frame = document.getElementById("frame").value;
    let stick = document.getElementById("stick").value;
    let selected = document.getElementById("zvalue").checked
    console.log(position, frame, stick, selected);

    let file = selected ? "./dictionary-z.txt" : "./dictionary.txt";

    fetch(file)
        .then(response => response.text())
        .then(matches => {
            if (frame !== "any") {
                let frameregex;
                if (frame == 1 && selected) {
                    frameregex = /^.*JONESZ_[^B].*$/gm;
                } else if (frame == 1 && !selected) {
                    frameregex = /^.*JONES_[^B].*$/gm;
                } else {
                    frameregex = new RegExp("^.*[^B]" + "B".repeat(Number(frame - 1)) + "[^B].*$", "gm");
                }
                matches = matches.match(frameregex)
                if (matches === null) {
                    matches = ["No setup found."];
                }
                matches = matches.join("\n");
            }

            if (stick !== "any") {
                let stickregex = new RegExp("^.*__" + stick + "_.*$", "gm");
                matches = matches.match(stickregex);
                if (matches === null) {
                    matches = ["No setup found."];
                }
                matches = matches.join("\n");
            }

            if (position !== "any") {
                let posregex = new RegExp("^.*_" + position + ".*$", "gm");
                matches = matches.match(posregex);
                if (matches === null) {
                    matches = ["No setup found."];
                }
                matches = matches.join("\n");
            }

            document.getElementById("setups").innerHTML = matches;
            document.getElementById("setups").rows = matches.split("\n").length
        })
        .catch(() => {
            document.getElementById("setups").innerHTML = "Something went wrong :(";
            document.getElementById("setups").rows = 1;
        })
}