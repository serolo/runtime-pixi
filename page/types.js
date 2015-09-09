
Runtime.BlendModes = Fire.defineEnum({
    NORMAL          : PIXI.BLEND_MODES.NORMAL,
    ADD             : PIXI.BLEND_MODES.ADD,
    MULTIPLY        : PIXI.BLEND_MODES.MULTIPLY,
    SCREEN          : PIXI.BLEND_MODES.SCREEN,
    OVERLAY         : PIXI.BLEND_MODES.OVERLAY,
    DARKEN          : PIXI.BLEND_MODES.DARKEN,
    LIGHTEN         : PIXI.BLEND_MODES.LIGHTEN,
    COLOR_DODGE     : PIXI.BLEND_MODES.COLOR_DODGE,
    COLOR_BURN      : PIXI.BLEND_MODES.COLOR_BURN,
    HARD_LIGHT      : PIXI.BLEND_MODES.HARD_LIGHT,
    SOFT_LIGHT      : PIXI.BLEND_MODES.SOFT_LIGHT,
    DIFFERENCE      : PIXI.BLEND_MODES.DIFFERENCE,
    EXCLUSION       : PIXI.BLEND_MODES.EXCLUSION,
    HUE             : PIXI.BLEND_MODES.HUE,
    SATURATION      : PIXI.BLEND_MODES.SATURATION,
    COLOR           : PIXI.BLEND_MODES.COLOR,
    LUMINOSITY      : PIXI.BLEND_MODES.LUMINOSITY
});

Runtime.TextureType = Fire.defineEnum({
    Image : -1,
    Video : -1
});

Runtime.MeshDrawMode = Fire.defineEnum({
    TriangleMesh : PIXI.mesh.Mesh.DRAW_MODES.TRIANGLE_MESH,
    Triangles    : PIXI.mesh.Mesh.DRAW_MODES.TRIANGLES
});

Runtime.Borders = Fire.defineEnum({
    NONE:       -1,
    TOP :       -1,
    BOTTOM :    -1,
    LEFT:       -1,
    RIGTH:      -1 
});
