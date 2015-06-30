var Node = require('famous/core/Node');
var DOMElement = require('famous/dom-renderables/DOMElement');
var Position = require('famous/components/Position');
var Scale = require('famous/components/Scale');
var Transform = require("famous/core/Transform");
var Align = require('famous/components/Align');
var Size = require('famous/components/Size');

function Another(text, x, y, z, props) {
    Node.call(this);
    x += .05;
    y += .05;
    this.x = x;
    this.y = y;
    this.z = z;
    this.titleEl = new DOMElement(this)
        .setProperty('background', 'url(images/flower.jpg)')
        .setProperty('background-size', 'cover')
        .setProperty('-webkit-background-size', 'cover')
        .setProperty('-moz-background-size', 'cover')
        .setProperty('-o-background-size', 'cover')
        .setProperty('backface-visibility', 'visible')
        .setProperty('cursor', 'pointer');

    //if (props) {
    //    this.titleEl.setProperty('background', props.background);
    //}
    this
        .setSizeMode('default', 'default', 'default')
        .setProportionalSize(.1,.1,.1)
        .setOrigin(.5, .5)
        .setMountPoint(.5,.5)
        .setAlign(x, -.2, 0);

    this.scale = new Scale(this);
    this.align = new Align(this);

    setTimeout(function() {
        this.align.set(x, y, 0, { duration: 1500, curve: 'outBounce' });
    }.bind(this), Math.random() * 600);

    //new Position(this.youtube).setZ(3000);
    this.setDifferentialSize(-5, -5);
    this.position = new Position(this);
    this.position.setZ(this.z);
    this.size = new Size(this);
    this.addUIEvent('mouseenter');
    this.addUIEvent('mouseleave');
    this.addUIEvent('mousedown');
}

Another.prototype = Object.create(Node.prototype);

Another.prototype.onReceive = function onReceive (type, ev) {
    if (type === 'mouseenter') {
        console.log('Z is ' + this.position.getZ());
        console.log('mouse entered in ' + this.z);
        if (this.maximized) {
            return;
        }
        this.scale.halt();

        this.scale.set(1.2, 1.2, 1, { duration: 600, curve: 'outBounce'});

        this.position.setZ(this.z + 50);
    } else if (type === 'mouseleave') {
        if (this.maximized) {
            return;
        }
        this.scale.halt();
        this.position.setZ(this.z);
        this.scale.set(1, 1, 1, { duration: 250, curve: 'easeOut' }, function() {

        }.bind(this));
    } else if (type === 'mousedown') {
        if (! this.maximized) {
            this.maximized = true;
            this.align.halt();
            this.size.halt();
            this.scale.set(1, 1, 1);
            this.position.setZ(2000);
            this.align.set(0.5, 0.5,.1, {duration: 200});

            this.size.setProportional(1, 1,.1, {duration: 450, curve: 'easeOut'}, function(){

                this.youtubeActive = true;
                    this.youtube = this.addChild()
                        .setOrigin(0.5, 0.5)
                        .setAlign(0.5, 0.5, 0.95)
                        .setSizeMode('absolute', 'absolute', 'absolute')
                        .setMountPoint(0.5, 0.5)
                        .setAbsoluteSize(560, 315, 1);
                this.youtubeEl = new DOMElement(this.youtube);
                this.youtubeEl
                    .setContent('<iframe seamless width="560" height="315" src="https://www.youtube.com/embed/eNfBbJ0pzbA?showinfo=0&autoplay=1&iv_load_policy=3&controls=0" frameborder="0"></iframe>');
                this.position.setZ(this.z + 2000);

            }.bind(this));


        } else {
            this.maximized = false;

            this.size.halt();
            this.align.halt();
            if (this.youtubeActive) {
                this.youtubeEl.setContent('');
                this.removeChild(this.youtube);
            }
            this.align.set(this.x, this.y, 0.01, { duration: 200 });


            this.size.setProportional(.1,.1,.1, { duration: 400, curve: 'easeOut'}, function() {
                this.position.setZ(this.z);

            }.bind(this));

        }

    }
};

module.exports = Another;
