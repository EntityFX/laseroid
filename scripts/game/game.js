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

		"data/hero-weapon-configuration.json",
		"data/levels-configuration.json",
		"data/enemy-ships-configuration.json",
		"data/enemy-movement-configuration.json",
		"data/hero-level-weapons-configuration.json",
		"data/enemy-weapon-configuration.json",
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

	Main.upgradeConfiguration = {
		"upgrade1": {
			"sprite": "Upgrade.png",
			"speed": 3
		}
	};

	Main.bonusShipsConfiguration = {
		"bonus1": {
			"animatedSprite": "PowerUps",
			"movement": "horizontalNormal",
			"upgradeBonus": {
				"type": "upgrade1", "position": { x: 0, y: 0 },
				"killPoints": 100
			}
		},
	};

	Main.prototype.configuration = {
		"enemyShipsConfiguration": null,
		"enemyMovementConfiguration": null,
		"heroLevelWeapons": null,
		"enemyWeaponConfiguration": null,
		"heroWeaponConfiguration": null,
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
		26: 1
	};

	Main.environments = [
		"images/environment1.png",
		"images/environment2.png"
	];

	Main.heroSpeed = 10;

	Main.prototype.hexi = null;

	Main.prototype.hero = null;

	Main.prototype.bulletsController = null;

	Main.prototype.enemies = [];

	Main.prototype.bonuses = [];

	Main.prototype.isMobile = false;

	Main.prototype.upgrades = [];

	Main.prototype.explosionSplashes = [];

	Main.prototype.gameScene = null;

	Main.prototype.interface = null;

	Main.prototype.lifeIcon = null;

	Main.prototype.environment = null;

	Main.prototype.gameTimeSeconds = 0;

	Main.prototype.sounds = {
		"shoot": null
	};

	Main.prototype.soundTrack = null;
	Main.prototype.soundTracks = [];

	Main.prototype.lifeText = {
		"position": { "x": 178, "y": 438 },
		"textObject": null,
		"font": "sans-serif",
		"size": "18px",
		"color": "#09BC09"
	};

	Main.prototype.waveText = {
		"position": { "x": 620, "y": 23 },
		"textObject": null,
		"font": "sans-serif",
		"size": "12px",
		"color": "#F0F0F0"
	};

	Main.prototype.levelText = {
		"position": { "x": 620, "y": 5 },
		"textObject": null,
		"font": "sans-serif",
		"size": "12px",
		"color": "#F0F0F0"
	};

	Main.prototype.scorePointsText = {
		"position": { "x": 4, "y": 96 },
		"textObject": null,
		"font": "sans-serif",
		"size": "12px",
		"color": "#B2B2B2"
	};

	Main.prototype.gameTimeText = {
		"position": { "x": 4, "y": 136 },
		"textObject": null,
		"font": "sans-serif",
		"size": "12px",
		"color": "#B2B2B2"
	};


	Main.prototype.levelLabelText = {
		"position": { "x": 565, "y": 5 },
		"textObject": null,
		"font": "sans-serif",
		"size": "12px",
		"color": "#99CC00",
		"text": "LEVEL"
	};

	Main.prototype.waveLabelText = {
		"position": { "x": 565, "y": 23 },
		"textObject": null,
		"font": "sans-serif",
		"size": "12px",
		"color": "#9DD19D",
		"text": "WAVE"
	};

	Main.prototype.scorePointsLabelText = {
		"position": { "x": 4, "y": 80 },
		"textObject": null,
		"font": "sans-serif",
		"size": "12px",
		"color": "#FFFFFF",
		"text": "SCORE"
	};

	Main.prototype.gameTimeLabelText = {
		"position": { "x": 4, "y": 120 },
		"textObject": null,
		"font": "sans-serif",
		"size": "12px",
		"color": "#FFFFFF",
		"text": "TIME"
	};

	Main.prototype.level = {
		"wave": 1,
		"type": 1
	};

	Main.prototype.score = {
		"points": 0
	};

	function Main($hexi, isMobile) {
		this.hexi = $hexi(Main.graphics.width, Main.graphics.height, this.setup.bind(this), Main.resources, this.load.bind(this), "webgl");
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
			"heroWeaponConfiguration": this.hexi.json("data/hero-weapon-configuration.json"),
			"levelsConfiguration": this.hexi.json("data/levels-configuration.json"),
			"enemyShipsConfiguration": this.hexi.json("data/enemy-ships-configuration.json"),
			"enemyMovementConfiguration": this.hexi.json("data/enemy-movement-configuration.json"),
			"heroLevelWeapons": this.hexi.json("data/hero-level-weapons-configuration.json"),
			"enemyWeaponConfiguration": this.hexi.json("data/enemy-weapon-configuration.json")
		};

		this.hexi.pointer.visible = false;

		setInterval(function name(params) {
			_this.gameTimeSeconds++;
			_this.changeState();
		}, 1000);

		for (var key in Main.sounds) {
			if (Main.sounds.hasOwnProperty(key)) {
				this.sounds[key] = this.hexi.sound(Main.sounds[key]);
				//this.sounds[key].fade(0.3, 1);
			}
		}

		this.gameScene = this.hexi.group();

		this.interface = this.hexi.sprite("images/interface.png");

		this.environment = this.hexi.sprite(Main.environments, 146, 9);
		this.environment.show(0);

		Main.soundTrackConfiguration.forEach(function (soundTrackName) {
			var soundObject = _this.hexi.sound(soundTrackName);
			soundObject.loop = true;
			_this.soundTracks.push(soundObject);
		});

		this.soundTrack = this.soundTracks[0];
		this.soundTrack.play();

		this.lifeIcon = this.hexi.sprite("images/life-icon.png", 149, 434);

		var gameArea = this.hexi.rectangle(
			this.hexi.canvas.width - Main.gameArea.right - Main.gameArea.left - Main.gameArea.padding,
			this.hexi.canvas.height - Main.gameArea.top - Main.gameArea.bottom - Main.gameArea.padding,
			null, "#785E3A", Main.gameArea.padding, Main.gameArea.left, Main.gameArea.top);
		gameArea.visible = false;
		this.gameScene.addChild(gameArea);
		this.gameScene.addChild(this.environment);


		this.hero = new HeroShip(this.hexi, this);
		this.bulletsController = new BulletsController(this.hexi, this);

		this.lifeText.textObject = this.hexi.text(_this.hero.life, this.lifeText.font, this.lifeText.size,
			this.lifeText.color,
			this.lifeText.position.x, this.lifeText.position.y);
		this.gameScene.addChild(this.lifeText.textObject);

		this.levelText.textObject = this.hexi.text(_this.level.type, this.levelText.font, this.levelText.size,
			this.levelText.color,
			this.levelText.position.x, this.levelText.position.y);
		this.gameScene.addChild(this.levelText.textObject);

		this.scorePointsText.textObject = this.hexi.text(_this.level.type, this.scorePointsText.font, this.scorePointsText.size,
			this.scorePointsText.color,
			this.scorePointsText.position.x, this.scorePointsText.position.y);
		this.gameScene.addChild(this.scorePointsText.textObject);
		this.gameScene.addChild(this.levelText.textObject);

		this.gameTimeText.textObject = this.hexi.text(String(_this.gameTimeSeconds).toHHMMSS(), this.gameTimeText.font, this.gameTimeText.size,
			this.gameTimeText.color,
			this.gameTimeText.position.x, this.gameTimeText.position.y);
		this.gameScene.addChild(this.gameTimeText.textObject);

		this.levelLabelText.textObject = this.hexi.text(_this.levelLabelText.text, this.levelLabelText.font, this.levelLabelText.size,
			this.levelLabelText.color,
			this.levelLabelText.position.x, this.levelLabelText.position.y);
		this.gameScene.addChild(this.levelLabelText.textObject);

		this.waveText.textObject = this.hexi.text(_this.level.wave, this.waveText.font, this.waveText.size,
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


		this.setupLevel(this.level.wave);
		this.changeState();

		this.hexi.pointer.press = (function () {
			this.hero.startShoot();
		}).bind(this);

		this.hexi.pointer.release = (function () {
			this.hero.stopShoot();
		}).bind(this);

		var spaceBar = this.hexi.keyboard(32);

		spaceBar.press = (function () {
			this.hero.startShoot();
		}).bind(this);

		spaceBar.release = (function () {
			this.hero.stopShoot();
		}).bind(this);

		var plusButton = this.hexi.keyboard(189);
		plusButton.press = (function () {
			this.hero.downgrade();
		}).bind(this);

		var minusButton = this.hexi.keyboard(187);
		minusButton.press = (function () {
			this.hero.upgrade();
		}).bind(this);

		var minusButton2 = this.hexi.keyboard(61);
		minusButton2.press = (function () {
			this.hero.upgrade();
		}).bind(this);


		var nextButton = this.hexi.keyboard(78);
		nextButton.press = (function () {
			this.nextLevel();
		}).bind(this);

		this.hexi.state = this.playLoop.bind(this);
	};

	Main.prototype.setupLevel = function (currentWave) {
		var _this = this;

		var levelValue = Main.waveToLevelMapping[currentWave];
		if (levelValue != null) {
			this.environment.show(levelValue);
			var nextSoundTrack = _this.soundTracks[levelValue];
			if (_this.soundTrack !== nextSoundTrack) {
				_this.soundTrack.pause();
				_this.soundTrack = nextSoundTrack;
				_this.soundTrack.playFrom(0);
			}
		}

		var currentLevel = this.configuration.levelsConfiguration[currentWave];

		currentLevel.enemies.forEach(function (enemyConfig) {
			var enemy = new EnemyShip(_this.hexi, _this, enemyConfig.type)
			enemy.setPosition(enemyConfig.position);
			_this.enemies.push(enemy);
		});

		if (currentLevel.bonuses) {
			currentLevel.bonuses.forEach(function (bonusConfig) {
				var bonusShip = new BonusShip(_this.hexi, _this, bonusConfig.type)
				bonusShip.setPosition(bonusConfig.position);
				_this.bonuses.push(bonusShip);
			});
		}
	}

	Main.prototype.resetGame = function () {
		var _this = this;
		this.hexi.pause();
		this.score.points = 0;
		this.gameTimeSeconds = 0;
		this.level.wave = 1;
		this.hero.life = 1;
		this.clearShips();

		this.setupLevel(this.level.wave);
		this.changeState();
		this.hexi.resume();
	};

	Main.prototype.clearShips = function () {
		var _this = this;
		this.enemies.forEach(function (enemy) {
			enemy.remove();
		});
		this.enemies = [];

		this.bonuses.forEach(function (bonus) {
			bonus.remove();
		});
		this.bonuses = [];

		this.upgrades.forEach(function (upgrade) {
			_this.hexi.stage.removeChild(upgrade);
		});
		this.upgrades = [];

		this.bulletsController.clearBullets();
	};

	Main.prototype.playLoop = function () {
		var _this = this;
		this.hero.update();


		this.enemies = this.enemies.filter(function (enemy) {
			enemy.update();
			return enemy.life > 0;
		});

		this.bonuses = this.bonuses.filter(function (bonus) {
			bonus.update();
			return bonus.sprite.parent;
		});

		if (this.enemies.length == 0 && this.bonuses.length == 0 && this.upgrades.length == 0) {
			this.nextLevel();
		}

		this.bulletsController.update();

		this.upgrades = this.upgrades.filter(function (upgradeItem) {
			if (upgradeItem.y >= _this.hexi.canvas.height + upgradeItem.height) {
				_this.hexi.stage.remove(upgradeItem);
			}

			if (_this.hexi.hitTestRectangle(upgradeItem, _this.hero.collisionSprite)) {
				_this.hero.hitUpgrade(upgradeItem);
			}
			return upgradeItem.parent;
		});

		this.explosionSplashes = this.explosionSplashes.filter(function (explosionSplash) {
			explosionSplash.ticks++;

			if (explosionSplash.ticks > 18) {
				_this.hexi.stage.remove(explosionSplash);
			}
			return explosionSplash.parent;
		});

		this.hexi.move(this.upgrades);
	};

	Main.prototype.nextLevel = function () {

		this.clearShips();
		this.level.wave++;
		this.setupLevel(this.level.wave);
		this.changeState();
	};


	Main.prototype.changeState = function () {
		this.lifeText.textObject.content = this.hero.life;
		this.waveText.textObject.content = this.level.wave;
		this.levelText.textObject.content = this.level.type;
		this.scorePointsText.textObject.content = this.score.points;
		this.gameTimeText.textObject.content = String(this.gameTimeSeconds).toHHMMSS();
	};

	return Main;
}());

