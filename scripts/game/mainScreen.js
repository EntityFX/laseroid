"use strict";

var MainScreen = /** @class */ (function () {
	MainScreen.prototype.interface = null;

	MainScreen.prototype.lifeIcon = null;

	MainScreen.prototype.environment = null;

	MainScreen.prototype.texts = {};
	MainScreen.prototype.buttons = {};

	MainScreen.prototype.hexi = null;
	MainScreen.prototype.resourcesPackage = null;
	MainScreen.prototype.gameScene = null;
	MainScreen.prototype.lifeTapped = null;

	MainScreen.prototype.levelBackgroundMap = [];
	MainScreen.prototype.levels = [];
	MainScreen.prototype.uiConfiguration = null;


	function MainScreen($hexi, resourcesPackage, gameScene, levels, uiConfiguration) {
		var _this = this;
		this.resourcesPackage = resourcesPackage;
		this.gameScene = gameScene;
		this.hexi = $hexi;
		this.levels = levels;
		this.uiConfiguration = uiConfiguration;
		//this.hexi.fps = 45;
	}

	MainScreen.prototype.init = function (initialState) {
		var _this = this;

		this.interface = this.hexi.sprite("resources/{0}/images/interface.png".format(_this.resourcesPackage));
		this.gameScene.addChild(this.interface );
		this.environment = this.hexi.sprite(Object.values(_this.levels).map(function (level) {
			return "resources/{0}/{1}".format(_this.resourcesPackage, level.background);
		}), 146, 9);

		Object.keys(this.levels).forEach(function (level, index) {
			_this.levelBackgroundMap[level] = index;
		});

		this.environment.show(0);

		this.lifeIcon = this.hexi.sprite("resources/{0}/images/life-icon.png".format(_this.resourcesPackage), 149, 434);

		this.gameScene.addChild(this.environment);
		this.gameScene.addChild(this.lifeIcon);

		this.buildTexts();
		this.buildButtons();

		var pauseButton = this.buttons["pauseButton"];
		if (pauseButton) {
			pauseButton.release = function () {
				if (_this.pauseTapped != null) {
					_this.pauseTapped();
					_this.updatePauseButtonState();
				}
			};
		}

		var loadButton = this.buttons["loadButton"];
		if (loadButton) {
			loadButton.release = function () {
				if (_this.loadTapped != null) {
					_this.loadTapped();
				}
			};
		}

		var storeButton = this.buttons["storeButton"];
		if (storeButton) {
			storeButton.release = function () {
				if (_this.storeTapped != null) {
					_this.storeTapped();
				}
			};
		}

		var resetButton = this.buttons["resetButton"];
		if (resetButton) {
			resetButton.release = function () {
				if (_this.resetTapped != null) {
					_this.resetTapped();
				}
			};
		}

		var nextLevelSprite = this.buttons["nextLevelButton"];
		nextLevelSprite.release = function () {
			if (_this.nextLevelTapped != null) {
				_this.nextLevelTapped();
				
			}
		};

		var upgradeSprite = this.buttons["upgradeLevelButton"];
		upgradeSprite.release = function () {
			if (_this.lifeTapped != null) {
				_this.lifeTapped();
			}
		};

	}

	MainScreen.prototype.updatePauseButtonState= function() {
		var pauseButton = this.buttons["pauseButton"];
		pauseButton.textObject.content = pauseButton.texts[this.hexi.paused ? 1 : 0];
		pauseButton.textObject.setPosition(
			pauseButton.halfWidth - pauseButton.textObject.halfWidth,
			pauseButton.halfHeight - pauseButton.textObject.halfHeight);
	};

	MainScreen.prototype.update = function (state) {
		this.texts["lifeText"].content = state.life;
		this.texts["waveText"].content = state.wave;
		this.texts["levelText"].content = state.level;
		this.texts["scorePointsText"].content = state.scorePoints;
		this.texts["gameTimeText"].content = String(state.gameTimeSeconds).toHHMMSS();
		this.updatePauseButtonState();
	};

	MainScreen.prototype.changeEnvironment = function (index) {
		this.environment.show(this.levelBackgroundMap[index]);
	};

	MainScreen.prototype.buildTexts = function () {
		var _this = this;
		Object.keys(this.uiConfiguration.texts).forEach(function (t) {
			_this.texts[t] = _this.createText(_this.uiConfiguration.texts[t]);
		});
	};

	MainScreen.prototype.buildButtons = function () {
		var _this = this;
		Object.keys(this.uiConfiguration.buttons).forEach(function (b) {
			_this.buttons[b] = _this.createButton(_this.uiConfiguration.buttons[b]);
		});
	};

	MainScreen.prototype.createText = function (textConfig) {
		var textObject = this.hexi.text(textConfig.text, textConfig.font, textConfig.size,
			textConfig.color,
			textConfig.position.x, textConfig.position.y);
		this.gameScene.addChild(textObject);
		return textObject;
	};

	MainScreen.prototype.createButton = function (buttonConfig) {
		var button = this.hexi.group();

		if (buttonConfig.border.type == "rectangle") {
			var pauseButton = this.hexi.rectangle(
				buttonConfig.border.size.width,
				buttonConfig.border.size.height,
				buttonConfig.fillColor,
				buttonConfig.color,
				1,
				0, 0
			);

			button.addChild(pauseButton);
		}
		if (buttonConfig.border.type == "circle") {
			var pauseButton = this.hexi.circle(
				buttonConfig.border.size.radius,
				buttonConfig.fillColor,
				buttonConfig.color,
				1,
				0,
				0
			);
			button.addChild(pauseButton);
		}
		button.textObject = this.hexi.text(Array.isArray(buttonConfig.text) ? buttonConfig.text[0] : buttonConfig.text, buttonConfig.font, buttonConfig.size,
			buttonConfig.color,
			0, 0);

		button.addChild(button.textObject);
		button.textObject.setPosition(button.halfWidth - button.textObject.halfWidth, button.halfHeight - button.textObject.halfHeight);
		button.setPosition(buttonConfig.position.x, buttonConfig.position.y);
		button.interact = true;
		button.texts = buttonConfig.text;

		if (buttonConfig.alpha) {
			button.alpha = buttonConfig.alpha;
		}

		this.gameScene.addChild(button);
		return button;
	};

	return MainScreen;
}());