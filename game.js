import Queue from "queue.js";

class Game {
    constructor(width, height, previews) {
        this.width = width;
        this.height = height;
        this.queue = new Queue(previews);
        // Generate board of size width * height with initial values of 0.
        this.board = Array.from(Array(height), () => new Array(width).fill(0))
        // Access with this.board[y][x], positive x and y
    }

    clearRows(...lines) {
        // Searches for rows to clear and destroys them

        var to_destroy = [];
        
        // Set search range to specified rows. Otherwise set to whole matrix.
        if (lines.length == 0) {
            var search_range = [...Array(this.height).keys()];
        } else {
            var search_range = lines;
        }

        // Determine if rows are filled
        for (var i of search_range) {
            // clear the row if no empty cells
            if (!this.board[i].includes(0)) {
                to_destroy.push(i);
            }
        }

        // Destroy the filled rows
        this.destroy(...to_destroy);
    }

    destroy(...rows) {
        // Set given rows to delete-pending cells and then shift to the top of the matrix

        // Mark specified rows for deletion
        for (var i of rows) {
            this.board[i].fill(-1);
        }

        // Starting from the top of the matrix (end of array), loop through and "shift" pending rows to the top
        for (var i = this.height - 1; i >= 0; i--) {
            // if row contains all -1
            if (this.board[i].every(x => x == -1)) {
                // Delete row and add a new empty row at the top of the matrix
                this.board.splice(i, 1);
                this.board.push(new Array(this.width).fill(0));
            }
        }
    }

    insertCleanGarbage(amount) {
        // Inserts x amount of clean garbage to the bottom of the matrix, then deletes x rows from the top of the matrix
        
        // Determine random garbage hole position
        empty_index = getRandIntInclusive(0, this.width - 1);
        
        for (var i = 0; i < amount; i++) {
            let garbage_row = new Array(this.width).fill("garbage")
            // Add garbage hole
            garbage_row.splice(empty_index, 1, 0)
            // Add row to start (bottom) of matrix
            this.board.unshift(garbage_row);
            // Remove a row from the top of the matrix
            this.board.pop();
        }
    }

    reset() {
        // Clears the entire board
        for (var row of this.board) {
            row.fill(0);
        }
    }

}

function getRandIntInclusive(min, max) {
    // ceil and floor min and max
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
