﻿/*
Copyright 2012, KISSY UI Library v1.30
MIT Licensed
build time: Dec 20 22:27
*/
/**
 * @ignore
 * simulate shake gesture by listening devicemotion event
 * @author yiminghe@gmail.com
 */
KISSY.add('event/dom/shake', function (S, EventDomBase, undefined) {
    var Special = EventDomBase._Special,
        start = 5,
        enough = 20,
        shaking = 0,
        lastX, lastY, lastZ,
        max = Math.max,
        abs = Math.abs,
        win = S.Env.host,
        devicemotion = 'devicemotion',
        checkShake = S.buffer(function () {
            if (shaking) {
                EventDomBase.fireHandler(win, 'shake', {
                    accelerationIncludingGravity: {
                        x: lastX,
                        y: lastY,
                        z: lastZ
                    }
                });
                clear();
            }
        }, 250);

    // only for window
    Special['shake'] = {
        setup: function () {
            if (this != win) {
                return;
            }
            win.addEventListener(devicemotion, shake, false);
        },
        tearDown: function () {
            if (this != win) {
                return;
            }
            checkShake.stop();
            clear();
            win.removeEventListener(devicemotion, shake, false);
        }
    };

    function clear() {
        lastX = undefined;
        shaking = 0;
    }

    function shake(e) {
        var accelerationIncludingGravity = e.accelerationIncludingGravity,
            x = accelerationIncludingGravity.x,
            y = accelerationIncludingGravity.y,
            z = accelerationIncludingGravity.z,
            diff;
        if (lastX !== undefined) {
            diff = max(abs(x - lastX), abs(y - lastY), abs(z - lastZ));
            if (diff > start) {
                checkShake();
            }
            if (diff > enough) {
                // console.log(diff);
                // console.log(x,lastX,y,lastY,z,lastZ);
                shaking = 1;
            }
            // console.log(x);
        }
        lastX = x;
        lastY = y;
        lastZ = z;
    }
}, {
    requires: ['event/dom/base']
});
/**
 * @ignore
 * refer:
 *  - http://www.mobilexweb.com/blog/safari-ios-accelerometer-websockets-html5
 *  - http://www.mobilexweb.com/blog/safari-ios-accelerometer-websockets-html5
 *  - http://bbs.ajaxjs.com/forumdisplay.php?fid=54
 *  - http://bbs.ajaxjs.com/viewthread.php?tid=3549
 *  - https://developer.apple.com/library/safari/#documentation/SafariDOMAdditions/Reference/DeviceMotionEventClassRef/DeviceMotionEvent/DeviceMotionEvent.html
 *  - http://www.html5rocks.com/en/tutorials/device/orientation/
 *  - https://gist.github.com/3061490
 *  - http://www.eleqtriq.com/2010/05/css-3d-matrix-transformations/
 *  - http://dev.w3.org/geo/api/spec-source-orientation
 */
