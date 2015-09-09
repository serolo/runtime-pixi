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
 * @author      Sebastian Romero <sebastian@fuelpowered.com>
 * @copyright   
 * @license     {@link }
 */

/**
 * @namespace FUEL_UI.core
 */
module.exports = {
    BaseUI:        		require('./baseUI'),
    Interactive: 		require('./interactive'),

    // ui
    Button:    			require('./ui/Button'),
    ButtonImage:    	require('./ui/ButtonImage'),
    Panel:    			require('./ui/Panel'),
    RectPanel:    		require('./ui/RectPanel'),
    EllipsePanel:    	require('./ui/EllipsePanel'),
    CirclePanel:    	require('./ui/CirclePanel'),
    RoundedRectPanel:   require('./ui/RoundedRectPanel'),
};

},{"./baseUI":1,"./interactive":3,"./ui/Button":4,"./ui/ButtonImage":5,"./ui/CirclePanel":6,"./ui/EllipsePanel":7,"./ui/Panel":8,"./ui/RectPanel":9,"./ui/RoundedRectPanel":10}],3:[function(require,module,exports){
var BaseUI = require('./baseUI');

/**
 * The basic Interactive component with 3 states (up, down and hover)
 * centered on it
 *
 * @class Interactive
 * @extends FUEL_UI.BaseUI
 * @memberof FUEL_UI
 * @constructor
 */
function Interactive() {
    BaseUI.call(this);

    this.interactive = false;

    this.mousedown = this.touchstart = this.onInteractionDown;
    this.mouseup = this.touchend = this.onInteractionUp;

    this.mousemove = this.touchmove = this.onInteractionMove;

    this.mouseover = this.touchenter  = this.onInteractionOver;
    this.mouseout = this.touchleave = this.touchendoutside = this.onInteractionOut;
    
    touchcancel = this.onInteractionCancel;
    /*
    this.touchstart = this.mousedown;
    this.touchend = this.mouseup;
    */
}

Interactive.prototype = Object.create( BaseUI.prototype );
Interactive.prototype.constructor = Interactive;
module.exports = Interactive;

Interactive.prototype.onInteractionDown = function() {};

Interactive.prototype.onInteractionUp = function() {};

Interactive.prototype.onInteractionMove = function() {};

Interactive.prototype.onInteractionOver = function() {};

Interactive.prototype.onInteractionOut = function() {};

Interactive.prototype.onInteractionCancel = function() {};
},{"./baseUI":1}],4:[function(require,module,exports){
var Interactive = require('../interactive');

/**
 * The basic button
 * centered on it
 *
 * @class Button
 * @extends FUEL_UI.BaseUI
 * @memberof FUEL_UI
 * @constructor
 */
function Button() {
    Interactive.call(this);

    this.interactive = true;

    this._changeState = false;

    this.enable = true;

    this._pressCallback = null;

    this._currentState = Interactive.UP;
}

Button.prototype = Object.create( Interactive.prototype );
Button.prototype.constructor = Button;
module.exports = Button;

Interactive.prototype.pressAction = function() {
    if( this._pressCallback ) {
        this._pressCallback();
    }  
};

Interactive.prototype.onInteractionDown = function() {
    this.handleEvent( Button.DOWN );
};

Interactive.prototype.onInteractionUp = function() {
    this.handleEvent( Button.UP );
    this.pressAction();
};

Interactive.prototype.onInteractionMove = function() {

};

Interactive.prototype.onInteractionOver = function() {

};

Interactive.prototype.onInteractionOut = function() {
    this.handleEvent( Button.UP );  
};

Interactive.prototype.onInteractionCancel = function() {
    this.handleEvent( Button.UP );
};

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
 * Hover state: mouse pointer hovers over the button
 * (ignored on mobile)
 *
 * @property HOVER
 * @static
 * @final
 * @type String
 */
Button.HOVER = 'hover';

/**
 * names of possible states for a button
 *
 * @property stateNames
 * @static
 * @final
 * @type String
 */
Button.stateNames = [
    Button.DOWN, Button.HOVER, Button.UP
];

/**
 * handle one of the mouse/touch events
 *
 * @method handleEvent
 * @param type one of the valid states
 */
Button.prototype.handleEvent = function(type) {
    if(type === Button.UP) {
        this.currentState = Button.UP;
    }
    else if(type === Button.DOWN) {
        this.currentState = Button.DOWN;
    } 
    this._changeState = true;
};

Button.prototype.redrawInteractive = Interactive.prototype.redraw;
/**
 * update before draw call
 *
 * @method redraw
 */
Button.prototype.redraw = function() {
    if(this._changeState){
        this._changeState = false;
        this.changeStateMethod();
    }
    this.redrawInteractive();
};

/**
 * change state
 *
 * @method updateImage
 */
Interactive.prototype.changeStateMethod = function() {
    if(!this.enable) {
        this.manageDisableState()
    }
    else if( this.currentState === Button.UP ) {
        this.manageUpState();
    }
    else if(this.currentState === Button.DOWN) {
        this.manageDownState();
    }
};


/**
 * Do thinks for the disable state
 *
 * @method manageDisableState
 */
Interactive.prototype.manageDisableState = function() {
};

/**
 * Do thinks for the up state
 *
 * @method manageUpState
 */
Interactive.prototype.manageUpState = function() {
};

/**
 * Do thinks for the down state
 *
 * @method manageDownState
 */
Interactive.prototype.manageDownState = function() {
};
},{"../interactive":3}],5:[function(require,module,exports){
var Button = require('./button');

/**
 * The basic image button
 * centered on it
 *
 * @class Button
 * @extends FUEL_UI.BaseUI
 * @memberof FUEL_UI
 * @constructor
 */
function ButtonImage() {
    Button.call(this);

    this._disabledTexture = "";
    this._upTexture = "";
    this._downTexture = "";

    if(!this._image) {
        this._image = new PIXI.Sprite();
    }
    this.addChild( this._image );
}

ButtonImage.prototype = Object.create( Button.prototype );
ButtonImage.prototype.constructor = ButtonImage;
module.exports = ButtonImage;

ButtonImage.prototype.manageDisableStateInteractive = Button.prototype.manageDisableState;
ButtonImage.prototype.manageDisableState = function() {
    if(this._disabledTexture != "" ) {   
        this._image.texture = PIXI.Texture.fromImage(this._disabledTexture);
    }
    this.manageDisableStateInteractive();
};

ButtonImage.prototype.manageUpStateInteractive = Button.prototype.manageUpState;
ButtonImage.prototype.manageUpState = function() {
    if(this._upTexture != "" ) {
        this._image.texture = PIXI.Texture.fromImage(this._upTexture);
    }
    this.manageUpStateInteractive()
};

ButtonImage.prototype.manageDownStateInteractive = Button.prototype.manageDownState;
ButtonImage.prototype.manageDownState = function() {
    if(this._downTexture != "" ) {
        this._image.texture = PIXI.Texture.fromImage(this._downTexture);
    }
    this.manageDownStateInteractive();
};

/**
 * The up texture for the button
 *
 * @property upTexture
 * @type String
 */
Object.defineProperty(ButtonImage.prototype, 'upTexture',{
    get: function() {
        return this._upTexture;
    },
    set: function(value) {
        if (this._upTexture === value) {
            return;
        }
        this._upTexture = value;
        this.manageUpState();
    }
});

/**
 * The down texture for the button
 *
 * @property downTexture
 * @type String
 */
Object.defineProperty(ButtonImage.prototype, 'downTexture',{
    get: function() {
        return this._downTexture;
    },
    set: function(value) {
        if (this._downTexture === value) {
            return;
        }
        this._downTexture = value;
        this.manageUpState();
    }
});

/**
 * The down disabledTexture for the button
 *
 * @property disabledTexture
 * @type String
 */
Object.defineProperty(ButtonImage.prototype, 'disabledTexture',{
    get: function() {
        return this._disabledTexture;
    },
    set: function(value) {
        if (this._disabledTexture === value) {
            return;
        }
        this._disabledTexture = value;
        this.manageUpState();
    }
});

/**
 * The sprite
 *
 * @property sprite
 * @type Pixi.Sprite
 */
Object.defineProperty(ButtonImage.prototype, 'sprite',{
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

Object.defineProperty(ButtonImage.prototype, 'width', {
    get: function() {
        return this._image.width;
    },
    set: function(width) {
        this._image.width = width;
    }
});

Object.defineProperty(ButtonImage.prototype, 'height', {
    get: function() {
        return this._image.height;
    },
    set: function(height) {
        this._image.height = height;
    }
});
},{"./button":11}],6:[function(require,module,exports){
var Panel = require('./Panel');


function CirclePanel() {
    Panel.call(this);
    this.create(this.width,this.height);
}

CirclePanel.prototype = Object.create( Panel.prototype );
CirclePanel.prototype.constructor = CirclePanel;
module.exports = CirclePanel;

CirclePanel.prototype.createPanel =  Panel.prototype.create;
CirclePanel.prototype.create = function(width,height) {
    this.createPanel(width,height);
};

CirclePanel.prototype.createGraphicObjectPanel =  Panel.prototype.createGraphicObject;
CirclePanel.prototype.createGraphicObject = function(width,height) {
    this.graphicObject = new PIXI.Circle(0, 0, this._radius);
    this.createGraphicObjectPanel(width,height);
}

CirclePanel.prototype.createShadowPanel =  Panel.prototype.createShadow;
CirclePanel.prototype.createShadow = function(width,height) {
    this.shadow = new PIXI.Circle(this.shadowX, this.shadowY, this._radius);
    this.createShadowPanel(width,height);
};

Object.defineProperty(CirclePanel.prototype, 'radius', {
    get: function() {
        if(!this.graphicObject) {
            return 0;
        }
        return this._radius;
    },
    set: function(radius) {
        if(!this.graphicObject) {
            return
        }
        this._radius = radius;
        this.create(this.width,this.height);
    }
});
},{"./Panel":8}],7:[function(require,module,exports){
var Panel = require('./Panel');


function EllipsePanel() {
    Panel.call(this);
    this.create(this.width,this.height);
}

EllipsePanel.prototype = Object.create( Panel.prototype );
EllipsePanel.prototype.constructor = EllipsePanel;
module.exports = EllipsePanel;

EllipsePanel.prototype.createPanel =  Panel.prototype.create;
EllipsePanel.prototype.create = function(width,height) {
    this.createPanel(width,height);
};

EllipsePanel.prototype.createGraphicObjectPanel =  Panel.prototype.createGraphicObject;
EllipsePanel.prototype.createGraphicObject = function(width,height) {
    this.graphicObject = new PIXI.Ellipse(0, 0, width/2, height/2);
    this.createGraphicObjectPanel(width,height);
}

EllipsePanel.prototype.createShadowPanel =  Panel.prototype.createShadow;
EllipsePanel.prototype.createShadow = function(width,height) {
    this.shadow = new PIXI.Ellipse(this.shadowX, this.shadowY, width/2, height/2);
    this.createShadowPanel(width,height);
};


Object.defineProperty(EllipsePanel.prototype, 'width', {
    get: function() {
        if(!this.graphicObject) {
            return 0;
        }
        return this.graphicObject.width*2;
    },
    set: function(width) {
        if(!this.graphicObject) {
            return
        }
        this.create(width,this.graphicObject.height*2);
    }
});

Object.defineProperty(EllipsePanel.prototype, 'height', {
    get: function() {
        if(!this.graphicObject) {
            return 0;
        }
        return this.graphicObject.height*2;
    },
    set: function(height) {
        if(!this.graphicObject) {
            return
        }
        this.create(this.graphicObject.width*2,height);
    }
});
},{"./Panel":8}],8:[function(require,module,exports){
var Button = require('./Button');

/**
 * The basic image button
 * centered on it
 *
 * @class Button
 * @extends FUEL_UI.BaseUI
 * @memberof FUEL_UI
 * @constructor
 */
function Panel() {
    Button.call(this);
    this._graphic = new PIXI.Graphics();
    this._graphicObject = null;
    this.addChild( this._graphic );
}

Panel.prototype = Object.create( Button.prototype );
Panel.prototype.constructor = Panel;
module.exports = Panel;

Panel.prototype.create = function(width,height) {
    this._width = width;
    this._height = height;
    this._graphicObject = null;
    this._shadow = null;
    this.graphic.clear();
    this.createShadow(width,height);
    this.createGraphicObject(width,height);
};

Panel.prototype.createGraphicObject = function(width,height) {
    if( !this._graphicObject ) {
        return;    
    }
    this.graphic.moveTo(0,0);
    this.graphic.lineStyle(this.edgeWidth, this.edgeColor, this.alpha);
    this.graphic.beginFill(this._graphic.tint,this.alpha);
    this.graphic.drawShape( this._graphicObject );
    this.graphic.endFill();
};

Panel.prototype.createShadow = function(width,height) {
    if( !this._showShadow ) {
        return;
    }
    if( !this._shadow ) {
        return;
    }
    this.graphic.moveTo(0,0);
    this.graphic.lineStyle(0);
    this.graphic.beginFill(this.shadowColor,this.alpha*this.shadowBlur);
    this.graphic.drawShape( this._shadow );  
    this.graphic.endFill();
};

Panel.prototype.manageDisableStateButton = Button.prototype.manageDisableState;
Panel.prototype.manageDisableState = function() {
    if( !this.isButton ) {
        return;
    }
    this.manageDisableStateButton();
};

Panel.prototype.manageUpStateButton = Button.prototype.manageUpState;
Panel.prototype.manageUpState = function() {
    if( !this.isButton ) {
        return;
    }
    this._graphic.tint = this._tint;
    this.create();
    this.manageUpStateButton()
};

Panel.prototype.manageDownStateButton = Button.prototype.manageDownState;
Panel.prototype.manageDownState = function() {
    
    if( !this.isButton ) {
        return;
    }
    this._graphic.tint = this._pressColor;
    this.create();
    this.manageDownStateButton();
};

Object.defineProperty(Panel.prototype, 'width', {
    get: function() {
        return this._width;
    },
    set: function(width) {
        this._width = width;
        this.create(width,this._height);
    }
});

Object.defineProperty(Panel.prototype, 'height', {
    get: function() {
        return this._height;
    },
    set: function(height) {
        this._height = height;
        this.create(this._width,height);
    }
});

Object.defineProperty(Panel.prototype, 'tint', {
    get: function() {
        return this._tint;
    },
    set: function(tint) {
        this._tint = tint;
        this._graphic.tint = tint;
        this.create(this._width,this._height);
    }
});

Object.defineProperty(Panel.prototype, 'blendMode', {
    get: function() {
        return this._graphic.blendMode;
    },
    set: function(blendMode) {
        this._graphic.blendMode = blendMode;
        this.create(this._width,this._height);
    }
});

Object.defineProperty(Panel.prototype, 'edgeColor', {
    get: function() {
        return this._edgeColor;
    },
    set: function(edgeColor) {
        this._edgeColor = edgeColor;
        this.create(this._width,this._height);
    }
});

Object.defineProperty(Panel.prototype, 'edgeWidth', {
    get: function() {
        return this._edgeWidth;
    },
    set: function(edgeWidth) {
        this._edgeWidth = edgeWidth;
        this.create(this._width,this._height);
    }
});

Object.defineProperty(Panel.prototype, 'pressColor', {
    get: function() {
        return this._pressColor;
    },
    set: function(pressColor) {
        this._pressColor = pressColor;
    }
});

Object.defineProperty(Panel.prototype, 'showShadow', {
    get: function() {
        return this._showShadow;
    },
    set: function(showShadow) {
        this._showShadow = showShadow;
        this.create(this._width,this._height);
    }
});

Object.defineProperty(Panel.prototype, 'shadowColor', {
    get: function() {
        return this._shadowColor;
    },
    set: function(shadowColor) {
        this._shadowColor = shadowColor;
        this.create(this._width,this._height);
    }
});

Object.defineProperty(Panel.prototype, 'shadowX', {
    get: function() {
        return this._shadowX;
    },
    set: function(shadowX) {
        this._shadowX = shadowX;
        this.create(this._width,this._height);
    }
});

Object.defineProperty(Panel.prototype, 'shadowY', {
    get: function() {
        return this._shadowY;
    },
    set: function(shadowY) {
        this._shadowY = shadowY;
        this.create(this._width,this._height);
    }
});

Object.defineProperty(Panel.prototype, 'shadowBlur', {
    get: function() {
        return this._shadowBlur;
    },
    set: function(shadowBlur) {
        this._shadowBlur = shadowBlur;
        this.create(this._width,this._height);
    }
});

Object.defineProperty(Panel.prototype, 'isButton', {
    get: function() {
        return this._isButton;
    },
    set: function(isButton) {
        this._isButton = isButton;
    }
});

Object.defineProperty(Panel.prototype, 'graphic', {
    get: function() {
        if(!this._graphic) {
            return null;
        }
        return this._graphic;
    },
});

Object.defineProperty(Panel.prototype, 'graphicObject', {
    get: function() {
        return this._graphicObject;
    },
    set: function(graphicObject) {
        this._graphicObject = graphicObject;
    }
});

Object.defineProperty(Panel.prototype, 'shadow', {
    get: function() {
        return this._shadow;
    },
    set: function(shadow) {
        this._shadow = shadow;
    }
});

},{"./Button":4}],9:[function(require,module,exports){
var Panel = require('./Panel');


function RectPanel() {
    Panel.call(this);
    this.create(this.width,this.height);
}

RectPanel.prototype = Object.create( Panel.prototype );
RectPanel.prototype.constructor = RectPanel;
module.exports = RectPanel;


RectPanel.prototype.createPanel =  Panel.prototype.create;
RectPanel.prototype.create = function(width,height) {
    this.createPanel(width,height);
};

RectPanel.prototype.createGraphicObjectPanel =  Panel.prototype.createGraphicObject;
RectPanel.prototype.createGraphicObject = function(width,height) {
    this.graphicObject = new PIXI.Rectangle(0, 0, width, height);
    this.createGraphicObjectPanel(width,height);
}

RectPanel.prototype.createShadowPanel =  Panel.prototype.createShadow;
RectPanel.prototype.createShadow = function(width,height) {
    this.shadow = new PIXI.Rectangle(this.shadowX, this.shadowY, width, height);
    this.createShadowPanel(width,height);
};
},{"./Panel":8}],10:[function(require,module,exports){
var Panel = require('./Panel');

var borders = {
    NONE:       0,
    TOP :       1,
    BOTTOM :    2,
    LEFT:       3,
    RIGTH:      4 
}

function RoundedRectPanel() {
    Panel.call(this);
    this.create(this.width,this.height);
}

RoundedRectPanel.prototype = Object.create( Panel.prototype );
RoundedRectPanel.prototype.constructor = RoundedRectPanel;
module.exports = RoundedRectPanel;

RoundedRectPanel.prototype.createPanel =  Panel.prototype.create;
RoundedRectPanel.prototype.create = function(width,height) {
    this.setFlatSideObject(width,height);
    this.createPanel(width,height);
};

RoundedRectPanel.prototype.createGraphicObjectPanel =  Panel.prototype.createGraphicObject;
RoundedRectPanel.prototype.createGraphicObject = function(width,height) {
    this.graphicObject = new PIXI.RoundedRectangle(0, 0, width, height, this._radius);
    this.createGraphicObjectPanel(width,height);
    this.createFlatSideObject();
}

RoundedRectPanel.prototype.createShadowPanel =  Panel.prototype.createShadow;
RoundedRectPanel.prototype.createShadow = function(width,height) {
    this.shadow = new PIXI.RoundedRectangle(this.shadowX, this.shadowY, width, height, this._radius);
    this.createShadowPanel(width,height);
    this.createFlatSideShadow();
};

RoundedRectPanel.prototype.setFlatSideObject = function(width,height) {
    this.flatObject = null;
    this.flatObjectShadow = null;
    if(this._flatSide == borders.NONE) {
        return;
    }
    var dafaultObjectSize = this._radius;
    switch( this._flatSide ) {
        case borders.TOP:
            this.flatObject = new PIXI.Rectangle(0, 0, width, dafaultObjectSize);
            this.flatObjectShadow = new PIXI.Rectangle(this.shadowX, this.shadowY, width, dafaultObjectSize);
            break;
        case borders.BOTTOM:
            this.flatObject = new PIXI.Rectangle(0, height-dafaultObjectSize, width, dafaultObjectSize);
            this.flatObjectShadow = new PIXI.Rectangle(this.shadowX, height-dafaultObjectSize+this.shadowY, width, dafaultObjectSize);
            break;
        case borders.LEFT:
            this.flatObject = new PIXI.Rectangle(0, 0, dafaultObjectSize, height);
            this.flatObjectShadow = new PIXI.Rectangle(this.shadowX, this.shadowY, dafaultObjectSize, height);
            break;
        case borders.RIGTH:
            this.flatObject = new PIXI.Rectangle(width-dafaultObjectSize, 0, dafaultObjectSize, height);
            this.flatObjectShadow = new PIXI.Rectangle(width+this.shadowX-dafaultObjectSize, this.shadowY, dafaultObjectSize, height);
            break;
    }
};

RoundedRectPanel.prototype.createFlatSideObject = function() {
    if(!this.flatObject) return;

    this.graphic.moveTo(0,0);
    this.graphic.lineStyle(0);
    this.graphic.beginFill(this._graphic.tint,this.alpha);
    this.graphic.drawShape( this.flatObject );
    this.graphic.endFill();
     switch( this._flatSide ) {
        case borders.TOP:
            this.createFlatSideBorderLine(0,0,0,this.flatObject.height);
            this.createFlatSideBorderLine(0,0,this.flatObject.width,0);
            this.createFlatSideBorderLine(this.flatObject.width,0,this.flatObject.width,this.flatObject.height);
            break;
        case borders.BOTTOM:
            this.createFlatSideBorderLine(0,this.height-this.flatObject.height,0,this.height);
            this.createFlatSideBorderLine(0,this.height,this.flatObject.width,this.height);
            this.createFlatSideBorderLine(this.flatObject.width,this.height-this.flatObject.height,this.flatObject.width,this.height);
            break;
        case borders.LEFT:
            this.createFlatSideBorderLine(0,0,0,this.height);
            this.createFlatSideBorderLine(0,0,this.flatObject.width,0);
            this.createFlatSideBorderLine(0,this.height,this.flatObject.width,this.height);
            break;
        case borders.RIGTH:
            this.createFlatSideBorderLine(this.width,0,this.width,this.height);
            this.createFlatSideBorderLine(this.width-this.flatObject.width,0,this.width,0);
            this.createFlatSideBorderLine(this.width-this.flatObject.width,this.height,this.width,this.height);
            break;
    }
};

RoundedRectPanel.prototype.createFlatSideShadow = function() {
    if(!this.showShadow) return;
    if(!this.flatObjectShadow) return;
    
    this.graphic.moveTo(0,0);
    this.graphic.lineStyle(0);
    this.graphic.beginFill(this.shadowColor,this.alpha*this.shadowBlur);
    this.graphic.drawShape( this.flatObjectShadow );
    this.graphic.endFill();
};

RoundedRectPanel.prototype.createFlatSideBorderLine  = function(fromX,fromY, toX, toY) {
    this.graphic.lineStyle(this.edgeWidth, this.edgeColor, this.alpha);
    this.graphic.moveTo(fromX,fromY);
    this.graphic.lineTo(toX, toY);
    this.graphic.moveTo(0,0);
};

Object.defineProperty(RoundedRectPanel.prototype, 'flatSide', {
    get: function() {
        return this._flatSide;
    },
    set: function(flatSide) {
        this._flatSide = flatSide;  
        this.create(this.width,this.height);
    }
});

Object.defineProperty(RoundedRectPanel.prototype, 'radius', {
    get: function() {
        return this._radius;
    },
    set: function(radius) {
        this._radius = radius;  
        this.create(this.width,this.height);
    }
});
},{"./Panel":8}],11:[function(require,module,exports){
arguments[4][4][0].apply(exports,arguments)
},{"../interactive":3,"dup":4}],12:[function(require,module,exports){
(function (global){
if (typeof PIXI === 'undefined') {
  console.warn('pixi.js has to be loaded before loading FUELUI');
  return;
}

var core = module.exports = require('./core');

// export FUELUI globally.
global.FUEL_UI = core;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./core":2}]},{},[12])(12)
});


//# sourceMappingURL=fuel_ui.js.map