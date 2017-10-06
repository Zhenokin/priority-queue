class Node {
    constructor(data, priority) {
        this.data = data;
        this.priority = priority || 0;
        this.parent = null;
        this.left = null;
        this.right = null;
    }

    appendChild(node) {
        if (this.left && !this.right) {
            this.right = node;
            this.right.parent = this;
        }
        if (!this.left) {
            this.left = node;
            this.left.parent = this;
        }

    }

    removeChild(node) {
        if (this.left == node) {
            this.left.parent = null
            this.left = null;
        } else {
            if (this.right == node) {
                this.right.parent = null;
                this.right = null;
            } else {
                throw new Error("there isnt a child");
            }
        }
    }

    remove() {
        if (this.parent) {
            this.parent.removeChild(this);
        }
    }

    swapWithParent() {
        let temp;
        if (this.parent) {
            //left and tight from thisChild
            if (this.left) {
                this.left.parent = this.parent;
            }
            if (this.right) {
                this.right.parent = this.parent;
            }
            if (this.parent.left == this) {
                //right fron Parent
                if (this.parent.right) {
                    this.parent.right.parent = this;
                }
                //left
                temp = this.left;
                this.left = this.parent;
                this.parent.left = temp;
                //right
                temp = this.right;
                this.right = this.parent.right;
                this.parent.right = temp;
            } else {
                //left fron Parent
                if (this.parent.left) {
                    this.parent.left.parent = this;
                }
                //left
                temp = this.left;
                this.left = this.parent.left;
                this.parent.left = temp;
                //right
                temp = this.right;
                this.right = this.parent;
                this.parent.right = temp;
            }
            if (this.parent.parent) {
                if (this.parent == this.parent.parent.left) {
                    //parent
                    this.parent.parent.left = this;
                } else {
                    //parent
                    this.parent.parent.right = this;
                }
            }
            temp = this.parent.parent;
            this.parent.parent = this;
            this.parent = temp;
        }
    }
}

module.exports = Node;