"use strict";

/**
 * Main class
 * 
 * @class Main
 */
var Main = /** @class */ (function () {

	Main.graphics = {
		width: 640, //420,
		height: 480, //470,
		isScaleToWindow: false
	};

	Main.resources = [
		"images/environment1.png",
		"images/environment2.png",
		"images/environment3.png",
		"images/environment4.png",
		"images/interface.png",
		"images/life-icon.png",

		"images/ships-texture.json",
		"images/bullet-texture.json",

		"sounds/alien-torpedo-shoot.wav",
		"sounds/alien-red-plasma-shoot.wav",
		"sounds/hero-torpedo-shoot.wav",
		"sounds/explode.wav",
		"sounds/hero-green-plasma-shoot.wav",
		"sounds/alien-green-plasma-shoot.wav",
		"sounds/alien-blue-torpedo-shoot.wav",
		"sounds/alien-yellow-laser.wav",
		"sounds/pulse-plasma.wav",
		"sounds/laser.wav",

		"sounds/track0.ogg",
		"sounds/track1.ogg",
		"sounds/track2.ogg",
		"sounds/track3.ogg",
		"sounds/track4.ogg",

		"data/hero-configuration.json",
		"data/levels-configuration.json",
		"data/enemy-configuration.json",
		"data/ui-configuration.json",
	];

	Main.sounds = {
		"alienTorpedo": "sounds/alien-torpedo-shoot.wav",
		"redPlasma": "sounds/alien-red-plasma-shoot.wav",
		"heroTorpedo": "sounds/hero-torpedo-shoot.wav",
		"explode": "sounds/explode.wav",
		"green-plasma-shoot": "sounds/hero-green-plasma-shoot.wav",
		"alien-green-plasma-shoot": "sounds/alien-green-plasma-shoot.wav",
		"blue-torpedo": "sounds/alien-blue-torpedo-shoot.wav",
		"yellow-laser": "sounds/alien-yellow-laser.wav",
		"pulse-plasma": "sounds/pulse-plasma.wav",
		"laser": "sounds/laser.wav",
	};

	function Main($hexi, resourcesPackage, isMobile) {
		var _this = this;

		this.configuration = {
			"enemyConfiguration": null,
			"playerConfiguration": null,
			"levelsConfiguration": null,
		}
	
		this.inputDevice = null;
	
		this.isMobile = false;
	
		this.gameScene = null;
	
		this.sounds = {
			"shoot": null
		};
	
		this.soundTrack = null;
		this.soundTracks = [];
	
		this.gameTimeSeconds = 0;
	
		this.game = null;
		this.gameStorage = null;
	
		this.fpsCounter = 0;
		this.lifeCheatCounter = 0;
		this.nextLevelCheatCounter = 0;

		this.resourcesPackage = resourcesPackage;


		var normalizedResourcesPath = Main.resources.map(function (resource) {
			return "resources/{0}/{1}".format(_this.resourcesPackage, resource)
		});
		this.hexi = $hexi(Main.graphics.width, Main.graphics.height, this.setup.bind(this), normalizedResourcesPath, this.load.bind(this), "webgl");
		//this.hexi.fps = 45;
	}

	Main.prototype.getResources = function () {
	};

	Main.prototype.init = function () {
		this.hexi.border = "1px violet dashed";
		this.hexi.backgroundColor = 0x000000;

		if (Main.graphics.isScaleToWindow || this.isMobile) {
			/*
						var docelem = document.documentElement;
			
						if (docelem.requestFullscreen) {
							docelem.requestFullscreen();
						}
						else if (docelem.mozRequestFullScreen) {
							docelem.mozRequestFullScreen();
						}
						else if (docelem.webkitRequestFullscreen) {
							docelem.webkitRequestFullscreen();
						}
						else if (docelem.msRequestFullscreen) {
							docelem.msRequestFullscreen();
						}*/
			this.hexi.scaleToWindow();
		}

		this.hexi.start();
	};

	Main.prototype.load = function () {
		this.hexi.loadingBar();
	};

	Main.prototype.end = function () {

	};

	Main.prototype.setup = function () {
		var _this = this;

		_this.configuration = {
			"playerConfiguration": this.hexi.json("resources/{0}/data/hero-configuration.json".format(_this.resourcesPackage)),
			"levelsConfiguration": this.hexi.json("resources/{0}/data/levels-configuration.json".format(_this.resourcesPackage)),
			"enemyConfiguration": this.hexi.json("resources/{0}/data/enemy-configuration.json".format(_this.resourcesPackage)),
			"uiConfiguration": this.hexi.json("resources/{0}/data/ui-configuration.json".format(_this.resourcesPackage)),
		};

		this.hexi.pointer.visible = false;

		this.gameScene = this.hexi.group();

		this.screen = new MainScreen(_this.hexi, _this.resourcesPackage, this.gameScene, _this.configuration.levelsConfiguration.levels,
			_this.configuration.uiConfiguration.screens.mainScreen);

		for (var key in Main.sounds) {
			if (Main.sounds.hasOwnProperty(key)) {
				this.sounds[key] = this.hexi.sound("resources/{0}/{1}".format(_this.resourcesPackage, Main.sounds[key]));
				//this.sounds[key].fade(0.3, 1);
			}
		}

		this.soundTracks = Object.values(_this.configuration.levelsConfiguration.levels).map(function (level) {
			var soundObject = _this.hexi.sound("resources/{0}/{1}".format(_this.resourcesPackage, level.soundTrack));
			soundObject.loop = true;
			return soundObject;
		});

		this.soundTrack = this.soundTracks[0];
		this.soundTrack.play();

		var gameArea = this.hexi.rectangle(
			this.hexi.canvas.width - _this.configuration.uiConfiguration.gameArea.right
				- _this.configuration.uiConfiguration.gameArea.left
				- _this.configuration.uiConfiguration.gameArea.padding,
			this.hexi.canvas.height - _this.configuration.uiConfiguration.gameArea.top 
				- _this.configuration.uiConfiguration.gameArea.bottom 
				- _this.configuration.uiConfiguration.gameArea.padding,
			null, "#785E3A", _this.configuration.uiConfiguration.gameArea.padding, 
			_this.configuration.uiConfiguration.gameArea.left, _this.configuration.uiConfiguration.gameArea.top);
		gameArea.visible = false;
		this.gameScene.addChild(gameArea);


		this.screen.init({
			"life": 1,
			"wave": 1,
			"level": 1,
			"scorePoints": 0,
			"gameTimeSeconds": 0
		});

		this.game = new Game(this.hexi, _this);
		this.inputDevice = new InputDevice(_this.hexi, _this);
		this.gameStorage = new GameStorage(_this.hexi, _this);

		this.screen.lifeTapped = this.inputDevice.lifeTapped.bind(this.inputDevice);
		this.screen.nextLevelTapped = this.inputDevice.nextLevelTapped.bind(this.inputDevice);
		this.screen.pauseTapped = this.inputDevice.pauseTapped.bind(this.inputDevice);
		this.screen.loadTapped = this.inputDevice.loadTapped.bind(this.inputDevice);
		this.screen.storeTapped = this.inputDevice.storeTapped.bind(this.inputDevice);
		this.screen.resetTapped = this.inputDevice.resetTapped.bind(this.inputDevice);
		this.inputDevice.init();

		this.game.onGameReseted = (function () {
			_this.gameTimeSeconds = 0;
			_this.changeState();
		}).bind(this);

		this.game.onLevelChanged = (function (currentWave) {
			_this.levelChanged(currentWave);
			_this.changeState();
		}).bind(this);

		this.game.player.onLifeChanged = (function (currentWave) {
			_this.changeState();
		}).bind(this);

		this.game.onEnemyDestroyed = (function () {
			_this.changeState();
		}).bind(this);

		this.hexi.state = this.playLoop.bind(this);
		_this.changeState();
	};

	Main.prototype.playLoop = function () {
		var _this = this;

		this.game.update();
		//this.gameScene.update();

		this.fpsCounter++;
		if (this.fpsCounter >= (this.hexi.smoothie.fps || 60)) {
			this.fpsCounter = 0;
			_this.gameTimeSeconds++;
			_this.changeState();
		}
		this.lifeCheatCounter--;
	};

	Main.prototype.nextLevel = function () {
		this.gameScene.nextLevel();
		this.changeState();
	};

	Main.prototype.levelChanged = function (currentWave) {
		var _this = this;
		var wave = this.configuration.levelsConfiguration.waves[currentWave];
		if (wave != null) {
			var levelValue = wave.level;
			this.screen.changeEnvironment(levelValue);
			var nextSoundTrack = _this.soundTracks[levelValue - 1];
			if (_this.soundTrack !== nextSoundTrack) {
				_this.soundTrack.pause();
				_this.soundTrack = nextSoundTrack;
				_this.soundTrack.playFrom(0);
			}
		}
	}


	Main.prototype.changeState = function () {
		this.screen.update({
			"life": this.game.player.life,
			"wave": this.game.level.wave,
			"level": this.game.level.type,
			"scorePoints": this.game.score.points,
			"gameTimeSeconds": this.gameTimeSeconds
		});
	};

	Main.prototype.saveGame = function () {
		this.gameStorage.save();
	};

	Main.prototype.loadGame = function () {
		var saveState = this.gameStorage.load();
		if (!saveState) {
			return;
		}
		this.gameTimeSeconds = saveState.gameTimeSeconds;
		this.game.restoreState(saveState);
		this.changeState();
	};

	return Main;
}());