var Ship = /** @class */ (function () {

	Ship.prototype.hexi = null;

	Ship.prototype.sprite = null;

	Ship.prototype.game = null;

	Ship.prototype.life = 1;

	function Ship($hexi, game) {
		this.hexi = $hexi;
		this.game = game;
	}

	Ship.prototype.move = function () {
	}


	Ship.prototype.update = function () {
	}

	Ship.prototype.setPosition = function (position) {
		this.sprite.setPosition(position.x, position.y);
	};

	Ship.prototype.remove = function () {
		this.game.gameScene.removeChild(this.sprite);
	};

	Ship.prototype.hit = function (bullet) {
		var explosionSplashSprite = this.hexi.sprite(this.hexi.json("images/bullet-texture.json").animations["Explosion"]);

		if (bullet.type == "laser") {
			this.sprite.putCenter(explosionSplashSprite, 0, 0);
		} else {
			bullet.putCenter(explosionSplashSprite, 0, 0);
		}
		explosionSplashSprite.playAnimation();
		explosionSplashSprite.ticks = 0;
		this.game.explosionSplashes.push(explosionSplashSprite);
		this.game.sounds["explode"].play();
	};

	return Ship;
}());

var WeaponedShip = /** @class */ (function (_super) {
	__extends(WeaponedShip, _super);

	WeaponedShip.prototype.isWeaponShooting = false;

	WeaponedShip.prototype.canShot = false;

	WeaponedShip.prototype.automatedWeapons = [];

	function WeaponedShip($hexi, game) {
		return _super !== null && _super.apply(this, arguments) || this;
	}

	WeaponedShip.prototype.startShoot = function () {
		this.isWeaponShooting = true;
		this.canShot = true;
		this.onShootStarted();
	}

	WeaponedShip.prototype.onShootStarted = function () {
	}

	WeaponedShip.prototype.stopShoot = function () {
		this.isWeaponShooting = false;
		this.onShootStopped();
	}

	WeaponedShip.prototype.onShootStopped = function () {
	}

	WeaponedShip.prototype.updateShooting = function () {
	};

	WeaponedShip.prototype.remove = function () {
		this.isWeaponShooting = false;
		this.life = 0;
		_super.prototype.remove.call(this);
	};

	return WeaponedShip;
}(Ship));

