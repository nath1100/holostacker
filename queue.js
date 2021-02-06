import {getRandIntInclusive} from "./tools";

export default class Queue {

    /*
    Queue contains 2 bags worth of pieces.
    New bags are generated when only one bag of pieces
    remains left in the queue.
    */

    constructor(previews=5) {
        this.previews = previews;
        this.selection = ["I", "J", "L", "S", "Z", "T", "O"]
        this.queue = [];
    }

    populate() {
        // Adds one randomised bag to the queue

        if (this.queue.length <= 7) {

            let bag = [];
            // Create a selection from the available bag of pieces
            let choosable = this.selection.slice();
            while (choosable.length > 0) {
                // Randomly remove a piece from choosable and add it to the bag
                bag.push(choosable.splice(getRandIntInclusive(0, choosable.length - 1), 1)[0]);
            }
            
            // Add the contents of bag to the end of the queue.
            this.queue.push(...bag);

            // Populate again in case queue still doesn't meet min size requirements.
            this.populate();
        }
    }

    next() {
        // Removes the next piece in queue (piece at the start of the queue).
        let next_piece = this.queue.shift();
        // Populate queue again if it drops below min size requirements.
        this.populate();
        return next_piece;
    }

}
