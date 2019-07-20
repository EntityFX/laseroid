"use strict";

var WeaponedShip = /** @class */ (function (_super) {
	__extends(WeaponedShip, _super);

	WeaponedShip.prototype.isWeaponShooting = false;

	WeaponedShip.prototype.canShot = false;

	WeaponedShip.prototype.automatedWeapons = [];

	function WeaponedShip($hexi, game, main) {
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