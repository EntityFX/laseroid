var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

function deepCopy(o) {
    var output, v, key;
    output = Array.isArray(o) ? [] : {};
    for (key in o) {
        v = o[key];
        output[key] = (typeof v === "object") ? deepCopy(v) : v;
    }
    return output;
}

function groupBy(sourceArray, property) {
    return sourceArray.reduce(function (accumulator, object) {
        const key = object[property];
        if (!accumulator[key]) {
            accumulator[key] = [];
        }
        accumulator[key].push(object);
        return accumulator;
    }, {});
}

function rgbToHex(r, g, b) {
    function rgbToHexComponent(rgb) {
        var hex = (rgb | 0).toString(16);
        if (hex.length < 2) {
            hex = "0" + hex;
        }
        return hex;
    };

    var red = rgbToHexComponent(r);
    var green = rgbToHexComponent(g);
    var blue = rgbToHexComponent(b);
    return "#" + red + green + blue;
}

function hexToRgb(hex) {
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return r + "," + g + "," + b;
}

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    return hours + ':' + minutes + ':' + seconds;
};

String.prototype.format = function () {
    a = this;
    for (k in arguments) {
        a = a.replace("{" + k + "}", arguments[k])
    }
    return a
};


(function () {
	'use strict';
  
    if (window.AudioContext) {
        window.isSoundSupported = true;
        return;
    }

    window.isSoundSupported = false;

    function AudioContext() {
        this.createStereoPanner = false;
    }

    AudioContext.prototype.delayNode = function() {
        return {};
    };

    AudioContext.prototype.feedbackNode = function() {
        return {};
    };

    AudioContext.prototype.filterNode = function() {
        return {};
    };
    
    AudioContext.prototype.convolverNode = function() {
        return {};
    };

    AudioContext.prototype.createConvolver = function() {
        return {};
    };

    AudioContext.prototype.createBiquadFilter = function() {
        return {};
    };

    AudioContext.prototype.createGain = function() {
        return {};
    };

    AudioContext.prototype.createDelay = function() {
        return {};
    };

    AudioContext.prototype.createPanner = function() {
        return {};
    };

    AudioContext.prototype.decodeAudioData = function(response, bufferHandler) {
        bufferHandler({
            "duration" : 0,
            "length" : 0
        });
    };

    window.AudioContext = AudioContext;

})();