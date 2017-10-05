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
        let numNode = 0;
        let numPar = 0;
        let temp;
        if (node.parent) {
            if (node.priority > node.parent.priority) {
                numNode = this.parentNodes.indexOf(node);
                numPar = this.parentNodes.indexOf(node.parent);
                if ((numNode !== -1) && (numPar !== -1)) {
                    temp = this.parentNodes[numNode];
                    this.parentNodes[numNode] = this.parentNodes[numPar];
                    this.parentNodes[numPar] = temp;
                }
                if ((numNode !== -1) && (numPar === -1)) {
                    this.parentNodes[numNode] = node.parent;
                }
                if ((numNode === -1) && (numPar !== -1)) {
                    this.parentNodes[numPar] = node;
                }
                node.swapWithParent();
                this.shiftNodeUp(node);
            }
        } else {
            this.root = node;
        }
    }

    shiftNodeDown(node) {

    }
}

module.exports = MaxHeap;