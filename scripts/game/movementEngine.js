"use strict";

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