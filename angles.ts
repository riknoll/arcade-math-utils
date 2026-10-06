

//% color=#0fbc11
namespace mathUtils {
    //% whenUsed
    const TWO_PI = Math.PI * 2;

    //% blockId=mathUtils_radiansToDegrees
    //% block="convert $radians to degrees"
    //% group=Angles
    //% blockGap=8
    //% weight=120
    export function radiansToDegrees(radians: number) {
        return clampDegrees(radians * 180 / Math.PI)
    }

    //% blockId=mathUtils_degreesToRadians
    //% block="convert $degrees to radians"
    //% group=Angles
    //% blockGap=8
    //% weight=110
    export function degreesToRadians(degrees: number) {
        return clampRadians(degrees * Math.PI / 180)
    }

    //% blockId=mathUtil_clampDegrees
    //% block="wrap degrees $angle between 0-360"
    //% group=Angles
    //% weight=100
    //% blockGap=8
    export function clampDegrees(angle: number) {
        return ((angle % 360) + 360) % 360;
    }

    //% blockId=mathUtil_clampRadians
    //% block="wrap radians $angle between 0-2π"
    //% group=Angles
    //% weight=90
    export function clampRadians(angle: number) {
        return ((angle % TWO_PI) + TWO_PI) % TWO_PI;
    }

    //% blockId=mathUtils_angleDifference
    //% block="difference from angle $angle1 to angle $angle2"
    //% group=Angles
    //% blockGap=8
    //% weight=80
    export function angleDifference(angle1: number, angle2: number) {
        angle1 = clampRadians(angle1);
        angle2 = clampRadians(angle2);

        if (Math.abs(angle1 - angle2) > Math.PI) {
            if (angle1 < angle2) {
                angle1 += TWO_PI;
            }
            else {
                angle2 += TWO_PI;
            }
        }

        return angle1 - angle2;
    }

    //% blockId=mathUtils_turnAngleTowards
    //% block="turn angle $angleFrom towards angle $angleTo by $delta"
    //% group=Angles
    //% blockGap=8
    //% weight=70
    export function turnAngleTowards(angleFrom: number, angleTo: number, delta: number) {
        angleFrom = clampRadians(angleFrom);
        angleTo = clampRadians(angleTo);

        if (Math.abs(angleFrom - angleTo) > Math.PI) {
            if (angleFrom < angleTo) {
                angleFrom += TWO_PI;
            }
            else {
                angleTo += TWO_PI;
            }
        }

        if (angleFrom < angleTo) {
            return clampRadians(Math.min(angleFrom + delta, angleTo));
        }
        else if (angleFrom > angleTo) {
            return clampRadians(Math.max(angleFrom - delta, angleTo));
        }
        return angleTo;
    }

    //% blockId=mathUtils_shouldTurnClockwise
    //% block="should turn clockwise from angle $angleFrom to reach angle $angleTo"
    //% group=Angles
    //% blockGap=8
    //% weight=60
    export function shouldTurnClockwise(angleFrom: number, angleTo: number) {
        angleFrom = clampRadians(angleFrom);
        angleTo = clampRadians(angleTo);

        if (Math.abs(angleFrom - angleTo) > Math.PI) {
            if (angleFrom < angleTo) {
                angleFrom += TWO_PI;
            }
            else {
                angleTo += TWO_PI;
            }
        }

        return angleFrom < angleTo;
    }
}
