class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (node != null) {
			if (this.left == null) {
				this.left = node;
				node.parent = this;
			} else if (this.right == null) {
				this.right = node;
				node.parent = this;
			}
		}
	}

	removeChild(node) {
		if (node != null) {
			if (this.left == node) {
				this.left = null;
				node.parent = null;
			} else if (this.right == node) {
				this.right = null;
				node.parent = null;
			} else {
				throw new Error('passed node is not a child of this one');
			}
		}
	}

	remove() {
		if (this.parent != null) {
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if (this.parent != null) {
			var parent = this.parent;
			var left = this.left;
			var right = this.right;
			if (parent.left == this) {
				this.right = parent.right;
				if (this.right != null) {
					this.right.parent = this;
				}
				this.left = parent;
			} else if (parent.right == this) {
				this.left = parent.left;
				if (this.left != null) {
					this.left.parent = this;
				}
				this.right = parent;
			} else {
				// unreachable
				throw new Error('bad parent-child pair Oo');
			}
			parent.left = left;
			if (left != null) {
				left.parent = parent;
			}
			parent.right = right;
			if (right != null) {
				right.parent = parent;
			}
			this.parent = parent.parent;
			if (this.parent != null) {
				if (parent.parent.left == parent) {
					parent.parent.left = this;
				} else if (parent.parent.right == parent) {
					parent.parent.right = this;
				} else {
					// unreachable
					throw new Error('bad parent-gradparent pair Oo');
				}
			}
			parent.parent = this;
		}
	}
}

module.exports = Node;
