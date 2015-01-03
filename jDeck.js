/*

jDeck is a JavaScript object for properly parsing Hearthstone decklists into a text file using jQuery selectors.

*/

var Deck = Class.create({
	init: function() {
		this.list = [];
	},
	addCards: function (elemone, elemtwo, elemthree) {
		var self = this;
		$(elemone).each(function(i, el) {
			var values = $(elemtwo, this).text();
			if ($(elemthree, this).text().indexOf('2') >= 0){
				self.list.push(values);
				self.list.push(values);
			} else {
				self.list.push(values);
			}
		});
    },
	addCardsException: function (cardname) {
		var self = this;
		self.list.push(cardname);
	},
	download: function (fileName) {
		var self = this;
		var data = self.list.join("\r\n");
		var a = document.createElement("a");
		document.body.appendChild(a);
		a.style = "display: none";
		var blob = new Blob([data], {type: "octet/stream"}),
		url = window.URL.createObjectURL(blob);
		a.href = url;
		a.download = fileName;
		a.click();
		window.URL.revokeObjectURL(url);
	}
});

if (((window.location.href).indexOf('hearthhead.com/deck=') >= 0)&&($('[class^="collapsed-card"] > .base').length)){
	chrome.extension.sendMessage({greeting: "deck"});
	var deck = new Deck();
	deck.addCards('[class^="collapsed-card"] > .base', '.name', '.count');
	var download = function(){
		deck.download($('.text h1').text() + '.txt');
	};
} else if ((window.location.href).indexOf('hearthhead.com/deckbuilder') >= 0){
	chrome.extension.sendMessage({greeting: "deck"});
	var deck = new Deck();
	$('[class^="column displaytype-deck real"]').each(function(i, el) {
		var values = $('a > img', this).attr("alt");
		if ($('.card-count', this).text().indexOf('2') >= 0){
			deck.addCardsException(values);
			deck.addCardsException(values);
		} else {
			deck.addCardsException(values);
		}
	});
	var download = function(){
		deck.download('Deck.txt');
	};
} else if ((window.location.href).indexOf('hearthstonetopdeck.com/deck.php?') >= 0){
	chrome.extension.sendMessage({greeting: "deck"});
	var deck = new Deck();
	$('.cardname').each(function(i, el) {
		var values = $.trim($(this).text().replace(/[\t\n]+/g,'')).split(' ');
		var count = parseInt(values.shift(), 10);
		for (var i = 0; i < count; i++) {
			deck.addCardsException(values.join(' '));
		}
	});
	var download = function(){
		deck.download($('#wrapper > #center > .headbar > div[style*="float:left"]').text() + '.txt');
	};
} else if ((window.location.href).indexOf('gosugamers.net/hearthstone/decks/') >= 0){
	chrome.extension.sendMessage({greeting: "deck"});
	var deck = new Deck();
	deck.addCards('[class^="card-link"]', '[class^="name card-quality"]', '.count');
	var download = function(){
		deck.download($('h2 [class^="class-color"]').text() + '.txt');
	};
} else if (((window.location.href).indexOf('hearthstoneplayers.com/') >= 0)&&($('[class^="deck-list"]').length)){
	chrome.extension.sendMessage({greeting: "deck"});
	var deck = new Deck();
	deck.addCards('.card', '.card-title', '.card-count');
	var download = function(){
		deck.download($('#post-title').text() + '.txt');
	};
} else if ((window.location.href).indexOf('hearthpwn.com/decks/') >= 0){
	chrome.extension.sendMessage({greeting: "deck"});
	var deck = new Deck();
	deck.addCards('.even, .odd', 'b', '.col-name');
	var download = function(){
		deck.download($('.t-deck-title').text() + '.txt');
	};
} else if ((((window.location.href).indexOf('hearthstats.net/decks/') >= 0)||((window.location.href).indexOf('hss.io/decks/') >= 0))&&($('.deckBuilderCardsWrapper').length)){
	chrome.extension.sendMessage({greeting: "deck"});
	var deck = new Deck();
	deck.addCards('[class^="card cardWrapper"]', '.name', '.qty');
	var download = function(){
		deck.download($('.page-title').text().replace(/ Deck Views:.*/, "") + '.txt');
	};
} else if ((window.location.href).indexOf('heartharena.com/arena-run/') >= 0){
	chrome.extension.sendMessage({greeting: "deck"});
	var deck = new Deck();
	deck.addCards('[class^="arenaDeckList arena-section"] > .deckList > .deckCard', '.name', '.quantity');
	var download = function(){
		deck.download($('.deck-archetype-name').text() + '.txt');
	};
} else if ((window.location.href).indexOf('tempostorm.com/decks/') >= 0){
	chrome.extension.sendMessage({greeting: "deck"});
	var deck = new Deck();
	deck.addCards('.db-deck-cards > [class^="db-deck-card ng-scope"]', '[class^="db-deck-card-name"]', '[class^="db-deck-card-qty"]');
	var download = function(){
		deck.download($('h1.ng-binding').text() + '.txt');
	};
} else if ((window.location.href).indexOf('hearthpwn.com/deckbuilder') >= 0){
	chrome.extension.sendMessage({greeting: "deck"});
	var deck = new Deck();
	$('.even, .odd').each(function(i, el) {
		var values = $('b', this).text();
		if ($('.inline-card-count', this).text().indexOf('2') >= 0){
			deck.addCardsException(values);
			deck.addCardsException(values);
		} else if ($('.inline-card-count', this).text().indexOf('1') >= 0){
			deck.addCardsException(values);
		};
	});
	var download = function(){
		deck.download($('.deck-name-container > h2').text() + '.txt');
	};
}