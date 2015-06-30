'use strict';
// Famous dependencies
var DOMElement = require('famous/dom-renderables/DOMElement');
var FamousEngine = require('famous/core/FamousEngine');
var Main = require('./Main');

// Boilerplate code to make your life easier
FamousEngine.init();

var scene = FamousEngine.createScene();
scene.addChild(new Main());