var board = document.getElementById("board");

var log = document.getElementById("log");

var x_turn = true;

for (let i = 0; i < board.children.length; i++) {
    let el = board.children[i]
    el.onclick = function() {
        el.classList.add(x_turn ? "cross" : "naught");
        x_turn = !x_turn;
    }
}