var HeroShip = /** @class */ (function (_super) {
	__extends(HeroShip, _super);

	HeroShip.prototype.weapons = [];

	HeroShip.prototype.invisibilityCounter = 0;

	HeroShip.prototype.collisionSprite = null;

	HeroShip.prototype.weaponSprites = {
		"leftWeapon": null,
		"rightWeapon": null
	};

	function HeroShip($hexi, game) {
		var _this = _super.call(this, $hexi, game) || this;
		_this.sprite = this.hexi.sprite(["HeroShip.png"]);
		_this.collisionSprite = this.hexi.rectangle(24, 20, "red", "red", 1);
		var weaponSprites = _this.hexi.json("images/ships-texture.json").animations["Weapon"];
		_this.weaponSprites.leftWeapon = this.hexi.sprite(weaponSprites);
		_this.weaponSprites.rightWeapon = this.hexi.sprite(weaponSprites);

		_this.sprite.y = _this.hexi.canvas.height - 80;
		_this.sprite.putCenter(_this.collisionSprite, 0, 0);
		_this.sprite.putCenter(_this.weaponSprites.leftWeapon, -20, -15);
		_this.sprite.putCenter(_this.weaponSprites.rightWeapon, 20, -15);

		_this.sprite.playAnimation();
		_this.weaponSprites.leftWeapon.playAnimation();
		_this.weaponSprites.rightWeapon.playAnimation();
		_this.hexi.arrowControl(_this.sprite, Main.heroSpeed);

		_this.game.gameScene.addChild(_this.sprite);
		_this.game.gameScene.addChild(_this.collisionSprite);
		_this.game.gameScene.addChild(_this.weaponSprites.leftWeapon);
		_this.game.gameScene.addChild(_this.weaponSprites.rightWeapon);
		_this.collisionSprite.visible = false
		_this.setWeapon();
		return _this;
	}

	HeroShip.prototype.update = function () {
		_super.prototype.update.call(this);

		//this.sprite.vy = 0;
		this.hexi.move(this.sprite);

		this.sprite.x = this.hexi.pointer.x;
		this.sprite.y = this.hexi.pointer.y;

		var collision = this.hexi.contain(this.sprite,
			{
				x: Main.gameArea.left + Main.gameArea.padding,
				y: this.hexi.canvas.height - Main.gameArea.enemyBottom + Main.gameArea.padding,
				width: this.hexi.canvas.width - Main.gameArea.right - Main.gameArea.padding,
				height: this.hexi.canvas.height - Main.gameArea.bottom - Main.gameArea.padding
			}, false);

		this.sprite.putCenter(this.collisionSprite, 0, 8);
		this.sprite.putCenter(this.weaponSprites.leftWeapon, -20, -15);
		this.sprite.putCenter(this.weaponSprites.rightWeapon, 20, -15);

		if (this.invisibilityCounter <= 0) {
			this.invisibilityCounter = 0;
		} else {
			this.invisibilityCounter--;
		}

		this.updateShooting();
	};

	HeroShip.prototype.onShootStarted = function () {
		var _this = this;
		_this.weapons.forEach(function (weapon) {
			if (weapon.weaponItensityCounter == 0) {
				weapon.weaponItensityCounter = weapon.options.intensity;
			}
		});
	}

	HeroShip.prototype.onShootStopped = function () {
		var _this = this;
		_this.weapons.forEach(function (weapon) {
			weapon.weaponItensityCounter = 0;
		});
	}

	HeroShip.prototype.updateShooting = function () {
		_super.prototype.updateShooting.call(this);
		var _this = this;

		var playManualWeaponShootSound = false;
		var playAutomatedWeaponShootSound = false;

		_this.automatedWeapons.forEach(function (weapon) {
			weapon.weaponItensityCounter++;

			if (weapon.weaponItensityCounter <= weapon.options.intensity) return;

			weapon.weaponItensityCounter = 0;
			_this.shootWithWeapon(weapon);
			playAutomatedWeaponShootSound = true;
		});

		_this.weapons.forEach(function (weapon) {
			if (_this.canShot) {
				weapon.weaponItensityCounter++;

				if (weapon.weaponItensityCounter <= weapon.options.intensity) return;

				weapon.weaponItensityCounter = 0;
				playManualWeaponShootSound = true;
			} else {
				return;
			}


			if (_this.isWeaponShooting) {
				_this.shootWithWeapon(weapon);
			} else {
				_this.canShot = false;
			}

		});

		if (playManualWeaponShootSound) {
			_this.game.sounds[_this.weapons[0].options.sound].play();
			playManualWeaponShootSound = false;
		}

		if (playAutomatedWeaponShootSound) {
			_this.game.sounds[_this.automatedWeapons[0].options.sound].play();
			playAutomatedWeaponShootSound = false;
		}
	}

	HeroShip.prototype.shootWithLaser = function (currentWeapon, weapon) {
		var _this = this;
		if (_this.game.bulletsController.heroLaser != null) {
			return;
		}
		var beam = _this.hexi.sprite(currentWeapon.sprites.beamSprite);
		beam.height = _this.sprite.y - Main.gameArea.top - Main.gameArea.padding;
		beam.x = weapon.position.x;
		beam.y = weapon.position.y;

		var shine = _this.hexi.sprite(currentWeapon.sprites.shineSprite);
		_this.sprite.putCenter(shine, 0, weapon.position.y - shine.halfHeight);

		_this.game.bulletsController.heroLaser = {
			"beam": beam,
			"shine": shine,
			"timeToLive": currentWeapon.timeToLive,
			"type": "laser",
			"hitEnemies": [],
			"hitMax": currentWeapon.hitMax,
			"weapon": currentWeapon
		};
	};

	HeroShip.prototype.shootWithBullets = function (currentWeapon, weapon) {
		var _this = this;
		_this.hexi.shoot(
			_this.sprite, 4.7124,   // 3/2*pi          
			weapon.position.x, - _this.sprite.halfHeight + weapon.position.y,
			_this.hexi.stage, currentWeapon.speed,
			_this.game.bulletsController.heroBullets,
			(function () {
				var bulletSprite = _this.hexi.sprite(currentWeapon.sprite
					? currentWeapon.sprite
					: _this.hexi.json("images/bullet-texture.json").animations[currentWeapon.animatedSprite]);
				if (currentWeapon.animatedSprite) {
					bulletSprite.playAnimation();
				}
				bulletSprite.weapon = currentWeapon;
				bulletSprite.hitEnemies = [];
				bulletSprite.type = currentWeapon.type;
				bulletSprite.hitMax = currentWeapon.hitMax;
				return bulletSprite;
			}).bind(_this));
	};

	HeroShip.prototype.shootWithWeapon = function (weapon) {
		var _this = this;
		var currentWeapon = _this.game.configuration.heroWeaponConfiguration[weapon.weapon];

		if (currentWeapon.type == "laser") {
			_this.shootWithLaser(currentWeapon, weapon);
		} else {
			_this.shootWithBullets(currentWeapon, weapon);
		}

	};

	HeroShip.prototype.setWeapon = function () {
		var _this = this;
		var weaponConfiguration = _this.game.configuration.heroLevelWeapons[this.life];

		if (!weaponConfiguration) return;

		this.weapons = deepCopy(weaponConfiguration.weapons);

		if (weaponConfiguration.automatedWeapons) {
			this.automatedWeapons = deepCopy(weaponConfiguration.automatedWeapons);
		} else {
			this.automatedWeapons = [];
		}

		if (this.automatedWeapons.length == 0) {
			this.weaponSprites.leftWeapon.visible = false;
			this.weaponSprites.rightWeapon.visible = false;
		}

		if (this.automatedWeapons.length == 1) {
			this.weaponSprites.leftWeapon.visible = true;
			this.weaponSprites.rightWeapon.visible = false;
		}

		if (this.automatedWeapons.length > 1) {
			this.weaponSprites.leftWeapon.visible = true;
			this.weaponSprites.rightWeapon.visible = true;
		}

		this.weapons.forEach(function (weapon) {
			var currentWeapon = _this.game.configuration.heroWeaponConfiguration[weapon.weapon];
			weapon.options = currentWeapon;
			weapon.weaponItensityCounter = 0;
		});

		this.automatedWeapons.forEach(function (weapon) {
			var currentWeapon = _this.game.configuration.heroWeaponConfiguration[weapon.weapon];
			weapon.options = currentWeapon;
			weapon.weaponItensityCounter = 0;
		});
	}

	HeroShip.prototype.upgrade = function () {
		this.life++;
		this.setWeapon();
		this.game.changeState();
	}

	HeroShip.prototype.downgrade = function () {
		this.life--;
		this.setWeapon();
		this.game.changeState();
	}

	HeroShip.prototype.hit = function (bullet) {
		this.game.hexi.stage.remove(bullet);

		if (this.invisibilityCounter > 0) {
			return;
		}

		this.downgrade();

		if (this.life <= 0) {
			this.game.resetGame();
		}

		this.invisibilityCounter = 25;
		_super.prototype.hit.call(this, bullet);
	};

	HeroShip.prototype.hitUpgrade = function (upgradeItem) {
		this.game.hexi.stage.remove(upgradeItem);

		if (this.invisibilityCounter > 0) {
			return;
		}

		this.upgrade();

		this.invisibilityCounter = 25;
	};

	return HeroShip;
}(WeaponedShip));

