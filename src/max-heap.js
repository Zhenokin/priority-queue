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
        this._size++;
    }

    pop() {
        if (this.root) {
            this._size--;
            const data = this.root.data;
            this.restoreRootFromLastInsertedNode(this.detachRoot());
            this.shiftNodeDown(this.root);
            return data;
        }

    }

    detachRoot() {
        let temp;
        let index;
        if (this.parentNodes.length) {
            temp = this.root
            this.root = null
            index = this.parentNodes.indexOf(temp);
            if (index !== -1) {
                this.parentNodes.shift();
            }
        }
        return temp;

    }

    restoreRootFromLastInsertedNode(detached) {
        if (this.parentNodes.length) {
            const node = this.parentNodes.pop();
            if (detached.left === node) {
                node.parent = null
                this.parentNodes.push(node);
            } else {
                if (detached.right === node) {
                    node.left = detached.left;
                    node.parent = null;
                    node.left.parent = node;
                    this.parentNodes.unshift(node);
                } else {
                    node.left = detached.left;
                    node.left.parent = node;
                    node.right = detached.right;
                    node.right.parent = node;
                    if (node.parent.left === node) {
                        node.parent.left = null;
                    } else {
                        node.parent.right = null;
                        this.parentNodes.push(node.parent);
                    }
                    node.parent = null;
                }
            }
            this.root = node;
        }
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
        this._size = 0;

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
        let numNode = 0;
        let numChild = 0;
        let maxPr;
        let temp;
        if (node) {
            if (node.left || node.right) {
                numNode = this.parentNodes.indexOf(node);
                if (node.left && node.right) {
                    if (node.left.priority >= node.right.priority) {
                        maxPr = node.left;
                    } else {
                        maxPr = node.right;
                    }
                } else {
                    if (node.left) {
                        maxPr = node.left;
                    }
                    if (node.right) {
                        maxPr = node.right;
                    }
                }
                if (maxPr.priority > node.priority) {
                    numChild = this.parentNodes.indexOf(maxPr);
                    if ((numNode !== -1) && (numChild !== -1)) {
                        temp = this.parentNodes[numNode];
                        this.parentNodes[numNode] = this.parentNodes[numChild];
                        this.parentNodes[numChild] = temp;
                    }
                    if ((numNode !== -1) && (numChild === -1)) {
                        this.parentNodes[numNode] = maxPr;
                    }
                    if ((numNode === -1) && (numChild !== -1)) {
                        this.parentNodes[numChild] = node;
                    }
                    if (!node.parent) {
                        this.root = maxPr;
                    }
                    maxPr.swapWithParent();
                    this.shiftNodeDown(node);
                }
            }
        }
    }
}

module.exports = MaxHeap;