var expect = require('expect.js'),
	$ = require('../'),
	Cheerio = require('../lib/cheerio'),
	utils = require('../lib/utils'),
	_ = require('underscore'),
	fruits = require('./fixtures').fruits;

describe('$(...)', function() {

	describe('.append', function() {

		it('() : should do nothing', function() {
			expect($('#fruits', fruits).append()[0].name).to.equal('ul');
		});

		it('(html) : should add element as last child', function() {
			var $fruits = $(fruits);
			$('#fruits', $fruits).append('<li class="plum">Plum</li>');
			expect($('#fruits', $fruits).children(3).hasClass('plum')).to.be.ok();
		});

		it('($(...)) : should add element as last child', function() {
			var $fruits = $(fruits);
			var $plum = $('<li class="plum">Plum</li>');
			$('#fruits', $fruits).append($plum);
			expect($('#fruits', $fruits).children(3).hasClass('plum')).to.be.ok();
		});

		it('($(...), html) : should add multiple elements as last children', function() {
			var $fruits = $(fruits);
			var $plum = $('<li class="plum">Plum</li>');
			var grape = '<li class="grape">Grape</li>';
			$('#fruits', $fruits).append($plum, grape);
			expect($('#fruits', $fruits).children(3).hasClass('plum')).to.be.ok();
			expect($('#fruits', $fruits).children(4).hasClass('grape')).to.be.ok();
		});

		it('(fn) : should add returned element as last child');

		it('should maintain correct object state (Issue: #10)', function() {
			var $obj = $('<div></div>')
				.append('<div><div></div></div>')
				.children()
				.children()
				.parent();
			expect($obj).to.be.ok();
		});

	});

	describe('.prepend', function() {

		it('() : should do nothing', function() {
			expect($('#fruits', fruits).prepend()[0].name).to.equal('ul');
		});

		it('(html) : should add element as first child', function() {
			var $fruits = $(fruits);
			$('#fruits', $fruits).prepend('<li class="plum">Plum</li>');
			expect($('#fruits', $fruits).children(0).hasClass('plum')).to.be.ok();
		});

		it('($(...)) : should add element as first child', function() {
			var $fruits = $(fruits);
			var $plum = $('<li class="plum">Plum</li>');
			$('#fruits', $fruits).prepend($plum);
			expect($('#fruits', $fruits).children(0).hasClass('plum')).to.be.ok();
		});

		it('(html, $(...), html) : should add multiple elements as first children', function() {
			var $fruits = $(fruits);
			var $plum = $('<li class="plum">Plum</li>');
			var grape = '<li class="grape">Grape</li>';
			$('#fruits', $fruits).prepend($plum, grape);
			expect($('#fruits', $fruits).children(0).hasClass('plum')).to.be.ok();
			expect($('#fruits', $fruits).children(1).hasClass('grape')).to.be.ok();
		});

		it('(fn) : should add returned element as first child');

	});

	describe('.after', function() {

		it('() : should do nothing', function() {
			expect($('#fruits', fruits).after()[0].name).to.equal('ul');
		});

		it('(html) : should add element as next sibling', function() {
			var $fruits = $(fruits);
			var grape = '<li class="grape">Grape</li>';
			$('.apple', $fruits).after(grape);
			expect($('.apple', $fruits).next().hasClass('grape')).to.be.ok();
		});

		it('($(...)) : should add element as next sibling', function() {
			var $fruits = $(fruits);
			var $plum = $('<li class="plum">Plum</li>');
			$('.apple', $fruits).after($plum);
			expect($('.apple', $fruits).next().hasClass('plum')).to.be.ok();
		});

		it('($(...), html) : should add multiple elements as next siblings', function() {
			var $fruits = $(fruits);
			var $plum = $('<li class="plum">Plum</li>');
			var grape = '<li class="grape">Grape</li>';
			$('.apple', $fruits).after($plum, grape);
			expect($('.apple', $fruits).next().hasClass('plum')).to.be.ok();
			expect($('.plum', $fruits).next().hasClass('grape')).to.be.ok();
		});

		it('(fn) : should add returned element as next sibling');

	});

	describe('.before', function() {

		it('() : should do nothing', function() {
			expect($('#fruits', fruits).before()[0].name).to.equal('ul');
		});

		it('(html) : should add element as previous sibling', function() {
			var $fruits = $(fruits);
			var grape = '<li class="grape">Grape</li>';
			$('.apple', $fruits).before(grape);
			expect($('.apple', $fruits).prev().hasClass('grape')).to.be.ok();
		});

		it('($(...)) : should add element as previous sibling', function() {
			var $fruits = $(fruits);
			var $plum = $('<li class="plum">Plum</li>');
			$('.apple', $fruits).before($plum);
			expect($('.apple', $fruits).prev().hasClass('plum')).to.be.ok();
		});

		it('($(...), html) : should add multiple elements as previous siblings', function() {
			var $fruits = $(fruits);
			var $plum = $('<li class="plum">Plum</li>');
			var grape = '<li class="grape">Grape</li>';
			$('.apple', $fruits).before($plum, grape);
			expect($('.apple', $fruits).prev().hasClass('grape')).to.be.ok();
			expect($('.grape', $fruits).prev().hasClass('plum')).to.be.ok();
		});

		it('(fn) : should add returned element as previous sibling');

	});

	describe('.remove', function() {

		it('() : should remove selected elements', function() {
			var $fruits = $(fruits);
			$('.apple', $fruits).remove();
			expect($fruits.find('.apple')).to.have.length(0);
		});

		it('(selector) : should remove matching selected elements', function() {
			var $fruits = $(fruits);
			$('li', $fruits).remove('.apple');
			expect($fruits.find('.apple')).to.have.length(0);
		});

	});

	describe('.replaceWith', function() {

		it('(elem) : should replace one <li> tag with another', function() {
			var $fruits = $(fruits);
			var $plum = $('<li class="plum">Plum</li>');
			$('.pear', $fruits).replaceWith($plum);
			expect($('.orange', $fruits).next().hasClass('plum')).to.be.ok();
			expect($('.orange', $fruits).next().html()).to.equal('Plum');
		});

		it('(elem) : should replace the selected element with given element', function() {
			var $src = $('<ul></ul>');
			var $elem = $('<h2>hi <span>there</span></h2>');
			var $replaced = $src.replaceWith($elem);
			expect($replaced[0].parent.type).to.equal('root');
			expect($.html($replaced[0].parent)).to.equal('<h2>hi <span>there</span></h2>');
			expect($.html($replaced)).to.equal('<ul></ul>');
		});

		it('(elem) : should replace the single selected element with given element', function() {
			var $src = $('<br/>');
			var $elem = $('<h2>hi <span>there</span></h2>');
			var $replaced = $src.replaceWith($elem);
			expect($replaced[0].parent.type).to.equal('root');
			expect($.html($replaced[0].parent)).to.equal('<h2>hi <span>there</span></h2>');
			expect($.html($replaced)).to.equal('<br>');
		});

		it('(str) : should accept strings', function() {
			var $src = $('<br/>');
			var $replaced = $src.replaceWith('<h2>hi <span>there</span></h2>');
			expect($replaced[0].parent.type).to.equal('root');
			expect($.html($replaced[0].parent)).to.equal('<h2>hi <span>there</span></h2>');
			expect($.html($replaced)).to.equal('<br>');
		});

	});

	describe('.empty', function() {

		it('() : should remove all children from selected elements', function() {
			var $fruits = $(fruits);
			$('#fruits', $fruits).empty();
			expect($('#fruits', $fruits).children()).to.have.length(0);
		});

	});

	describe('.html', function() {

		it('() : should get the innerHTML for an element', function() {
			var $fruits = $(fruits);
			expect($('#fruits', $fruits).html()).to.equal([
				'<li class="apple">Apple</li>',
				'<li class="orange">Orange</li>',
				'<li class="pear">Pear</li>'
			].join(''));
		});

		it('() : should get innerHTML even if its just text', function() {
			var item = '<li class="pear">Pear</li>';
			expect($('.pear', item).html()).to.equal('Pear');
		});

		it('() : should return empty string if nothing inside', function() {
			var item = '<li></li>';
			expect($('li', item).html()).to.equal('');
		});

		it('(html) : should set the html for its children', function() {
			var $fruits = $(fruits);
			$('#fruits', $fruits).html('<li class="durian">Durian</li>');
			var html = $('#fruits', $fruits).html();
			expect(html).to.equal('<li class="durian">Durian</li>');
		});

		it('(elem) : should set the html for its children with element', function() {
			var $fruits = $(fruits);
			$('#fruits', $fruits).html($('<li class="durian">Durian</li>'));
			var html = $('#fruits', $fruits).html();
			expect(html).to.equal('<li class="durian">Durian</li>');
		});

	});

	describe('.toString', function() {
		it('() : should get the outerHTML for an element', function() {
			var $fruits = $(fruits);
			expect($fruits.toString()).to.equal(fruits);
		});

		it('() : should return an html string for a set of elements', function() {
			var $fruits = $(fruits);
			expect($fruits.find('li').toString()).to.equal('<li class="apple">Apple</li><li class="orange">Orange</li><li class="pear">Pear</li>');
		});

		it('() : should be called implicitly', function() {
			var string = [$("<foo>"), $("<bar>"), $("<baz>")].join("");
			expect(string).to.equal('<foo></foo><bar></bar><baz></baz>');
		});
	});

	describe('.text', function() {

		it('() : gets the text for a single element', function() {
			expect($('.apple', fruits).text()).to.equal('Apple');
		});

		it('() : combines all text from children text nodes', function() {
			expect($('#fruits', fruits).text()).to.equal('AppleOrangePear');
		});

		it('(text) : sets the text for the child node', function() {
			var $fruits = $(fruits);
			$('.apple', $fruits).text('Granny Smith Apple');
			expect($('.apple', $fruits)[0].children[0].data).to.equal('Granny Smith Apple');
		});

		it('should allow functions as arguments', function() {
			var $fruits = $(fruits);
			$('.apple', $fruits).text(function(idx, content) {
				expect(idx).to.equal(0);
				expect(content).to.equal('Apple');
				return 'whatever mate';
			});
			expect($('.apple', $fruits)[0].children[0].data).to.equal('whatever mate');
		});

		it('should decode special chars', function() {
			var text = $('<p>M&amp;M</p>').text();
			expect(text).to.equal('M&M');
		});

		it('should work with special chars added as strings', function() {
			var text = $('<p>M&M</p>').text();
			expect(text).to.equal('M&M');
		});

		it('(str) should encode then decode unsafe characters', function() {
			var $apple = $('.apple', fruits);

			$apple.text('blah <script>alert("XSS!")</script> blah');
			expect($apple[0].children[0].data).to.equal('blah &lt;script&gt;alert(&quot;XSS!&quot;)&lt;/script&gt; blah');
			expect($apple.text()).to.equal('blah <script>alert("XSS!")</script> blah');

			$apple.text('blah <script>alert("XSS!")</script> blah');
			expect($apple.html()).to.not.contain('<script>alert("XSS!")</script>');
		});
	});

	describe('.show', function(){
		it('Should set display as block.', function(){
			var $fruits = $(fruits);
			$fruits.show();

			expect($fruits.attr("style")).to.contain('block');
		});
	});

	describe('.hide', function(){
		it('Should set display as none.', function(){
			var $fruits = $(fruits);
			$fruits.hide();

			expect($fruits.attr("style")).to.contain('none');
		});
	});

	describe('.width', function(){
		it('Should set & get width.', function(){
			var $fruits = $(fruits);
			$fruits.css("width", 10);
			expect($fruits.width()).to.equal(10);
		});
	});

	describe('.toggleClass', function(){
		it('.toggleClass(name)', function(){
			var klass = "apple";
			var $apple = $("." + klass, fruits);
			$apple.toggleClass(klass);
			expect($apple.hasClass(klass)).to.not.be.ok();
		});
	});

	describe('.get', function(){
		it('.get(): Should return an array.', function(){
			var $ele = $(fruits);
			expect($ele.get()).to.have.length(1);
		});

		it('.get(0): Should return an object.', function(){
			var $ele = $(fruits);
			expect($ele.get(0).name).to.not.be.empty();
		});
	});

	describe('.add', function(){
		it('.add()', function(){
			var $fruits = $(fruits);
			$fruits.add('<span class="cherry"></span>');
			expect($fruits.parent().find('.cherry')).to.have.length(1);
		});
	});

	describe('.appendTo', function(){
		it('.appendTo(): Should append li to ul', function(){
			var target = $("<ul></ul>")
			$('<li class="apple">new list item</li>').appendTo(target);
			expect(target.find(".apple")).to.have.length(1);
		});
	});

	describe('.insertBefore', function(){
		it('.insertBefore(): Should insert li.other to li.orange before.', function(){
			var $fruits = $(fruits);
			var target = $(".orange", $fruits);
			$('<li class="other">Other</li>').insertBefore(target);
			expect($fruits.find(".other").index()).to.be.equal(1);
		});
	});

	describe('.wrapAll', function(){
		it('wrapAll(structure): Should wrap all elements in a single structure', function(){
			var html = '<span>inner</span>';
			var $frame = $('<div id="buttons" />');
			var $ele = $(html);
			var $result = $ele.wrapAll($frame);
			expect($frame.html()).to.be.equal(html);
		});
	});


	describe('.wrapInner', function(){
		it('wrapInner(structure): Wrap the contents of each element separately in a structure', function(){
			var innerHTML = 'inner <!--comment--><strong>text</strong>';
			var html = '<div class="inner">' + innerHTML + '</div>';
			var $frame = $('<div id="buttons" />');
			var $ele = $(html);
			var $result = $ele.wrapInner($frame);
			expect($frame.html()).to.be.equal(innerHTML);
		});
	});

	describe('.wrap', function(){
		it('wrap(structure): Wrap each element of the collection separately in a DOM structure', function(){
			var paragraph = '<div><p>paragraph 1</p><p>paragraph 2</p></div>';
			var $list = $('p', paragraph);
			$list.wrap('<div></div>');
			//console.log("Result: %s", $list.toString());
			//console.log($list.parent().html());

			//var $result = $ele.wrapInner($frame);
			//expect($frame.html()).to.be.equal(innerHTML);
		});
	});

	describe('.prependTo', function(){
		it('.prependTo(target)', function(){
			var target = $('<div class="wrap"><span>something</span></div>');
			$('<h1>title</h1>').prependTo(target);
			var review = '<div class="wrap"><h1>title</h1><span>something</span></div>';
			expect(target.toString()).to.be.equal(review);
		});
	});

	describe('.unwrap', function(){
		it('.unwrap()', function(){
			var inner = '<span>something</span>';
			var $ele = $('<div class="wrap">' + inner + '</div>');
		});
	});
});
