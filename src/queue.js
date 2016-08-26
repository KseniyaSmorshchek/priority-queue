const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		if (maxSize === undefined) {
			this.maxSize = 30; // default value
		} else {
			this.maxSize = maxSize;
		}
		this.heap = new MaxHeap();
	}

	push(data, priority) {
		if (this.heap.size() >= this.maxSize) {
			throw new Error('queue is full');
		}
		this.heap.push(data, priority);
	}

	shift() {
		if (this.heap.isEmpty()) {
			throw new Error('queue is empty');
		}
		return this.heap.pop();
	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		return this.heap.isEmpty();
	}
}

module.exports = PriorityQueue;
