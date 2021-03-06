//     cheerio.js
// The following code is heavily inspired by jQuery's $.fn.data()
var $ = require('../static')
	, util = require('../utils')
	, _ = require('underscore');

exports.data = function(name, value) {
	//get the value
	if(arguments.length === 1 && _.isString(name)){
		var cache = this.cache || {};
		return cache[name];
	};

	this.cache = this.cache || {};
	var hash = name;
	if(value !== undefined){
		hash = {};
		hash[name] = value;
	};

	_.extend(this.cache, hash);
	return this;
};

//remove data from the element node

exports.removeData = function(names){
	if(!this.cache) return this;
	if (_.isString(names)) names = names.split(/\s+/);
	var that = this;
	_.each(names, function(name, i){
		delete that.cache[name];
	});
	return this;
};