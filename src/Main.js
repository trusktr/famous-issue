var Node = require('famous/core/Node');
var Another = require('./Another');
var DOMElement = require('famous/dom-renderables/DOMElement');

function Main() {
    Node.call(this);
    //this.setSizeMode('default', 'default');
    //this.setAbsoluteSize(null, null);
    //this.setSizeMode('default', 'default', 'default')
    //    .setAbsoluteSize(250, 250)
    //    // Center the 'node' to the parent (the screen, in this instance)
    //    .setAlign(0.5, 0.5)
    //    // Set the translational origin to the center of the 'node'
    //    .setMountPoint(0.5, 0.5)
    //    // Set the rotational origin to the center of the 'node'
    //    .setOrigin(0.5, 0.5);
    //
    this.setAlign(0.5, 0.5, 0)
        .setMountPoint(0.5, 0.5, 0);

    var comp = this.addChild();


    comp.addChild(new Another('First',0, 0, 10,{ background: 'lightgreen' }));
    comp.addChild(new Another('First',0, 0.1, 11, { background: 'red' }));
    comp.addChild(new Another('First',0, 0.2, 12, { background: 'orange' }));
    comp.addChild(new Another('First',0, 0.3, 13, { background: 'yellow' }));
    comp.addChild(new Another('First',0.3, 0.3, 14, { background: 'purple' }));
    comp.addChild(new Another('First',.1, .1, 15, { background: 'yellow' }));
    comp.addChild(new Another('Second',.2, .1, 1, { background: 'green' }));
    comp.addChild(new Another('Second',.2, .2, 2, { background: 'violet' }));
    comp.addChild(new Another('Second',.1, .2, 16, { background: 'cyan' }));

    comp.set
}

Main.prototype = Object.create(Node.prototype);


module.exports = Main;