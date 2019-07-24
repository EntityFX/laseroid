"use strict";

var MainScreen = /** @class */ (function () {
    MainScreen.prototype.interface = null;

	MainScreen.prototype.lifeIcon = null;

	MainScreen.prototype.environment = null;

    MainScreen.prototype.gameTimeSeconds = 0;
    
    MainScreen.prototype.lifeText = {
		"position": { "x": 178, "y": 438 },
		"textObject": null,
		"font": "sans-serif",
		"size": "18px",
		"color": "#09BC09"
	};

	MainScreen.prototype.waveText = {
		"position": { "x": 620, "y": 23 },
		"textObject": null,
		"font": "sans-serif",
		"size": "12px",
		"color": "#F0F0F0"
	};

	MainScreen.prototype.levelText = {
		"position": { "x": 620, "y": 5 },
		"textObject": null,
		"font": "sans-serif",
		"size": "12px",
		"color": "#F0F0F0"
	};

	MainScreen.prototype.scorePointsText = {
		"position": { "x": 4, "y": 96 },
		"textObject": null,
		"font": "sans-serif",
		"size": "12px",
		"color": "#B2B2B2"
	};

	MainScreen.prototype.gameTimeText = {
		"position": { "x": 4, "y": 136 },
		"textObject": null,
		"font": "sans-serif",
		"size": "12px",
		"color": "#B2B2B2"
	};


	MainScreen.prototype.levelLabelText = {
		"position": { "x": 565, "y": 5 },
		"textObject": null,
		"font": "sans-serif",
		"size": "12px",
		"color": "#99CC00",
		"text": "LEVEL"
	};

	MainScreen.prototype.waveLabelText = {
		"position": { "x": 565, "y": 23 },
		"textObject": null,
		"font": "sans-serif",
		"size": "12px",
		"color": "#9DD19D",
		"text": "WAVE"
	};

	MainScreen.prototype.scorePointsLabelText = {
		"position": { "x": 4, "y": 80 },
		"textObject": null,
		"font": "sans-serif",
		"size": "12px",
		"color": "#FFFFFF",
		"text": "SCORE"
	};

	MainScreen.prototype.gameTimeLabelText = {
		"position": { "x": 4, "y": 120 },
		"textObject": null,
		"font": "sans-serif",
		"size": "12px",
		"color": "#FFFFFF",
		"text": "TIME"
	};
	
	MainScreen.prototype.pauseButton = {
		"position": { "x": 4, "y": 456 },
		"button": null,
		"font": "sans-serif",
		"size": "14px",
		"color": "#99CC00",
		"fillColor": "#000000",
		"text" : {
			"0" : "PAUSE",
			"1" : "RESUME",
		},
		"width" : 70,
		"height" : 20
	};

    MainScreen.prototype.hexi = null;
    MainScreen.prototype.resourcesPackage = null;
	MainScreen.prototype.gameScene = null;
	MainScreen.prototype.lifeTapped = null;

	MainScreen.prototype.nextLevelSprite = null;
	MainScreen.prototype.upgradeSprite = null;

    function MainScreen($hexi, resourcesPackage, gameScene) {
		var _this = this;
        this.resourcesPackage = resourcesPackage;
        this.gameScene = gameScene;
        this.hexi = $hexi;
		//this.hexi.fps = 45;
	}
    
    MainScreen.prototype.init = function (initialState) {
        var _this = this;

        this.interface = this.hexi.sprite("resources/{0}/images/interface.png".format(_this.resourcesPackage));

		this.environment = this.hexi.sprite(Main.environments.map(function(environment){
			return "resources/{0}/{1}".format(_this.resourcesPackage, environment)
		}), 146, 9);
		this.environment.show(0);
		
		this.nextLevelSprite = this.hexi.circle(
			36, 
			"#FF0000", 
			"#AA0000", 
			1,
			82, 
			93 
		  );

		this.upgradeSprite = this.hexi.circle(
			36, 
			"#0000FF", 
			"#0000AA", 
			1,
			82, 
			348 
		  );

		this.nextLevelSprite.interact = true;
		this.nextLevelSprite.visible = false;
		this.nextLevelSprite.release = function() {
			if (_this.nextLevelTapped != null) {
				_this.nextLevelTapped();
			}
		};
		
		this.upgradeSprite.interact = true;
		this.upgradeSprite.visible = false;
		this.upgradeSprite.release = function() {
			if (_this.lifeTapped != null) {
				_this.lifeTapped();
			}
		};

        this.lifeIcon = this.hexi.sprite("resources/{0}/images/life-icon.png".format(_this.resourcesPackage), 149, 434);

        this.gameScene.addChild(this.environment);
		this.gameScene.addChild(this.lifeIcon);


		this.lifeText.textObject = this.hexi.text(initialState.life, this.lifeText.font, this.lifeText.size,
			this.lifeText.color,
			this.lifeText.position.x, this.lifeText.position.y);
		this.lifeText.textObject.interact = true;

		this.gameScene.addChild(this.lifeText.textObject);

		this.levelText.textObject = this.hexi.text(initialState.level, this.levelText.font, this.levelText.size,
			this.levelText.color,
			this.levelText.position.x, this.levelText.position.y);
		this.gameScene.addChild(this.levelText.textObject);

		this.scorePointsText.textObject = this.hexi.text(initialState.scorePoints, this.scorePointsText.font, this.scorePointsText.size,
			this.scorePointsText.color,
			this.scorePointsText.position.x, this.scorePointsText.position.y);
		this.gameScene.addChild(this.scorePointsText.textObject);

		this.gameTimeText.textObject = this.hexi.text(String(initialState.gameTimeSeconds).toHHMMSS(), this.gameTimeText.font, this.gameTimeText.size,
			this.gameTimeText.color,
			this.gameTimeText.position.x, this.gameTimeText.position.y);
		this.gameScene.addChild(this.gameTimeText.textObject);

		this.levelLabelText.textObject = this.hexi.text(_this.levelLabelText.text, this.levelLabelText.font, this.levelLabelText.size,
			this.levelLabelText.color,
			this.levelLabelText.position.x, this.levelLabelText.position.y);
		this.gameScene.addChild(this.levelLabelText.textObject);

		this.waveText.textObject = this.hexi.text(initialState.wave, this.waveText.font, this.waveText.size,
			this.waveText.color,
			this.waveText.position.x, this.waveText.position.y);
		this.gameScene.addChild(this.waveText.textObject);

		this.waveLabelText.textObject = this.hexi.text(_this.waveLabelText.text, this.waveLabelText.font, this.waveLabelText.size,
			this.waveLabelText.color,
			this.waveLabelText.position.x, this.waveLabelText.position.y);
		this.gameScene.addChild(this.waveLabelText.textObject);

		this.scorePointsLabelText.textObject = this.hexi.text(_this.scorePointsLabelText.text, this.scorePointsLabelText.font, this.scorePointsLabelText.size,
			this.scorePointsLabelText.color,
			this.scorePointsLabelText.position.x, this.scorePointsLabelText.position.y);
		this.gameScene.addChild(this.scorePointsLabelText.textObject);

		this.gameTimeLabelText.textObject = this.hexi.text(_this.gameTimeLabelText.text, this.gameTimeLabelText.font, this.gameTimeLabelText.size,
			this.gameTimeLabelText.color,
			this.gameTimeLabelText.position.x, this.gameTimeLabelText.position.y);
		this.gameScene.addChild(this.gameTimeLabelText.textObject);
		this.gameScene.addChild(this.scorePointsLabelText.textObject);

		this.pauseButton.button = this.hexi.group();

		var pauseButton =this.hexi.rectangle(
			this.pauseButton.width, 
			this.pauseButton.height, 
			this.pauseButton.fillColor, 
			this.pauseButton.color, 
			1, 
			0, 0
		  );

		this.pauseButton.button.addChild(pauseButton);
		var textObject = this.hexi.text(_this.pauseButton.text[0], this.pauseButton.font, this.pauseButton.size,
			this.pauseButton.color,
			0, 0);

		this.pauseButton.button.addChild(textObject);
		this.pauseButton.button.textObject = textObject;
		textObject.setPosition(this.pauseButton.button.halfWidth - textObject.halfWidth, this.pauseButton.button.halfHeight - textObject.halfHeight);
		this.pauseButton.button.setPosition(this.pauseButton.position.x, this.pauseButton.position.y);
		this.pauseButton.button.interact = true;
		this.gameScene.addChild(this.pauseButton.button);

		this.pauseButton.button.release = function() {
			if (_this.pauseTapped != null) {
				_this.pauseButton.button.textObject.content = _this.pauseButton.text[_this.hexi.paused ? 0 : 1];
				_this.pauseButton.button.textObject.setPosition(
					_this.pauseButton.button.halfWidth - _this.pauseButton.button.textObject.halfWidth, 
					_this.pauseButton.button.halfHeight - _this.pauseButton.button.textObject.halfHeight);
				_this.pauseTapped();
			}
		};
    }

    MainScreen.prototype.update = function (state) {
		this.lifeText.textObject.content = state.life;
		this.waveText.textObject.content = state.wave;
		this.levelText.textObject.content = state.level;
		this.scorePointsText.textObject.content = state.scorePoints;
		this.gameTimeText.textObject.content = String(state.gameTimeSeconds).toHHMMSS();
    };
    
    MainScreen.prototype.changeEnvironment = function (index) {
        this.environment.show(index);
	};

    return MainScreen;
}());