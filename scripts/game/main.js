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

	Main.gameArea = {
		top: 3,
		left: 140,
		bottom: 10,
		enemyBottom: 160,
		right: 78,
		padding: 6
	}

	Main.resources = [
		"images/environment1.png",
		"images/environment2.png",
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
		"sounds/pulse-plasma.wav",
		"sounds/laser.wav",

		"sounds/track0.ogg",
		"sounds/track1.ogg",
		"sounds/track2.ogg",
		"sounds/track3.ogg",
		"sounds/track4.ogg",

		"data/hero-configuration.json",
		"data/levels-configuration.json",
		"data/enemy-configuration.json"
	];

	Main.sounds = {
		"alienTorpedo": "sounds/alien-torpedo-shoot.wav",
		"redPlasma": "sounds/alien-red-plasma-shoot.wav",
		"heroTorpedo": "sounds/hero-torpedo-shoot.wav",
		"explode": "sounds/explode.wav",
		"green-plasma-shoot": "sounds/hero-green-plasma-shoot.wav",
		"alien-green-plasma-shoot": "sounds/alien-green-plasma-shoot.wav",
		"pulse-plasma": "sounds/pulse-plasma.wav",
		"laser": "sounds/laser.wav",
	};

	Main.soundTrackConfiguration = [
		"sounds/track1.ogg",
		"sounds/track2.ogg",
		"sounds/track3.ogg",
		"sounds/track4.ogg",
	];

	Main.prototype.configuration = {
		"enemyConfiguration": null,
		"heroConfiguration": null,
		"levelsConfiguration": null,

	}

	Main.levelWaveConfiguration = {
		1: {
			"environment": "images/environment1.png",
		},
		2: {
			"environment": "images/environment2.png"
		},
	};

	Main.waveToLevelMapping = {
		1: 0,
		25: 0,
		26: 1,
		49: 1,
		50: 2,
		74: 2,
		75: 3
	};

	Main.environments = [
		"images/environment1.png",
		"images/environment2.png"
	];

    Main.prototype.hexi = null;
    
    Main.prototype.inputDevice = null;

	Main.prototype.isMobile = false;



	Main.prototype.gameScene = null;

	Main.prototype.sounds = {
		"shoot": null
	};

	Main.prototype.soundTrack = null;
	Main.prototype.soundTracks = [];

    Main.prototype.resourcesPackage = "";
    
    Main.prototype.gameTimeSeconds = 0;

    Main.prototype.game = null;

	function Main($hexi, resourcesPackage, isMobile) {
		var _this = this;
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

	};

	Main.prototype.end = function () {

	};

	Main.prototype.setup = function () {
		var _this = this;

		_this.configuration = {
			"heroConfiguration": this.hexi.json("resources/{0}/data/hero-configuration.json".format(_this.resourcesPackage)),
			"levelsConfiguration": this.hexi.json("resources/{0}/data/levels-configuration.json".format(_this.resourcesPackage)),
			"enemyConfiguration": this.hexi.json("resources/{0}/data/enemy-configuration.json".format(_this.resourcesPackage))
		};

        this.hexi.pointer.visible = false;

        this.gameScene = this.hexi.group();
        this.screen = new MainScreen(_this.hexi, _this.resourcesPackage, this.gameScene);

		setInterval(function name(params) {
			_this.gameTimeSeconds++;
			_this.changeState();
		}, 1000);

		for (var key in Main.sounds) {
			if (Main.sounds.hasOwnProperty(key)) {
				this.sounds[key] = this.hexi.sound("resources/{0}/{1}".format(_this.resourcesPackage, Main.sounds[key]));
				//this.sounds[key].fade(0.3, 1);
			}
		}



		Main.soundTrackConfiguration.forEach(function (soundTrackName) {
			var soundObject = _this.hexi.sound("resources/{0}/{1}".format(_this.resourcesPackage, soundTrackName));
			soundObject.loop = true;
			_this.soundTracks.push(soundObject);
		});

		this.soundTrack = this.soundTracks[0];
		this.soundTrack.play();

		var gameArea = this.hexi.rectangle(
			this.hexi.canvas.width - Main.gameArea.right - Main.gameArea.left - Main.gameArea.padding,
			this.hexi.canvas.height - Main.gameArea.top - Main.gameArea.bottom - Main.gameArea.padding,
			null, "#785E3A", Main.gameArea.padding, Main.gameArea.left, Main.gameArea.top);
		gameArea.visible = false;
        this.gameScene.addChild(gameArea);
    

        this.screen.init({
            "life" : 1,
            "wave" : 1,
            "level": 1,
            "scorePoints" : 0,
            "gameTimeSeconds" : 0
        });

        this.game = new Game(this.hexi, _this);
        this.inputDevice = new InputDevice(_this.hexi, _this);
        this.inputDevice.init();

        this.game.onGameReseted = (function() {
            _this.gameTimeSeconds = 0;
            _this.changeState();
        }).bind(this);

        this.game.onLevelChanged = (function(currentWave) {
            _this.levelChanged(currentWave);
            _this.changeState();
        }).bind(this);

        this.game.hero.onLifeChanged = (function(currentWave) {
            _this.changeState();
        }).bind(this);
        
        this.game.onEnemyDestroyed = (function() {
            _this.changeState();
        }).bind(this);
        
		this.hexi.state = this.playLoop.bind(this);
	};

	Main.prototype.playLoop = function () {
		var _this = this;

        this.game.update();
		//this.gameScene.update();
	};

	Main.prototype.nextLevel = function () {
		this.gameScene.nextLevel();
		this.changeState();
    };
    
    Main.prototype.levelChanged = function(currentWave) {
        var _this = this;
        var levelValue = Main.waveToLevelMapping[currentWave];
		if (levelValue != null) {
			this.screen.changeEnvironment(levelValue);
			var nextSoundTrack = _this.soundTracks[levelValue];
			if (_this.soundTrack !== nextSoundTrack) {
				_this.soundTrack.pause();
				_this.soundTrack = nextSoundTrack;
				_this.soundTrack.playFrom(0);
			}
		}
    }


	Main.prototype.changeState = function () {
        this.screen.update({
            "life" : this.game.hero.life,
            "wave" : this.game.level.wave,
            "level": this.game.level.type,
            "scorePoints" : this.game.score.points,
            "gameTimeSeconds" : this.gameTimeSeconds
        });
	};

	return Main;
}());