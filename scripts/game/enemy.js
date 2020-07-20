"use strict";

var Enemy = /** @class */ (function (_super) {
	__extends(Enemy, _super);

	function Enemy($hexi, game, main, type, altLife) {
		var _this = _super.call(this, $hexi, game, main) || this;
		_this.type = type;
		_this.shipConfiguration = deepCopy(_this.configuration.enemyConfiguration.enemyShipsConfiguration[type]);

		_this.sprite = _this.hexi.sprite(_this.shipConfiguration.sprite
			? _this.shipConfiguration.sprite
			: _this.hexi.json("resources/{0}/images/ships-texture.json".format(_this.resourcesPackage)).animations[_this.shipConfiguration.animatedSprite]);
		if (_this.shipConfiguration.animatedSprite) {
			_this.sprite.playAnimation();
		}
		_this.syncWeapons = null;
		_this.setWeapon();
		_this.gameScene.addChild(_this.sprite);

		_this.life = altLife != null ? altLife : _this.shipConfiguration.life;
		_this.initialLife = _this.shipConfiguration.life;

		_this.lifeText =  {
			"position": {
				"x": 0,
				"y": 0
			},
			"font": "sans-serif",
			"size": "10px",
			"color": "#00F000"
		};
		_this.textObject = _this.hexi.text(_this.life + "/" + _this.initialLife, _this.lifeText.font, _this.lifeText.size,
		_this.getLifeColor(),
		_this.lifeText.position.x, _this.lifeText.position.y);
		_this.sprite.addChild(_this.textObject);
		_this.sprite.putTop(this.textObject, 0, -3);

		_this.lifeLine = _this.hexi.line(_this.getLifeColor(), 2, 0, 0, _this.sprite.width, 0);
		_this.sprite.addChild(_this.lifeLine);
		_this.sprite.putTop(this.lifeLine, -this.sprite.halfWidth + 1, 0);
		_this.setLifeLine();

        _this.movementEngine = new MovementEngine($hexi, _this.sprite, game.player.sprite,
			 _this.shipConfiguration.movement, _this.configuration.enemyConfiguration.enemyMovementConfiguration
			 , _this.configuration.uiConfiguration.gameArea);


		return _this;
	}

	Enemy.prototype.update = function () {
		_super.prototype.update.call(this);

		var _this = this;

		if (this.sprite.parent == null) return;

		this.updateShooting();
		this.movementEngine.update();
	};

	Enemy.prototype.setWeapon = function () {
		var _this = this;
		this.automatedWeapons = deepCopy(_this.shipConfiguration.weapons);

		this.syncWeapons = {
			"grouppedWeapons": null,
			"grouppedCounters": {}
		};

		if (_this.shipConfiguration.isSyncWeapon) {
			this.automatedWeapons.forEach(function (weapon) {
				var currentWeapon = _this.configuration.enemyConfiguration.enemyWeaponConfiguration[weapon.weapon];
				weapon.options = currentWeapon;
			});


			_this.syncWeapons.grouppedWeapons = groupBy(this.automatedWeapons, "weapon");
			for (var weaponKey in _this.syncWeapons.grouppedWeapons) {
				if (_this.syncWeapons.grouppedWeapons.hasOwnProperty(weaponKey)) {
					var weapons = _this.syncWeapons.grouppedWeapons[weaponKey];
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
				var currentWeapon = _this.configuration.enemyConfiguration.enemyWeaponConfiguration[weapon.weapon];
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

	Enemy.prototype.updateShooting = function () {
		_super.prototype.updateShooting.call(this);
		var _this = this;

		if (!_this.isWeaponShooting) {
			return;
		}

		if (_this.shipConfiguration.isSyncWeapon) {
			if (this.syncWeapons == null || _this.syncWeapons.grouppedWeapons == null) {
				return;
			}

			for (var weaponKey in _this.syncWeapons.grouppedWeapons) {
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

	Enemy.prototype.shootWithWeapon = function (weapon) {
		var _this = this;
		var currentWeapon = _this.configuration.enemyConfiguration.enemyWeaponConfiguration[weapon.weapon];

		var speed = currentWeapon.speed.min && currentWeapon.speed.max
		? _this.hexi.randomFloat(currentWeapon.speed.min, currentWeapon.speed.max)
		: currentWeapon.speed;
			
		speed = weapon.speedMultiplier ? weapon.speedMultiplier * speed : speed;

		_this.hexi.shoot(
			_this.sprite, weapon.angle ? weapon.angle : 1.57,   // 3/2*pi          
			weapon.position.x,
			_this.sprite.halfHeight + weapon.position.y,
			_this.hexi.stage,
			speed, _this.game.bulletsController.enemyBullets,
			(function () {
				var bulletSprite = _this.hexi.sprite(currentWeapon.sprite
					? currentWeapon.sprite
					: _this.hexi.json("resources/{0}/images/bullet-texture.json".format(_this.resourcesPackage)).animations[currentWeapon.animatedSprite]);
				if (currentWeapon.animatedSprite) {
					bulletSprite.playAnimation();
				}
				bulletSprite.weapon = currentWeapon;
				return bulletSprite;
			}).bind(_this)
		);

		if (_this.isSoundsEnabled) {
			_this.sounds[currentWeapon.sound].play();
		}
	};

	Enemy.prototype.hit = function (bullet) {
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
            if (this.onDestroyed) {
                this.onDestroyed();
            }
			this.remove();
		}
		this.setLifeLine();
	};

	Enemy.prototype.setLifeLine = function() {
		this.textObject.content = this.life + "/" + this.initialLife;
		this.sprite.putTop(this.textObject, 0, -3);
		this.textObject.style.fill = this.getLifeColor();
		this.lifeLine.strokeStyle  = this.getLifeColor();
		this.lifeLine.scaleX = this.life / this.initialLife;
	}
	
	Enemy.prototype.getLifeColor = function() {
		var r = 255 - (this.life / this.initialLife * 128);
		var g = (this.life / this.initialLife * 255);
		var b = 0;
		return rgbToHex(r, g, b);
	}


	return Enemy;
}(WeaponedActor));