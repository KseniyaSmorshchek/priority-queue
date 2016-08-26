const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = new Array();
		this._size = 0;
	}

	push(data, priority) {
		var node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
		this._size = this._size + 1;
	}

	pop() {
		var detached = this.detachRoot();
		if (detached == null) {
			return null;
		}
		var root = this.restoreRootFromLastInsertedNode(detached);
		if (root != null) {
			this.shiftNodeDown(root);
		}
		this._size = this._size - 1;
		return detached.data;
	}

	detachRoot() {
		var root = this.root;
		this.root = null
		// root can be only at front of parentNodes
		if (this.parentNodes[0] == root) {
			this.parentNodes.shift();
		}
		return root;
	}

	restoreRootFromLastInsertedNode(detached) {
		if (this.parentNodes.length == 0) {
			return null;
		}
		var last = this.parentNodes.pop();
		var parent = last.parent;
		var was = (parent != null && MaxHeap.isParentNode(parent)) || parent == detached;
		last.remove();
		this.root = last;
		if (detached.left != last) {
			last.appendChild(detached.left);
		}
		if (detached.right != last) {
			last.appendChild(detached.right);
		}
		if (!was && parent != null && MaxHeap.isParentNode(parent)) {
			this.parentNodes.unshift(parent);
		}
		if (MaxHeap.isParentNode(last)) {
			this.parentNodes.unshift(last);
		}
		return last;
	}

	size() {
		return this._size;
	}

	isEmpty() {
		return this._size == 0;
	}

	clear() {
		this.root = null;
		this.parentNodes = new Array();
		this._size = 0;
	}

	insertNode(node) {
		if (this.root == null) {
			this.root = node;
		} else {
			this.parentNodes[0].appendChild(node);
			if (!MaxHeap.isParentNode(this.parentNodes[0])) {
				this.parentNodes.shift();
			}
		}
		this.parentNodes.push(node);
	}

	shiftNodeUp(node) {
		var parent = node.parent;
		if (parent != null) {
			if (parent.priority < node.priority) {
				var fst = -1;
				var snd = -1;
				if (MaxHeap.isParentNode(node)) {
					fst = this.parentNodes.indexOf(node);
					if (MaxHeap.isParentNode(parent)) {
						snd = this.parentNodes.indexOf(parent);
					}
				}
				if (fst != -1) {
					this.parentNodes[fst] = parent;
					if (snd != -1) {
						this.parentNodes[snd] = node;
					}
				}

				if (parent == this.root) {
					this.root = node;
				}
				node.swapWithParent();
				this.shiftNodeUp(node);
			}
		}
	}

	shiftNodeDown(node) {
		var child = node.left;
		if (node.right != null && child.priority < node.right.priority) {
			child = node.right;
		}
		if (child != null && child.priority > node.priority) {
			var fst = -1;
			var snd = -1;
			if (MaxHeap.isParentNode(child)) {
				fst = this.parentNodes.indexOf(child);
				if (MaxHeap.isParentNode(node)) {
					snd = this.parentNodes.indexOf(node);
				}
			}
			if (fst != -1) {
				this.parentNodes[fst] = node;
				if (snd != -1) {
					this.parentNodes[snd] = child;
				}
			}

			if (node == this.root) {
				this.root = child;
			}
			child.swapWithParent();
			this.shiftNodeDown(node);
		}
	}

	static isParentNode(node) {
		return node.left == null || node.right == null;
	}
}

module.exports = MaxHeap;
