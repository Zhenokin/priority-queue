const Node = require('./node');

class MaxHeap {
    constructor() {
        this.root = null;
        this.parentNodes = [];
        this._size = 0;
    }

    push(data, priority) {
        const node = new Node(data, priority);
        this.insertNode(node);
        this.shiftNodeUp(node);
    }

    pop() {

    }

    detachRoot() {

    }

    restoreRootFromLastInsertedNode(detached) {

    }

    size() {
        return this._size;

    }

    isEmpty() {
        if (!this._size) {
            return true;
        }
        return false;

    }

    clear() {
        this.root = null;
        this.parentNodes = [];

    }

    insertNode(node) {
        if (!this.root) {
            this.root = node;
            this.parentNodes.push(this.root);
        } else {
            this.parentNodes[0].appendChild(node);
            this.parentNodes.push(node);
            if (this.parentNodes[0].right) {
                this.parentNodes.shift();
            }
        }

    }

    shiftNodeUp(node) {

    }

    shiftNodeDown(node) {

    }
}

module.exports = MaxHeap;