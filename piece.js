export default class Piece {
    constructor() {
        this.type; // The piece type (T, I, S, Z, J, L, O)
        this.state = 0;
        this.position = [0, 0]; // The piece's bounding box 0,0 position on the game board.

        // Fetch piece rotation kick table
        fetch("srs.json")
            .then(response => response.json())
            .then(data => this.table = data);

    }

    rotateCW() {
        // Rotate the piece clockwise once
        this.state = (this.state + 1) % 4;
    }

    rotateCCW() {
        // Rotate the piece counter-clockwise once
        this.state = (this.state + 3) % 4;
    }

    morph(piece) {
        // Changes the active piece type
        this.type = piece;
    }

    reset() {
        // Reset piece state and position
        this.state = 0;
        this.position = [0, 0];
    }

}