var MovementEngine =  /** @class */ (function () {

	MovementEngine.prototype.hexi = null;

	MovementEngine.prototype.sprite = null;

	MovementEngine.prototype.heroSprite = null;

	MovementEngine.prototype.movements = null;

	MovementEngine.prototype.firstMovement = null;

	MovementEngine.prototype.movementItensity = 0;

	MovementEngine.prototype.movementItensityCounter = 0;

	MovementEngine.prototype.movementItensitySlot = 0;

	MovementEngine.prototype.movementConfiguration = null;

	MovementEngine.prototype.movementConfigurationName = null;

	MovementEngine.prototype.isBounceBottom = true;

	function MovementEngine($hexi, sprite, heroSprite, movementConfigurationName, movementConfiguration) {
		this.hexi = $hexi;
		this.sprite = sprite;
		this.heroSprite = heroSprite;
		this.movementConfigurationName = movementConfigurationName;
		this.movementConfiguration = movementConfiguration;
		this.setMovement();
	}

	MovementEngine.prototype.update = function () {
		if (this.sprite.parent == null) return;

		this.hexi.move(this.sprite);

		this.updateMovement();
	};

	MovementEngine.prototype.setMovement = function () {
		var _this = this;

		this.movements = deepCopy(_this.movementConfiguration[_this.movementConfigurationName]);

		_this.firstMovement = this.movements.movements[0];
		var intensityOptions = _this.firstMovement.intensity[_this.movementItensitySlot];
		_this.movementItensity = _this.hexi.randomInt(intensityOptions.min, intensityOptions.max);
		_this.movementItensitySlot = _this.hexi.randomInt(0, _this.firstMovement.intensity.length - 1);

		if (_this.firstMovement.type == "freeMovementDown") {
			_this.sprite.vy = _this.firstMovement.speedDelta.vy;
			_this.isBounceBottom = false;
			_this.sprite.vx = (_this.hexi.randomInt(0, 1) == 0 ? -1 : 1) * _this.firstMovement.speedDelta.vx;
		}
		else if (_this.firstMovement.type == "followHero") {
			_this.sprite.vx = (_this.hexi.randomInt(0, 1) == 0 ? -1 : 1) * _this.firstMovement.speedDelta.vx;
			if (_this.sprite.x > _this.heroSprite.x) {
				_this.sprite.vx = -1 * Math.abs(this.sprite.vx);
			} else {
				_this.sprite.vx = Math.abs(this.sprite.vx);
			}
			_this.sprite.vy = _this.firstMovement.speedDelta.vy;
		}
		else {
			_this.sprite.vx = (_this.hexi.randomInt(0, 1) == 0 ? -1 : 1) * _this.firstMovement.speedDelta.vx;
			_this.sprite.vy = (_this.hexi.randomInt(0, 1) == 0 ? -1 : 1) * _this.firstMovement.speedDelta.vy;
		}
	};

	MovementEngine.prototype.updateMovement = function () {
		var _this = this;

		var collision = this.hexi.contain(this.sprite,
			{
				x: Main.gameArea.left + Main.gameArea.padding,
				y: Main.gameArea.top + Main.gameArea.padding,
				width: this.hexi.canvas.width - Main.gameArea.right - Main.gameArea.padding,
				height: this.hexi.canvas.height - Main.gameArea.enemyBottom - Main.gameArea.padding
			}, false, function (collision) {
				if (collision.has("left")) {
					_this.sprite.vx *= -1;
				}

				if (collision.has("right")) {
					_this.sprite.vx *= -1;
				}

				if (collision.has("top")) {
					_this.sprite.vy *= -1;
				}

				if (_this.isBounceBottom && collision.has("bottom")) {
					_this.sprite.vy *= -1;
				}
			});

		if (_this.firstMovement.type == "followHero") {
			if (_this.sprite.x > _this.heroSprite.x) {
				_this.sprite.vx = -1 * Math.abs(this.sprite.vx);
			} else {
				_this.sprite.vx = Math.abs(this.sprite.vx);
			}
		}

		_this.movementItensityCounter++;
		if (_this.movementItensityCounter <= _this.movementItensity) return;
		_this.movementItensityCounter = 0;

		var intensityOptions = _this.firstMovement.intensity[_this.movementItensitySlot];
		_this.movementItensity = _this.hexi.randomInt(intensityOptions.min, intensityOptions.max);

		_this.movementItensitySlot = _this.hexi.randomInt(0, _this.firstMovement.intensity.length - 1);

		if (_this.firstMovement.type == "freeMovementDown") {
			_this.sprite.vy = _this.firstMovement.speedDelta.vy;
			_this.sprite.vx = (_this.hexi.randomInt(0, 1) == 0 ? -1 : 1) * _this.sprite.vx;
		}
		else if (_this.firstMovement.type == "followHero") {
			_this.sprite.vy = (_this.hexi.randomInt(0, 1) == 0 ? -1 : 1) * _this.firstMovement.speedDelta.vy;
		}
		else {
			_this.sprite.vx = (_this.hexi.randomInt(0, 1) == 0 ? -1 : 1) * _this.sprite.vx;
			_this.sprite.vy = (_this.hexi.randomInt(0, 1) == 0 ? -1 : 1) * _this.firstMovement.speedDelta.vy;
		}
	};

	return MovementEngine;
}());

