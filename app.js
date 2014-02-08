"use strict;"

$(document).ready(function () {
	var profile = {
		cash: 100,
		frats: 0,
		actions: 3,
		investments: 0,
		assets: 0,
		assetImprovements: 0,
		viceOMeter: {
			boner: 0,
			excess: 0,
			luxury: 0,
			fame: 0,
			joneskeeping: 0,
			intimidation: 0,
			delegation: 0
		}
	}, dom;

	function cacheDom() {
		var $details = $('#details');
		dom = {
			itemsList: $('.items-list'),
			cash: $details.find('.cash'),
			frats: $details.find('.frats'),
			actions: $details.find('.actions'),
			investments: $details.find('.investments'),
			assets: $details.find('.assets'),
			assetImprovements: $details.find('.asset-improvements'),
			boner: $details.find('.boner'),
			excess: $details.find('.excess'),
			luxury: $details.find('.luxury'),
			fame: $details.find('.fame'),
			joneskeeping: $details.find('.joneskeeping'),
			intimidation: $details.find('.intimidation'),
			delegation: $details.find('.delegation'),
			addInvestment: $('#add-investment'),
			liquidateInvestment: $('#liquidate-investment'),
			addAsset: $('#add-asset'),
			liquidateAsset: $('#liquidate-asset'),
			improveAsset: $('#improve-asset'),
			showItems: $('#show-items'),
			nextTurn: $('#next-turn')
		};
	}

	function registerCallbacks() {
		dom.addInvestment.on('click', function () {
			profile.investments += 1;
			updateUI();
		});

		dom.liquidateInvestment.on('click', function () {
			profile.investments -= 1;

			if (profile.investments < 0) {
				profile.investments = 0;
			}
			updateUI();
		});

		dom.addAsset.on('click', function () {
			profile.assets += 1;

			switch (Math.floor(Math.random() * 7)) {
				case 0:
					profile.viceOMeter.boner += 1;
					break;
				case 1:
					profile.viceOMeter.excess += 1;
					break;
				case 2:
					profile.viceOMeter.luxury += 1;
					break;
				case 3:
					profile.viceOMeter.fame += 1;
					break;
				case 4:
					profile.viceOMeter.joneskeeping += 1;
					break;
				case 5:
					profile.viceOMeter.intimidation += 1;
					break;
				case 6:
					profile.viceOMeter.delegation += 1;
					break;
			}

			updateUI();
		});

		dom.liquidateAsset.on('click', function () {
			profile.assets -= 1;

			if (profile.assets < 0) {
				profile.assets = 0;
				profile.assetImprovements = 0;
			}
			updateUI();
		});
		dom.improveAsset.on('click', function () {

			if (profile.assets > 0) {
				profile.assetImprovements += 1;

				switch (Math.floor(Math.random() * 7)) {
					case 0:
						profile.viceOMeter.boner += 2;
						break;
					case 1:
						profile.viceOMeter.excess += 2;
						break;
					case 2:
						profile.viceOMeter.luxury += 2;
						break;
					case 3:
						profile.viceOMeter.fame += 2;
						break;
					case 4:
						profile.viceOMeter.joneskeeping += 2;
						break;
					case 5:
						profile.viceOMeter.intimidation += 2;
						break;
					case 6:
						profile.viceOMeter.delegation += 2;
						break;
				}



				updateUI();
			}
		});

		dom.showItems.on('click', function () {
			var element,
				items = getRandomItems(),
				items2 = getRandomItems(),
				items3 = getRandomItems(),
				i; 

			dom.itemsList.empty();

			for (i = 0; i < items.length ; i += 1) { 
				element = document.createElement('li');
				$(element).text(items[i].affix + ' ' + items2[i].affix + ' of ' + items3[i].affix);
				dom.itemsList.append(element);
			}

			
		});

		dom.nextTurn.on('click', function () {
			var vice, smallest;
			profile.cash += profile.assets * Math.random() * 100;

			smallest = 9999;
			for (vice in profile.viceOMeter) {
				if (profile.viceOMeter[vice] < smallest) {
					smallest = profile.viceOMeter[vice];
					profile.viceOMeter[vice] -= 1;

					if (profile.viceOMeter[vice] < 0) {
						profile.viceOMeter[vice] = 0;
					}
				}
			}
			profile.frats += smallest;

			updateUI();
		});
	}

	function getRandomPrefix() {
		var prefixIndex = Math.floor(Math.random() * 7);

		switch (prefixIndex) {
			case 0:
				profile.viceOMeter.boner += 2;
				break;
			case 1:
				profile.viceOMeter.excess += 2;
				break;
			case 2:
				profile.viceOMeter.luxury += 2;
				break;
			case 3:
				profile.viceOMeter.fame += 2;
				break;
			case 4:
				profile.viceOMeter.joneskeeping += 2;
				break;
			case 5:
				profile.viceOMeter.intimidation += 2;
				break;
			case 6:
				profile.viceOMeter.delegation += 2;
				break;
		}

	}

	function updateUI() {
		dom.cash.text(profile.cash);
		dom.frats.text(profile.frats);
		dom.actions.text(profile.actions);
		dom.investments.text(profile.investments);
		dom.assets.text(profile.assets);
		dom.assetImprovements.text(profile.assetImprovements);
		dom.boner.text(profile.viceOMeter.boner);
		dom.excess.text(profile.viceOMeter.excess);
		dom.luxury.text(profile.viceOMeter.luxury);
		dom.fame.text(profile.viceOMeter.fame);
		dom.joneskeeping.text(profile.viceOMeter.joneskeeping);
		dom.intimidation.text(profile.viceOMeter.intimidation);
		dom.delegation.text(profile.viceOMeter.delegation);
	}

	function getRandomItems() {
		var items = [], 
			i;

		for (i = 0; i < 5; i += 1) {
			items.push(getRandomItem());

		}

		return items;
	}

	function getRandomItem() {
		var i,
			possibleItems = [
				{
					affix: 'Sample',
					traits: {
						luxury: {
							value: 3
						},
						fame: {
							value: 4
						}
					},
				},
				{
					affix: 'excess1'
				},
				{
					affix: 'luxury1'
				},
				{
					affix: 'fame1'
				},
				{
					affix: 'joneskeeping1'
				},
				{
					affix: 'intimidation1'
				},
				{
					affix: 'delegation1'
				},
				{
					affix: 'boner1'
				},
				{
					affix: 'excess2'
				},
				{
					affix: 'luxury2'
				},
				{
					affix: 'fame2'
				},
				{
					affix: 'joneskeeping2'
				},
				{
					affix: 'intimidation2'
				},
				{
					affix: 'delegation2'
				},
				{
					affix: 'boner2'
				},
				{
					affix: 'excess3'
				},
				{
					affix: 'luxury3'
				},
				{
					affix: 'fame3'
				},
				{
					affix: 'joneskeeping3'
				},
				{
					affix: 'intimidation3'
				},
				{
					affix: 'delegation3'
				},
				{
					affix: 'boner3'
				},
				{
					affix: 'excess4'
				},
				{
					affix: 'luxury4'
				},
				{
					affix: 'fame4'
				},
				{
					affix: 'joneskeeping4'
				},
				{
					affix: 'intimidation4'
				},
				{
					affix: 'delegation4'
				},
				{
					affix: 'boner4'
				},
				{
					affix: 'excess5'
				},
				{
					affix: 'luxury5'
				},
				{
					affix: 'fame5'
				},
				{
					affix: 'joneskeeping5'
				},
				{
					affix: 'intimidation5'
				},
				{
					affix: 'delegation5'
				},
				{
					affix: 'boner5'
				},
				{
					affix: 'excess6'
				},
				{
					affix: 'luxury6'
				},
				{
					affix: 'fame6'
				},
				{
					affix: 'joneskeeping6'
				},
				{
					affix: 'intimidation6'
				},
				{
					affix: 'delegation6'
				},
				{
					affix: 'boner6'
				},
				{
					affix: 'excess7'
				},
				{
					affix: 'luxury7'
				},
				{
					affix: 'fame7'
				},
				{
					affix: 'joneskeeping7'
				},
				{
					affix: 'intimidation7'
				},
				{
					affix: 'delegation7'
				},
				{
					affix: 'boner7'
				},
			];

		i = Math.floor(Math.random() * possibleItems.length);

		return possibleItems[i];
	}

	cacheDom();
	registerCallbacks();
	updateUI();
});