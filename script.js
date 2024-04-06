var board = document.getElementById("board");

var log = document.getElementById("log");

var x_turn = true;
var game_arr = [null, null, null, null, null, null, null, null, null]
var game_history = []
var game_end = false;

for (let i = 0; i < board.children.length; i++) {
    let el = board.children[i]
    el.onclick = function() {
        if (!el.classList.contains("cross") && !el.classList.contains("naught") && !game_end) {
            el.classList.add(x_turn ? "cross" : "naught");
            game_arr[i] = x_turn ? 'x' : 'o';
            game_history.push(i);
            
            let new_entry = document.createElement("div");
            new_entry.innerHTML = `Foi colocado um ${x_turn ? "X" : "O"} no quadrado ${i}`
            log.appendChild(new_entry);
    
            x_turn = !x_turn;
            who_won()

            if (!game_end) {
                if (game_history.length > 6) {
                    clear_tile(game_history.shift());
                }
                if (game_history.length == 6) {
                    for (let i = 0; i < 9; i++) {
                        board.children[i].classList.remove("fade")
                    }
                    board.children[game_history[0]].classList.add("fade")
                }
            }
        }
    }
}

function who_won() {
    // I could probably do something smarter, but I want to be done quick.
    // Let's check all the different win scenarios
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    for (let w = 0; w < wins.length; w++) {
        if (game_arr[wins[w][0]] != null && game_arr[wins[w][0]] == game_arr[wins[w][1]] && game_arr[wins[w][1]] == game_arr[wins[w][2]]) {
            let new_entry = document.createElement("div");
            new_entry.innerHTML = `${game_arr[wins[w][0]]} ganhou`
            log.appendChild(new_entry);
            board.children[wins[w][0]].style.backgroundColor = "white";
            board.children[wins[w][1]].style.backgroundColor = "white";
            board.children[wins[w][2]].style.backgroundColor = "white";

            game_end = true;
            return game_arr[wins[w][0]]; //return
        }
    }
    return null;
}

function clear_tile(c) {
    game_arr[c] = null
    board.children[c].classList.remove("naught");
    board.children[c].classList.remove("cross");
}