var EnemyShip = /** @class */ (function (_super) {
	__extends(EnemyShip, _super);

	EnemyShip.prototype.type = null;

	EnemyShip.prototype.shipConfiguration = null;

	EnemyShip.prototype.movementEngine = null;

	EnemyShip.prototype.syncWeapons = {
		"grouppedWeapons": null,
		"grouppedCounters": {}
	};

	function EnemyShip($hexi, game, type) {
		var _this = _super.call(this, $hexi, game) || this;
		_this.type = type;
		_this.shipConfiguration = deepCopy(game.configuration.enemyShipsConfiguration[type]);

		_this.sprite = _this.hexi.sprite(_this.shipConfiguration.sprite
			? _this.shipConfiguration.sprite
			: _this.hexi.json("images/ships-texture.json").animations[_this.shipConfiguration.animatedSprite]);
		if (_this.shipConfiguration.animatedSprite) {
			_this.sprite.playAnimation();
		}

		_this.setWeapon();
		_this.game.gameScene.addChild(_this.sprite);
		_this.life = _this.shipConfiguration.life;
		_this.movementEngine = new MovementEngine($hexi, _this.sprite, game.hero.sprite, _this.shipConfiguration.movement, game.configuration.enemyMovementConfiguration);

		return _this;
	}

	EnemyShip.prototype.update = function () {
		_super.prototype.update.call(this);

		var _this = this;

		if (this.sprite.parent == null) return;

		this.updateShooting();
		this.movementEngine.update();
	};

	EnemyShip.prototype.setWeapon = function () {
		var _this = this;
		this.automatedWeapons = deepCopy(_this.shipConfiguration.weapons);

		if (_this.shipConfiguration.isSyncWeapon) {
			this.automatedWeapons.forEach(function (weapon) {
				var currentWeapon = _this.game.configuration.enemyWeaponConfiguration[weapon.weapon];
				weapon.options = currentWeapon;
			});


			_this.syncWeapons.grouppedWeapons = groupBy(this.automatedWeapons, "weapon");
			for (const weaponKey in _this.syncWeapons.grouppedWeapons) {
				if (_this.syncWeapons.grouppedWeapons.hasOwnProperty(weaponKey)) {
					const weapons = _this.syncWeapons.grouppedWeapons[weaponKey];
					_this.syncWeapons.grouppedCounters[weaponKey] = {
						"weaponItensitySlot": 0,
						"weaponIntensity": 0,
						"weaponItensityCounter": 0,
						"intensityRepeatCounter": 0,
						"firstWeapon": null
					};
					var weaponCounters = _this.syncWeapons.grouppedCounters[weaponKey];
					weaponCounters.firstWeapon = weapons[0];
					var intensityOptions = weaponCounters.firstWeapon.options.intensity[
						weaponCounters.weaponItensitySlot];

					if (weaponCounters.firstWeapon.options.isRandomIntensity) {
						weaponCounters.weaponItensitySlot = _this.hexi.randomInt(0, weaponCounters.firstWeapon.options.intensity.length - 1);
					} else {
						weaponCounters.weaponItensitySlot = 0;
					}

					weaponCounters.weaponIntensity = _this.hexi.randomInt(intensityOptions.min, intensityOptions.max);
					intensityOptions.repeat = intensityOptions.repeat == undefined ? 1 : intensityOptions.repeat;
				}
			}

		} else {
			this.automatedWeapons.forEach(function (weapon) {
				var currentWeapon = _this.game.configuration.enemyWeaponConfiguration[weapon.weapon];
				weapon.options = currentWeapon;
				weapon.weaponItensitySlot = _this.hexi.randomInt(0, weapon.options.intensity.length - 1);
				if (weapon.isRandomIntensity) {
					weapon.weaponItensitySlot = _this.hexi.randomInt(0, weapon.options.intensity.length - 1);
				} else {
					weapon.weaponItensitySlot = 0;
				}

				var intensityOptions = weapon.options.intensity[weapon.weaponItensitySlot];
				weapon.weaponIntensity = _this.hexi.randomInt(intensityOptions.min, intensityOptions.max);
				weapon.weaponItensityCounter = 0;
				weapon.intensityRepeatCounter = 0;
				intensityOptions.repeat = intensityOptions.repeat == undefined ? 1 : intensityOptions.repeat;
			});
		}

		this.isWeaponShooting = true;
	};

	EnemyShip.prototype.updateShooting = function () {
		_super.prototype.updateShooting.call(this);
		var _this = this;

		if (!_this.isWeaponShooting) {
			return;
		}

		if (_this.shipConfiguration.isSyncWeapon) {
			for (const weaponKey in _this.syncWeapons.grouppedWeapons) {
				if (_this.syncWeapons.grouppedWeapons.hasOwnProperty(weaponKey)) {
					var weapons = _this.syncWeapons.grouppedWeapons[weaponKey];
					var weaponCounters = _this.syncWeapons.grouppedCounters[weaponKey];
					weaponCounters.weaponItensityCounter++;
					if (weaponCounters.weaponItensityCounter <= weaponCounters.weaponIntensity) continue;
					weaponCounters.weaponItensityCounter = 0;
					var intensityOptions = weaponCounters.firstWeapon.options.intensity[weaponCounters.weaponItensitySlot];

					if (intensityOptions.type == undefined || intensityOptions.type === "shoot") {
						weapons.forEach(function (weapon) {
							_this.shootWithWeapon(weapon);
						});
					}

					weaponCounters.weaponIntensity = _this.hexi.randomInt(intensityOptions.min, intensityOptions.max);

					weaponCounters.intensityRepeatCounter++;
					if (weaponCounters.intensityRepeatCounter < intensityOptions.repeat) {
						continue;
					}

					weaponCounters.intensityRepeatCounter = 0;
					if (weaponCounters.isRandomIntensity) {
						weaponCounters.weaponItensitySlot = _this.hexi.randomInt(0, weaponCounters.firstWeapon.options.intensity.length - 1);
					} else {
						weaponCounters.weaponItensitySlot++;

						if (weaponCounters.weaponItensitySlot > weaponCounters.firstWeapon.options.intensity.length - 1) {
							weaponCounters.weaponItensitySlot = 0;
						}
					}
				}
			}

		} else {
			this.automatedWeapons.forEach(function (weapon) {
				weapon.weaponItensityCounter++;

				if (weapon.weaponItensityCounter <= weapon.weaponIntensity) return;
				weapon.weaponItensityCounter = 0;
				var intensityOptions = weapon.options.intensity[weapon.weaponItensitySlot];

				if (intensityOptions.type == undefined || intensityOptions.type === "shoot") {
					_this.shootWithWeapon(weapon);
				}
				//console.log(weapon.weaponItensitySlot);

				weapon.weaponIntensity = _this.hexi.randomInt(intensityOptions.min, intensityOptions.max);
				//console.log(weapon.weaponIntensity);

				weapon.intensityRepeatCounter++;
				if (weapon.intensityRepeatCounter < intensityOptions.repeat) {
					return;
				}

				weapon.intensityRepeatCounter = 0;
				if (weapon.isRandomIntensity) {
					weapon.weaponItensitySlot = _this.hexi.randomInt(0, weapon.options.intensity.length - 1);
				} else {
					weapon.weaponItensitySlot++;

					if (weapon.weaponItensitySlot > weapon.options.intensity.length - 1) {
						weapon.weaponItensitySlot = 0;
					}
				}

			});
		}
	};

	EnemyShip.prototype.shootWithWeapon = function (weapon) {
		var _this = this;
		var currentWeapon = _this.game.configuration.enemyWeaponConfiguration[weapon.weapon];

		_this.hexi.shoot(
			_this.sprite, weapon.angle ? weapon.angle : 1.57,   // 3/2*pi          
			weapon.position.x,
			_this.sprite.halfHeight + weapon.position.y,
			_this.hexi.stage,
			currentWeapon.speed.min && currentWeapon.speed.max
				? _this.hexi.randomFloat(currentWeapon.speed.min, currentWeapon.speed.max)
				: currentWeapon.speed,
			_this.game.bulletsController.enemyBullets,
			(function () {
				var bulletSprite = _this.hexi.sprite(currentWeapon.sprite
					? currentWeapon.sprite
					: _this.hexi.json("images/bullet-texture.json").animations[currentWeapon.animatedSprite]);
				if (currentWeapon.animatedSprite) {
					bulletSprite.playAnimation();
				}
				bulletSprite.weapon = currentWeapon;
				return bulletSprite;
			}).bind(_this)
		);

		_this.game.sounds[currentWeapon.sound].play();
	};

	EnemyShip.prototype.hit = function (bullet) {
		if (bullet.type == "laser") {
			if (bullet.hitEnemies.indexOf(this) == -1 && bullet.hitEnemies.length < bullet.hitMax) {
				bullet.hitEnemies.push(this);
				this.life -= bullet.weapon.hitPoints;
				_super.prototype.hit.call(this, bullet);
			}
		} else if (bullet.type == "pulsePlasma") {
			if (bullet.hitEnemies.indexOf(this) == -1 && bullet.hitEnemies.length < bullet.hitMax) {
				bullet.hitEnemies.push(this);
				this.life -= bullet.weapon.hitPoints;
				_super.prototype.hit.call(this, bullet);
			}
		} else {
			this.game.hexi.stage.remove(bullet);
			this.life -= bullet.weapon.hitPoints;
			_super.prototype.hit.call(this, bullet);
		}
		if (this.life <= 0) {
			this.game.score.points += this.shipConfiguration.killPoints;
			this.game.changeState();
			this.remove();
		}
	};


	return EnemyShip;
}(WeaponedShip));

