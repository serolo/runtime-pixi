
// require engine
var EngineWrapper = require('./engine');

// require modules
require('./utils');
require('./types');
require('./extends');

// register engine wrapper
Fire.Runtime.registerEngine( new EngineWrapper(true) );

// register node type
var types = [
    [PIXI.fireball, 'Stage',            require('./stage')],

    [PIXI,          'Container',            require('./container'),                 'Container'],
    [PIXI,          'DisplayObject',        require('./display-object')],   
    [PIXI,          'Sprite',               require('./sprite'),                    'Sprite'],
    [PIXI,          'Text',                 require('./text'),                      'Text'],
    [PIXI,          'Graphics',             require('./graphics'),                  'Graphics'],
    [PIXI,          'ParticleContainer',    require('./particle-container'),        'ParticleContainer'],

    [PIXI.spine,    'Spine',                require('./spine'),                     'Spine'],

    [PIXI.mesh,     'Mesh',                 require('./mesh'),                      'Mesh'],
    [PIXI.mesh,     'Rope',                 require('./rope'),                      'Rope'],

    [PIXI.extras,   'TilingSprite',         require('./extras/tiling-sprite'),      'TilingSprite'],
    [PIXI.extras,   'MovieClip',            require('./extras/movie-clip'),         'MovieClip'],

    //FUEL UI ELEMENTS
    [FUEL_UI,       'ButtonImage',          require('./ui/buttonImage'),            'FUEL UI/ButtonImage'],
    [FUEL_UI,       'RectPanel',            require('./ui/RectPanel'),              'FUEL UI/RectPanel'],
    [FUEL_UI,       'EllipsePanel',         require('./ui/EllipsePanel'),           'FUEL UI/EllipsePanel'],
    [FUEL_UI,       'CirclePanel',          require('./ui/CirclePanel'),            'FUEL UI/CirclePanel'],
    [FUEL_UI,       'RoundedRectPanel',     require('./ui/RoundedRectPanel'),       'FUEL UI/RoundedRectPanel'],
];


types.forEach(function (type) {
    registerObjectType( type[0], type[1], type[2], type[3] );
});


function registerObjectType (namespace, name, wrapper, menuPath) {
    var nodeType = namespace[name];
    Fire.Runtime.registerNodeType(nodeType, wrapper, menuPath);
}


Fire.Runtime.Settings = {
    "mapping-v": [0, 1, 1],
    "mapping-h": [0, 1, 1],
};
