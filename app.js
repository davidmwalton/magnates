"use strict;"

$(document).ready(function () {
	var profile = {
		cash: 100,
		frats: 0, // think: clout
		actions: 3,
		investments: 0,
		assets: [],
		assetImprovements: 0,
		baseViceOMeter: {
			boner: 0,
			excess: 0,
			luxury: 0,
			fame: 0,
			joneskeeping: 0,
			intimidation: 0,
			delegation: 0
		},
		level: 1
	}, dom;

	function cacheDom() {
		var $details = $('#details');
		dom = {
			level: $('.level'),
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
			assetsList: $details.find('.assets-list'),
			addInvestment: $('#add-investment'),
			liquidateInvestment: $('#liquidate-investment'),
			addAsset: $('#add-asset'),
			liquidateAsset: $('#liquidate-asset'),
			improveAsset: $('#improve-asset'),
			showItems: $('#show-items'),
			levelUp: $('#level-up'),
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

		// dom.addAsset.on('click', function () {
		// 	profile.assets += 1;

		// 	switch (Math.floor(Math.random() * 7)) {
		// 		case 0:
		// 			profile.viceOMeter.boner += 1;
		// 			break;
		// 		case 1:
		// 			profile.viceOMeter.excess += 1;
		// 			break;
		// 		case 2:
		// 			profile.viceOMeter.luxury += 1;
		// 			break;
		// 		case 3:
		// 			profile.viceOMeter.fame += 1;
		// 			break;
		// 		case 4:
		// 			profile.viceOMeter.joneskeeping += 1;
		// 			break;
		// 		case 5:
		// 			profile.viceOMeter.intimidation += 1;
		// 			break;
		// 		case 6:
		// 			profile.viceOMeter.delegation += 1;
		// 			break;
		// 	}

		// 	updateUI();
		// });

		dom.liquidateAsset.on('click', function () {
			if (profile.assets.length > 0) {
				profile.assets.pop();
			}

			if (profile.assets.length < 1) {
				profile.assetImprovements = 0;
			}

			updateUI();
		});

		dom.improveAsset.on('click', function () {

			if (profile.assets.length > 0) {
				profile.assetImprovements += 1;

				switch (Math.floor(Math.random() * 7)) {
					case 0:
						profile.baseViceOMeter.boner += 2;
						break;
					case 1:
						profile.baseViceOMeter.excess += 2;
						break;
					case 2:
						profile.baseViceOMeter.luxury += 2;
						break;
					case 3:
						profile.baseViceOMeter.fame += 2;
						break;
					case 4:
						profile.baseViceOMeter.joneskeeping += 2;
						break;
					case 5:
						profile.baseViceOMeter.intimidation += 2;
						break;
					case 6:
						profile.baseViceOMeter.delegation += 2;
						break;
				}



				updateUI();
			}
		});

		dom.showItems.on('click', function () {
			var element, btnBuy, $element, $btnBuy,
				items = getRandomItems(),
				i, price;

			dom.itemsList.empty();

			for (i = 0; i < items.length ; i += 1) {
				element = document.createElement('li');
				btnBuy = document.createElement('button');
				$btnBuy = $(btnBuy);
				price = items[i].getPrice();
				$btnBuy.text('Buy');

				if (price > profile.cash) {
					$btnBuy.attr('disabled', 'disabled');
				}

				$element = $(element);
				$element.text(items[i].getName() + ': $' + commafy(price));

				$element.append(btnBuy);
				$element.data('item', items[i]);
				dom.itemsList.append(element);
			}

			dom.itemsList.find('button').on('click', purchaseItem);
		});

		dom.levelUp.on('click', function () {
			profile.level += 1;

			updateUI();
		});

		dom.nextTurn.on('click', function () {
			var vice, smallest;
			profile.cash += profile.assets.length * Math.random() * 100;

			smallest = 9999;
			for (vice in profile.baseViceOMeter) {
				if (profile.baseViceOMeter[vice] < smallest) {
					smallest = profile.baseViceOMeter[vice];
					profile.baseViceOMeter[vice] -= 1;

					if (profile.baseViceOMeter[vice] < 0) {
						profile.baseViceOMeter[vice] = 0;
					}
				}
			}
			profile.frats += smallest;

			updateUI();
		});
	}

	function purchaseItem() {
		var $this = $(this),
			$parent = $this.parent(),
			item = $parent.data('item'),
			price = getPriceFor(item);

		if (profile.cash >= price) {
			profile.cash -= price;
			profile.assets.push(item);
			$parent.remove();

			updateUI();
		}
	}

	function sellItem() {
		var $this = $(this),
			$parent = $this.parent(),
			item = $parent.data('item'),
			price = getSalePriceFor(item),
			index = profile.assets.indexOf(item);

		if (index > -1) {
			profile.cash += price;
			profile.assets.splice(index, 1);
		}

		$parent.remove();
		updateUI();
	}

	function commafy(figure) {
		var split = figure.toString().split(''),
			commafied = '',
			i, j = 0;

		for (i = split.length; i > 0; i -= 1) {
			if (j % 3 === 0 && j > 0) {
				commafied = ',' + commafied;
			}

			j += 1;

			commafied = split[i - 1] + commafied;
		}

		return commafied;
	}

	function getPriceFor(item) {
		var cost = 0, i;

		if (item.prefix.itemLevel > 0) {
			cost += item.prefix.itemLevel * Math.pow(10, profile.level);
		} else {
			cost += (profile.level + 3) * Math.pow(10, profile.level + 1);
		}
		if (item.root.itemLevel > 0) {
			cost += item.root.itemLevel * Math.pow(10, profile.level);
		} else {
			cost += (profile.level + 3) * Math.pow(10, profile.level + 1);
		}
		if (item.suffix.itemLevel > 0) {
			cost += item.suffix.itemLevel * Math.pow(10, profile.level);
		} else {
			cost += (profile.level + 3) * Math.pow(10, profile.level + 1);
		}

		return cost;
	}

	function getSalePriceFor(item) {
		return getPriceFor(item) * 0.7;
	}

	function getRandomPrefix() {
		var prefixIndex = Math.floor(Math.random() * 7);

		switch (prefixIndex) {
			case 0:
				profile.baseViceOMeter.boner += 2;
				break;
			case 1:
				profile.baseViceOMeter.excess += 2;
				break;
			case 2:
				profile.baseViceOMeter.luxury += 2;
				break;
			case 3:
				profile.baseViceOMeter.fame += 2;
				break;
			case 4:
				profile.baseViceOMeter.joneskeeping += 2;
				break;
			case 5:
				profile.baseViceOMeter.intimidation += 2;
				break;
			case 6:
				profile.baseViceOMeter.delegation += 2;
				break;
		}

	}

	function updateUI() {
		dom.level.text(profile.level);
		dom.cash.text(profile.cash);
		dom.frats.text(profile.frats);
		dom.actions.text(profile.actions);
		dom.investments.text(profile.investments);
		dom.assets.text(profile.assets.length);
		dom.assetImprovements.text(profile.assetImprovements);
		
		updateViceOMeterUi(getCurrentViceOMeter());
		updateAssetsUi(profile.assets);
		refreshSaleItems();
	}

	function refreshSaleItems() {
		var i,
			$items = dom.itemsList.find('li'),
			item, $item;

		for (i = 0; i < $items.length; i += 1) {
			$item = $($items[i]);
			item = $item.data('item');
			if (getPriceFor(item) > profile.cash) {
				$item.find('button').attr('disabled', 'disabled');
			} else {
				$item.find('button').attr('disabled', null);
			}
		}
	}

	function getCurrentViceOMeter() {
		var vices = ['boner', 'excess', 'luxury', 'fame', 'joneskeeping', 'intimidation', 'delegation'],
			viceOMeter = $.extend({}, profile.baseViceOMeter),
			i, v,
			currentAsset,
			currentVice;

		for (i = 0; i < profile.assets.length; i += 1) {
			currentAsset = profile.assets[i];

			for (v = 0; v < vices.length; v += 1) {
				currentVice = vices[v];

				if (currentAsset.prefix.traits[currentVice] !== undefined) {
					viceOMeter[currentVice] += currentAsset.prefix.traits[currentVice];
				}
				if (currentAsset.root.traits[currentVice] !== undefined) {
					viceOMeter[currentVice] += currentAsset.root.traits[currentVice];
				}
				if (currentAsset.suffix.traits[currentVice] !== undefined) {
					viceOMeter[currentVice] += currentAsset.suffix.traits[currentVice];
				}
			}
		}

		return viceOMeter;
	}

	function updateViceOMeterUi(viceOMeter) {
		dom.boner.text(viceOMeter.boner);
		dom.excess.text(viceOMeter.excess);
		dom.luxury.text(viceOMeter.luxury);
		dom.fame.text(viceOMeter.fame);
		dom.joneskeeping.text(viceOMeter.joneskeeping);
		dom.intimidation.text(viceOMeter.intimidation);
		dom.delegation.text(viceOMeter.delegation);
	}

	function updateAssetsUi(assets) {
		var element, btnSell, $element,
			i;

		dom.assetsList.empty();

		for (i = 0; i < assets.length ; i += 1) {
			element = document.createElement('li');
			btnSell = document.createElement('button');
			$(btnSell).text('Sell');
			$element = $(element);
			$element.text(assets[i].getName() + ': $' + commafy(assets[i].getSalePrice()));
			$element.append(btnSell);
			$element.data('item', assets[i]);
			dom.assetsList.append(element);
		}

		dom.assetsList.find('button').on('click', sellItem);

	}

	function getRandomItems() {
		var items = [],
			i;

		for (i = 0; i < 5; i += 1) {
			items.push(new Asset({
				prefix: getRandomAffix(),
				root: getRandomAffix(),
				suffix: getRandomAffix(),
				userLevel: profile.level
			}));
		}

		return items;
	}

	function getRandomAffix() {
		var i,
			possibleItems = [
				{
					affix: 'Sample',
					traits: {
						luxury: 3,
						fame: 4
					},
					itemLevel: 7
				},
				{
					affix: 'excess1',
					itemLevel: 1,
					traits: {
						excess: 1
					}
				},
				{
					affix: 'luxury1',
					itemLevel: 1,
					traits: {
						luxury: 1
					}
				},
				{
					affix: 'fame1',
					itemLevel: 1,
					traits: {
						fame: 1
					}
				},
				{
					affix: 'joneskeeping1',
					itemLevel: 1,
					traits: {
						joneskeeping: 1
					}
				},
				{
					affix: 'intimidation1',
					itemLevel: 1,
					traits: {
						intimidation: 1
					}
				},
				{
					affix: 'delegation1',
					itemLevel: 1,
					traits: {
						delegation: 1
					}
				},
				{
					affix: 'boner1',
					itemLevel: 1,
					traits: {
						boner: 1
					}
				},
				{
					affix: 'excess2',
					itemLevel: 2,
					traits: {
						excess: 2
					}
				},
				{
					affix: 'luxury2',
					itemLevel: 2,
					traits: {
						luxury: 2
					}
				},
				{
					affix: 'fame2',
					itemLevel: 2,
					traits: {
						fame: 2
					}
				},
				{
					affix: 'joneskeeping2',
					itemLevel: 2,
					traits: {
						joneskeeping: 2
					}
				},
				{
					affix: 'intimidation2',
					itemLevel: 2,
					traits: {
						intimidation: 2
					}
				},
				{
					affix: 'delegation2',
					itemLevel: 2,
					traits: {
						delegation: 2
					}
				},
				{
					affix: 'boner2',
					itemLevel: 2,
					traits: {
						boner: 2
					}
				},
				{
					affix: 'excess3',
					itemLevel: 3,
					traits: {
						excess: 3
					}
				},
				{
					affix: 'luxury3',
					itemLevel: 3,
					traits: {
						luxury: 3
					}
				},
				{
					affix: 'fame3',
					itemLevel: 3,
					traits: {
						fame: 3
					}
				},
				{
					affix: 'joneskeeping3',
					itemLevel: 3,
					traits: {
						joneskeeping: 3
					}
				},
				{
					affix: 'intimidation3',
					itemLevel: 3,
					traits: {
						intimidation: 3
					}
				},
				{
					affix: 'delegation3',
					itemLevel: 3,
					traits: {
						delegation: 3
					}
				},
				{
					affix: 'boner3',
					itemLevel: 3,
					traits: {
						boner: 3
					}
				},
				{
					affix: 'excess4',
					itemLevel: 4,
					traits: {
						excess: 4
					}
				},
				{
					affix: 'luxury4',
					itemLevel: 4,
					traits: {
						luxury: 4
					}
				},
				{
					affix: 'fame4',
					itemLevel: 4,
					traits: {
						fame: 4
					}
				},
				{
					affix: 'joneskeeping4',
					itemLevel: 4,
					traits: {
						joneskeeping: 4
					}
				},
				{
					affix: 'intimidation4',
					itemLevel: 4,
					traits: {
						intimidation: 4
					}
				},
				{
					affix: 'delegation4',
					itemLevel: 4,
					traits: {
						delegation: 4
					}
				},
				{
					affix: 'boner4',
					itemLevel: 4,
					traits: {
						boner: 4
					}
				},
				{
					affix: 'excess5',
					itemLevel: 5,
					traits: {
						excess: 5
					}
				},
				{
					affix: 'luxury5',
					itemLevel: 5,
					traits: {
						luxury: 5
					}
				},
				{
					affix: 'fame5',
					itemLevel: 5,
					traits: {
						fame: 5
					}
				},
				{
					affix: 'joneskeeping5',
					itemLevel: 5,
					traits: {
						joneskeeping: 5
					}
				},
				{
					affix: 'intimidation5',
					itemLevel: 5,
					traits: {
						intimidation: 5
					}
				},
				{
					affix: 'delegation5',
					itemLevel: 5,
					traits: {
						delegation: 5
					}
				},
				{
					affix: 'boner5',
					itemLevel: 5,
					traits: {
						boner: 5
					}
				},
				{
					affix: 'excess6',
					itemLevel: 6,
					traits: {
						excess: 6
					}
				},
				{
					affix: 'luxury6',
					itemLevel: 6,
					traits: {
						luxury: 6
					}
				},
				{
					affix: 'fame6',
					itemLevel: 6,
					traits: {
						fame: 6
					}
				},
				{
					affix: 'joneskeeping6',
					itemLevel: 6,
					traits: {
						joneskeeping: 6
					}
				},
				{
					affix: 'intimidation6',
					itemLevel: 6,
					traits: {
						intimidation: 6
					}
				},
				{
					affix: 'delegation6',
					itemLevel: 6,
					traits: {
						delegation: 6
					}
				},
				{
					affix: 'boner6',
					itemLevel: 6,
					traits: {
						boner: 6
					}
				},
				{
					affix: 'excess7',
					itemLevel: 7,
					traits: {
						excess: 7
					}
				},
				{
					affix: 'luxury7',
					itemLevel: 7,
					traits: {
						luxury: 7
					}
				},
				{
					affix: 'fame7',
					itemLevel: 7,
					traits: {
						fame: 7
					}
				},
				{
					affix: 'joneskeeping7',
					itemLevel: 7,
					traits: {
						joneskeeping: 7
					}
				},
				{
					affix: 'intimidation7',
					itemLevel: 7,
					traits: {
						intimidation: 7
					}
				},
				{
					affix: 'delegation7',
					itemLevel: 7,
					traits: {
						delegation: 7
					}
				},
				{
					affix: 'boner7',
					itemLevel: 7,
					traits: {
						boner: 7
					}
				},
				{
					affix: 'epic1',
					itemLevel: -1,
					traits: {
						excess: 1,

					}
				},
				{
					affix: 'epic2',
					itemLevel: -1,
					traits: {
						luxury: 1
					}
				},
				{
					affix: 'epic3',
					itemLevel: -1,
					traits: {
						fame: 1
					}
				},
				{
					affix: 'epic4',
					itemLevel: -1,
					traits: {
						joneskeeping: 1
					}
				},
				{
					affix: 'epic5',
					itemLevel: -1,
					traits: {
						intimidation: 1
					}
				},
				{
					affix: 'epic6',
					itemLevel: -1,
					traits: {
						delegation: 1
					}
				},
				{
					affix: 'epic7',
					itemLevel: -1,
					traits: {
						boner: 1
					}
				},
			],
			itemsByLevel,
			rolledLevelItems,
			rolledLevel;


		rolledLevel = getRandomAffixLevel();

		itemsByLevel = getItemsByLevel(possibleItems);

		i = Math.floor(Math.random() * itemsByLevel[rolledLevel].length);

		return itemsByLevel[rolledLevel][i];
	}

	function getRandomAffixLevel() {
		var i = Math.floor(Math.random() * 100);

		if (i < 70) {
			return profile.level;
		}

		if (i < 90) {
			return profile.level + 1;
		}

		if (i < 95) {
			return profile.level + 2;
		}

		if (i < 98) {
			return profile.level + 3;
		}

		return -1;
	}

	function getItemsByLevel(possibleItems) {
		var itemsByLevel = [],
			i;

		for (i = 0; i < possibleItems.length; i += 1) {
			if (itemsByLevel[possibleItems[i].itemLevel] === undefined) {
				itemsByLevel[possibleItems[i].itemLevel] = [];
			}

			itemsByLevel[possibleItems[i].itemLevel].push(possibleItems[i]);
		}

		return itemsByLevel;
	}

	cacheDom();
	registerCallbacks();
	updateUI();
});