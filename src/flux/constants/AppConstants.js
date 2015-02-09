var prefixUrl = '';
var test = '';
module.exports = {
	setUrlPrefix: function(x) {
		prefixUrl = x;
	},
	getUrlPrefix: function() {
		return prefixUrl;
	},
	setTest: function(x) {
		test = x;
	},
	getTest: function() {
		return test;
	}
};