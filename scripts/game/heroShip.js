"use strict";

var HeroShip = /** @class */ (function (_super) {
	__extends(HeroShip, _super);

	HeroShip.prototype.weapons = [];

	HeroShip.prototype.invisibilityCounter = 0;

	HeroShip.prototype.collisionSprite = null;

	HeroShip.prototype.weaponSprites = {
		"leftWeapon": null,
		"rightWeapon": null
	};

	function HeroShip($hexi, game, main) {
		var _this = _super.call(this, $hexi, game, main) || this;
		_this.sprite = this.hexi.sprite(["HeroShip.png"]);
		_this.collisionSprite = this.hexi.rectangle(24, 20, "red", "red", 1);
		var weaponSprites = _this.hexi.json("resources/{0}/images/ships-texture.json".format(_this.resourcesPackage)).animations["Weapon"];
		_this.weaponSprites.leftWeapon = this.hexi.sprite(weaponSprites);
		_this.weaponSprites.rightWeapon = this.hexi.sprite(weaponSprites);

		_this.sprite.y = _this.hexi.canvas.height - 80;
		_this.sprite.putCenter(_this.collisionSprite, 0, 0);
		_this.sprite.putCenter(_this.weaponSprites.leftWeapon, -20, -15);
		_this.sprite.putCenter(_this.weaponSprites.rightWeapon, 20, -15);

		_this.sprite.playAnimation();
		_this.weaponSprites.leftWeapon.playAnimation();
		_this.weaponSprites.rightWeapon.playAnimation();
		_this.hexi.arrowControl(_this.sprite, Game.heroSpeed);

		_this.gameScene.addChild(_this.sprite);
		_this.gameScene.addChild(_this.collisionSprite);
		_this.gameScene.addChild(_this.weaponSprites.leftWeapon);
		_this.gameScene.addChild(_this.weaponSprites.rightWeapon);
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
			_this.sounds[_this.weapons[0].options.sound].play();
			playManualWeaponShootSound = false;
		}

		if (playAutomatedWeaponShootSound) {
			_this.sounds[_this.automatedWeapons[0].options.sound].play();
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
					: _this.hexi.json("resources/{0}/images/bullet-texture.json".format(_this.resourcesPackage)).animations[currentWeapon.animatedSprite]);
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
		var currentWeapon = _this.configuration.heroConfiguration.heroWeaponConfiguration[weapon.weapon];

		if (currentWeapon.type == "laser") {
			_this.shootWithLaser(currentWeapon, weapon);
		} else {
			_this.shootWithBullets(currentWeapon, weapon);
		}

	};

	HeroShip.prototype.setWeapon = function () {
		var _this = this;
		var weaponConfiguration = _this.configuration.heroConfiguration.heroLevelWeapons[this.life];

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
			var currentWeapon = _this.configuration.heroConfiguration.heroWeaponConfiguration[weapon.weapon];
			weapon.options = currentWeapon;
			weapon.weaponItensityCounter = 0;
		});

		this.automatedWeapons.forEach(function (weapon) {
			var currentWeapon = _this.configuration.heroConfiguration.heroWeaponConfiguration[weapon.weapon];
			weapon.options = currentWeapon;
			weapon.weaponItensityCounter = 0;
		});
	}

	HeroShip.prototype.upgrade = function () {
		this.life++;
        this.setWeapon();
        
        if (this.onLifeChanged) {
            this.onLifeChanged(this.life);
        }
	}

	HeroShip.prototype.downgrade = function () {
		this.life--;
		this.setWeapon();
        if (this.onLifeChanged) {
            this.onLifeChanged(this.life);
        }
	}

	HeroShip.prototype.hit = function (bullet) {
		this.hexi.stage.remove(bullet);

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
		this.hexi.stage.remove(upgradeItem);

		if (this.invisibilityCounter > 0) {
			return;
		}

		this.upgrade();

		this.invisibilityCounter = 25;
	};

	return HeroShip;
}(WeaponedShip));