var BonusShip = /** @class */ (function (_super) {
	__extends(BonusShip, _super);

	BonusShip.prototype.type = null;

	BonusShip.prototype.shipConfiguration = null;

	BonusShip.prototype.upgradeBonuses = null;

	BonusShip.prototype.movementEngine = null;

	function BonusShip($hexi, game, type) {
		var _this = _super.call(this, $hexi, game) || this;
		_this.type = type;
		_this.shipConfiguration = deepCopy(Main.bonusShipsConfiguration[type]);

		_this.sprite = _this.hexi.sprite(_this.shipConfiguration.sprite
			? _this.shipConfiguration.sprite
			: _this.hexi.json("images/ships-texture.json").animations[_this.shipConfiguration.animatedSprite]);
		if (_this.shipConfiguration.animatedSprite) {
			_this.sprite.playAnimation();
		}

		this.upgradeBonus = deepCopy(_this.shipConfiguration.upgradeBonus);

		_this.game.gameScene.addChild(_this.sprite);
		_this.life = _this.shipConfiguration.life;

		_this.movementEngine = new MovementEngine($hexi, _this.sprite, game.hero.sprite, _this.shipConfiguration.movement, game.configuration.enemyMovementConfiguration);

		return _this;
	}

	BonusShip.prototype.hit = function (bullet) {
		this.game.hexi.stage.remove(bullet);
		this.remove();
		_super.prototype.hit.call(this, bullet);
		this.shootWithUpgrade(this.upgradeBonus);
	};

	BonusShip.prototype.shootWithUpgrade = function (upgradeBonus) {
		var _this = this;
		//_this.game.sounds.shoot.play();
		var upgradeBonusConfig = Main.upgradeConfiguration[upgradeBonus.type];

		_this.hexi.shoot(
			_this.sprite, 1.57,
			_this.sprite.halfWidth + upgradeBonus.position.x, upgradeBonus.position.y,
			_this.hexi.stage, upgradeBonusConfig.speed,
			_this.game.upgrades,
			(function () {

				var upgradeSprite = _this.hexi.sprite(upgradeBonusConfig.sprite
					? upgradeBonusConfig.sprite
					: _this.hexi.json("images/bullet-texture.json").animations[upgradeBonusConfig.animatedSprite]);
				if (upgradeBonusConfig.animatedSprite) {
					upgradeSprite.playAnimation();
				}
				return upgradeSprite;
			}).bind(_this)
		);
	};

	BonusShip.prototype.update = function () {
		_super.prototype.update.call(this);

		if (this.sprite.parent == null) return;

		var collision = this.hexi.contain(this.sprite,
			{
				x: Main.gameArea.left + Main.gameArea.padding,
				y: Main.gameArea.top + Main.gameArea.padding,
				width: this.hexi.canvas.width - Main.gameArea.right - Main.gameArea.padding,
				height: this.hexi.canvas.height - Main.gameArea.enemyBottom - Main.gameArea.padding
			}, true);

		this.movementEngine.update();
	};

	return BonusShip;
}(Ship));

