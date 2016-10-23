
'use strict';

// utils
Array.prototype.unique = Array.prototype.unique || function() {
	'use strict';

	var u = {}, a = [];
	for(var i = 0, l = this.length; i < l; ++i) {
		if(u.hasOwnProperty(this[i])) {
			continue;
		}
		a.push(this[i]);
		u[this[i]] = 1;
	}
	return a;
};

Array.prototype.intersect = Array.prototype.intersect || function(array) {
	var ai = 0;
	var bi = 0;
	var result = [];

	while( ai < this.length && bi < array.length ) {
		if (this[ai] < array[bi] ){
			ai++;
		} else if (this[ai] > array[bi] ){
			bi++;
		} else  {
			result.push(this[ai]);
			ai++;
			bi++;
		}
	}
	return result;
};
