class Piece {
    constructor() {
        this.state = 0;
        this.position = [0, 0]; // The piece's bounding box 0,0 position on the game board.
    }

    rotateCW() {
        // Rotate the piece clockwise once
        this.state = (this.state + 1) % 4;
    }

    rotateCCW() {
        // Rotate the piece counter-clockwise once
        this.state = (this.state + 3) % 4;
    }

}
