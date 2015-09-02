(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.FUEL_UI = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * base for all UI controls (see controls/)
 * based on pixi-DisplayContainer that supports adding children, so all
 * controls are container
 * @class BaseUI
 * @extends PIXI.Container
 * @memberof FUEL_UI
 * @constructor
 */
function BaseUI() {
    PIXI.Container.call(this);
    this.enabled = this.enabled !== false;
}

BaseUI.prototype = Object.create( PIXI.Container.prototype );
BaseUI.prototype.constructor = BaseUI;
module.exports = BaseUI;

/**
 * Renders the object using the WebGL renderer
 *
 * @method renderWebGL
 * @param renderer
 * @private
 */
/* istanbul ignore next */
BaseUI.prototype.renderWebGL = function(renderer) {
    this.redraw();
    return PIXI.Container.prototype.renderWebGL.call(this, renderer);
};

/**
 * Renders the object using the Canvas renderer
 *
 * @method renderCanvas
 * @param renderer
 * @private
 */
/* istanbul ignore next */
BaseUI.prototype.renderCanvas = function(renderer) {
    this.redraw();
    return PIXI.Container.prototype.renderCanvas.call(this, renderer);
};

/**
 * get local mouse position from PIXI.InteractionData
 *
 * @method mousePos
 * @returns {PIXI.Point}
 */
BaseUI.prototype.mousePos = function(e) {
    return e.data.getLocalPosition(this);
};

/**
 * update before draw call
 * redraw control for current state from theme
 *
 * @method redraw
 */
BaseUI.prototype.redraw = function() {
};

/**
 * Enables/Disables the control.
 * (not implemented yet)
 *
 * @property enabled
 * @type Boolean
 */
Object.defineProperty(BaseUI.prototype, 'enabled', {
    get: function() {
        return this._enabled;
    },
    set: function(value) {
        this._enabled = value;
    }
});

/**
 * The width of the shape, setting this will redraw the component.
 * (set invalidDimensions)
 *
 * @property width
 * @type Number
 */
Object.defineProperty(BaseUI.prototype, 'width', {
    get: function() {
        return this._width;
    },
    set: function(width) {
        this._width = width;
    }
});


/**
 * The height of the shape, setting this will redraw the component.
 * (set invalidDimensions)
 *
 * @property height
 * @type Number
 */
Object.defineProperty(BaseUI.prototype, 'height', {
    get: function() {
        return this._height;
    },
    set: function(height) {
        this._height = height;
    }
});
},{}],2:[function(require,module,exports){
/**
 * @file        Main export of the gown.js core library
 * @author      Andreas Bresser <andreasbresser@gmail.com>
 * @copyright   2015 Andreas Bresser
 * @license     {@link https://github.com/brean/gown.js/blob/master/LICENSE|Apache License}
 */

/**
 * @namespace GOWN.core
 */
module.exports = {
    BaseUI:        require('./baseUI'),

    // ui
    Button:                 require('./ui/Button'),
};

},{"./baseUI":1,"./ui/Button":3}],3:[function(require,module,exports){
var BaseUI = require('../baseUI');

/**
 * The basic Button with 3 states (up, down and hover) and a label that is
 * centered on it
 *
 * @class Button
 * @extends FUEL_UI.BaseUI
 * @memberof FUEL_UI
 * @constructor
 */
function Button() {
    BaseUI.call(this);
    
    this._upTexture = "";
    this._downTexture = "";
    this._disabledTexture = "";

    this._image = new PIXI.Sprite();
    this._image.on('mousedown', this.mousedown);
    this._image.on('mouseup', this.mouseup);

    this.addChild( this._image );

    this._enabled = true;

    this.handleEvent(Button.UP);
}

Button.prototype = Object.create( BaseUI.prototype );
Button.prototype.constructor = Button;
module.exports = Button;

// Identifier for the different button states
/**
 * Up state: mouse button is released or finger is removed from the screen
 *
 * @property UP
 * @static
 * @final
 * @type String
 */
Button.UP = 'up';

/**
 * Down state: mouse button is pressed or finger touches the screen
 *
 * @property DOWN
 * @static
 * @final
 * @type String
 */
Button.DOWN = 'down';

/**
 * names of possible states for a button
 *
 * @property stateNames
 * @static
 * @final
 * @type String
 */
Button.stateNames = [
    Button.DOWN, Button.UP
];

Button.prototype.mousedown = function() {
    this.handleEvent(Button.DOWN);
};

Button.prototype.mouseup = function() {
    this.handleEvent(Button.UP);
};


/**
 * handle one of the mouse/touch events
 *
 * @method handleEvent
 * @param type one of the valid states
 */
Button.prototype.handleEvent = function(type) {
    if (!this._enabled) {
        if( this._disabledTexture != "" ) {
            console.error("this._disabledTexture: "+this._disabledTexture);
            this._image.texture = PIXI.Texture.fromImage(this._disabledTexture);
        }
        return;
    }
    if (type === Button.DOWN) {
        this.currentState = Button.DOWN;
        this._pressed = true;
        if( this._downTexture != "" ) {
            console.error("this._downTexture: "+this._downTexture);
            this._image.texture = PIXI.Texture.fromImage(this._downTexture);
        }
    } 
    else {
        this._pressed = false;
        this.currentState = Button.UP;
        if( this._upTexture != "" ) {
            console.error("this._upTexture: "+this._upTexture);
            this._image.texture = PIXI.Texture.fromImage(this._upTexture);
        }
    }
};

// performance increase to avoid using call.. (10x faster)
Button.prototype.redrawBaseUI = BaseUI.prototype.redraw;

/**
 * update before draw call (position label)
 *
 * @method redraw
 */
Button.prototype.redraw = function() {
    this.width = this._image.width;
    this.height = this._image.height;
    this.redrawBaseUI();
};


/**
 * The current state (one of _validStates)
 *
 * @property currentState
 * @type String
 */
Object.defineProperty(Button.prototype, 'currentState',{
    get: function() {
        return this._currentState;
    },
    set: function(value) {
        if (this._currentState === value) {
            return;
        }
        this._currentState = value;
    }
});

/**
 * Create/Update the label of the button.
 *
 * @property label
 * @type String
 */
Object.defineProperty(Button.prototype, 'label', {
    get: function() {
        return this._label;
    },
    set: function(label) {
        if(this._label === label) {
            return;
        }
        this._label = label;
        this.updateLabel = true;
    }
});

/**
 * The up texture for the button
 *
 * @property upTexture
 * @type String
 */
Object.defineProperty(Button.prototype, 'upTexture',{
    get: function() {
        return this._upTexture;
    },
    set: function(value) {
        if (this._upTexture === value) {
            return;
        }
        this._upTexture = value;
        this.handleEvent(Button.UP);
    }
});

/**
 * The down texture for the button
 *
 * @property downTexture
 * @type String
 */
Object.defineProperty(Button.prototype, 'downTexture',{
    get: function() {
        return this._downTexture;
    },
    set: function(value) {
        if (this._downTexture === value) {
            return;
        }
        this._downTexture = value;
        this.handleEvent(Button.UP);
    }
});

/**
 * The down disabledTexture for the button
 *
 * @property disabledTexture
 * @type String
 */
Object.defineProperty(Button.prototype, 'disabledTexture',{
    get: function() {
        return this._disabledTexture;
    },
    set: function(value) {
        if (this._disabledTexture === value) {
            return;
        }
        this._disabledTexture = value;
        this.handleEvent(Button.UP);
    }
});

/**
 * The down disabledTexture for the button
 *
 * @property disabledTexture
 * @type Pixi.Sprite
 */
Object.defineProperty(Button.prototype, 'sprite',{
    get: function() {
        if(!this._image) {
            return null;
        }
        return this._image;
    },
    set: function(value) {
        if (this._image === value) {
            return;
        }
        this._image = value;
    }
});

},{"../baseUI":1}],4:[function(require,module,exports){
(function (global){
if (typeof PIXI === 'undefined') {
  console.warn('pixi.js has to be loaded before loading FUELUI');
  return;
}

var core = module.exports = require('./core');

// export FUELUI globally.
global.FUEL_UI = core;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./core":2}]},{},[4])(4)
});


//# sourceMappingURL=fuel_ui.js.map