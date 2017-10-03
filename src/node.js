class Node {
    constructor(data, priority) {
        this.data = data;
        this.priority = priority;
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
            //left
            temp = this.left;
            this.left = this.parent;
            this.parent.left = temp;
            //right
            temp = this.right;
            this.right = this.parent.right;
            this.parent.right = temp;
            /*  //parent
              temp = this.parent.parent;
              this.parent.parent = this.parent;
              this.parent = temp;*/



        }
    }
}

module.exports = Node;