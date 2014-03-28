"use strict";

function Asset(settings) {
	var self = this;

	this.prefix = settings.prefix;
	this.root = settings.root;
	this.suffix = settings.suffix;
	this.userLevel = settings.userLevel;
}

Asset.prototype.getPrice = function () {
	var cost = 0, i;

	if (this.prefix.itemLevel > 0) {
		cost += this.prefix.itemLevel * Math.pow(10, this.userLevel);
	} else {
		cost += (this.userLevel + 3) * Math.pow(10, this.userLevel + 1);
	}
	if (this.root.itemLevel > 0) {
		cost += this.root.itemLevel * Math.pow(10, this.userLevel);
	} else {
		cost += (this.userLevel + 3) * Math.pow(10, this.userLevel + 1);
	}
	if (this.suffix.itemLevel > 0) {
		cost += this.suffix.itemLevel * Math.pow(10, this.userLevel);
	} else {
		cost += (this.userLevel + 3) * Math.pow(10, this.userLevel + 1);
	}

	return cost;
}

Asset.prototype.getSalePrice = function() {
	return this.getPrice() * 0.7;
}

Asset.prototype.getName = function() {
	return this.prefix.affix + ' ' + this.root.affix + ' of ' + this.suffix.affix;
}

