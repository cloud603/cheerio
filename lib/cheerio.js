/*
  Module dependencies
*/

var path = require('path'),
    select = require('cheerio-select'),
    parse = require('./parse'),
    evaluate = parse.evaluate,
    _ = require('underscore');

/*
 * The API
 */

var api = ['attributes', 'traversing', 'manipulation', 'data', 'form', 'events'];



/**
 * Static Methods
 */

var $ = require('./static');

var isHtml = $.isHtml;
/*
 * Instance of cheerio
 */

var Cheerio = module.exports = function(selector, context, root) {
  if (!(this instanceof Cheerio)) return new Cheerio(selector, context, root);

  // $(), $(null), $(undefined), $(false)
  if (!selector) return this;

  if (root) {
    if (typeof root === 'string') root = parse(root);
    this._root = this.make(root, this);
  }

  // $($)
  if (selector.cheerio) return selector;

  // $(dom)
  if (selector.name || Array.isArray(selector))
    return this.make(selector, this);

  // $(<html>)
  if (typeof selector === 'string' && isHtml(selector)) {
    return this.make(parse(selector).children);
  }

  // If we don't have a context, maybe we have a root, from loading
  if (!context) {
    context = this._root;
  } else if (typeof context === 'string') {
    if (isHtml(context)) {
      // $('li', '<ul>...</ul>')
      context = parse(context);
      context = this.make(context, this);
    } else {
      // $('li', 'ul')
      selector = [context, selector].join(' ');
      context = this._root;
    }
  }

  // If we still don't have a context, return
  if (!context) return this;

  // #id, .class, tag
  return context.parent().find(selector);
};

/**
 * Inherit from `static`
 */

Cheerio.__proto__ = $;

/*
 * Set a signature of the object
 */

Cheerio.prototype.cheerio = '[cheerio object]';

/*
 * Cheerio default options
 */

Cheerio.prototype.options = {
  ignoreWhitespace: false,
  xmlMode: false,
  lowerCaseTags: false
};

/*
 * Make cheerio an array-like object
 */

Cheerio.prototype.length = 0;
//Cheerio.prototype.sort = [].splice;

_.each('forEach,reduce,push,sort,indexOf,concat'.split(','), function(name){
	Cheerio.prototype[name] = Array.prototype[name];
});


/*
 * Make a cheerio object
 */

Cheerio.prototype.make = function(dom, context) {
  if (dom.cheerio) return dom;
  dom = (Array.isArray(dom)) ? dom : [dom];
  return _.extend(context || new Cheerio(), dom, { length: dom.length });
};

Cheerio.prototype.appendTo = function(target){
	target = Cheerio(target);
	return target.append(this);
};

//insert self to target before
Cheerio.prototype.insertBefore = function(target){
	target = Cheerio(target);
	target.before(this);
	return this;
};

//append self to target
Cheerio.prototype.insertAfter = function(target){
	target = Cheerio(target);
	target.after(this);
	return this;
};

/*
Cheerio.prototype.map = function(fn){
	console.log("abc");
	return Cheerio($.map(this, function(el, i){ return fn.call(el, i, el) }))
};
*/

Cheerio.prototype.slice = function(){
	return Cheerio(slice.apply(this, arguments));
},

/**
 * Turn a cheerio object into an array
 */

Cheerio.prototype.toArray = function() {
  return [].slice.call(this, 0);
};

/**
 * Plug in the API
 */
api.forEach(function(mod) {
  _.extend(Cheerio.prototype, require('./api/' + mod));
});

Cheerio.fn = Cheerio.prototype;