var BulletsController = /** @class */ (function () {
	BulletsController.prototype.hexi = null;

	BulletsController.prototype.game = null;

	BulletsController.prototype.heroBullets = [];

	BulletsController.prototype.heroLaser = null;

	BulletsController.prototype.enemyBullets = [];

	function BulletsController($hexi, game) {
		this.hexi = $hexi;
		this.game = game;
	}

	BulletsController.prototype.update = function () {
		var _this = this;
		this.heroBullets = this.heroBullets.filter(function (bullet) {
			if (bullet.y < -bullet.height) {
				_this.hexi.stage.remove(bullet);
			}

			_this.game.enemies.forEach(function (enemy) {
				if (_this.hexi.hitTestRectangle(bullet, enemy.sprite)) {
					enemy.hit(bullet);
				}
			})

			_this.game.bonuses.forEach(function (bonus) {
				if (_this.hexi.hitTestRectangle(bullet, bonus.sprite)) {
					bonus.hit(bullet);
				}
			})

			return bullet.parent;
		});

		if (_this.heroLaser) {
			_this.heroLaser.beam.x = _this.game.hero.sprite.x - _this.heroLaser.beam.halfWidth;
			_this.heroLaser.shine.x = _this.game.hero.sprite.x - _this.heroLaser.shine.halfWidth;
			_this.heroLaser.timeToLive--;

			_this.game.enemies.forEach(function (enemy) {
				if (_this.hexi.hitTestRectangle(_this.heroLaser.beam, enemy.sprite)) {
					enemy.hit(_this.heroLaser);
				}
			})

			_this.game.bonuses.forEach(function (bonus) {
				if (_this.hexi.hitTestRectangle(_this.heroLaser.beam, bonus.sprite)) {
					bonus.hit(_this.heroLaser);
				}
			})

			if (_this.heroLaser.timeToLive <= 0) {
				_this.hexi.stage.remove(_this.heroLaser.beam);
				_this.hexi.stage.remove(_this.heroLaser.shine);
				_this.heroLaser.beam.alpha = _this.heroLaser.timeToLive % 2 === 1 ? 1 : 0.1;
				_this.heroLaser = null;
			}
		}

		this.enemyBullets = this.enemyBullets.filter(function (bullet) {

			if (bullet.y >= _this.hexi.canvas.height + bullet.height) {
				_this.hexi.stage.remove(bullet);
			}

			if (_this.hexi.hitTestRectangle(bullet, _this.game.hero.collisionSprite)) {
				_this.game.hero.hit(bullet);
			}

			return bullet.parent;
		});

		this.hexi.move(this.heroBullets);
		this.hexi.move(this.enemyBullets);
	}

	BulletsController.prototype.clearBullets = function () {
		var _this = this;
		this.enemyBullets.forEach(function (bullet) {
			_this.hexi.stage.removeChild(bullet);
		});
		this.enemyBullets = [];

		this.heroBullets.forEach(function (bullet) {
			_this.hexi.stage.removeChild(bullet);
		});
		this.heroBullets = [];
	}

	return BulletsController;
}());