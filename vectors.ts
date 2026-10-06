namespace mathUtils {
    export enum SpriteVectorType {
        //% block="position"
        Position,
        //% block="velocity"
        Velocity,
        //% block="acceleration"
        Acceleration,
        //% block="friction"
        Friction,
        //% block="scaling"
        Scaling
    }

    export enum VectorComponent {
        //% block="x"
        X,
        //% block="y"
        Y
    }

    //% blockId=mathUtils_createVector
    //% block="x $x y $y"
    //% group=Vectors
    //% weight=130
    //% blockSetVariable=myVector
    export function createVector(x: number, y: number): util.Point {
        return new util.Point(x, y);
    }

    //% blockId=mathUtils_getSpriteVector
    //% block="$sprite $kind vector"
    //% sprite.shadow=variables_get
    //% sprite.defl=mySprite
    //% group=Vectors
    //% blockGap=8
    //% weight=120
    export function getSpriteVector(sprite: Sprite, kind: SpriteVectorType) {
        switch (kind) {
            case SpriteVectorType.Position:
                return new util.Point(sprite.x, sprite.y);
            case SpriteVectorType.Velocity:
                return new util.Point(sprite.vx, sprite.vy);
            case SpriteVectorType.Acceleration:
                return new util.Point(sprite.ax, sprite.ay);
            case SpriteVectorType.Friction:
                return new util.Point(sprite.fx, sprite.fy);
            case SpriteVectorType.Scaling:
                return new util.Point(sprite.sx, sprite.sy);
        }
    }

    //% blockId=mathUtils_setSpriteVector
    //% block="set $sprite $kind vector to $vector"
    //% sprite.shadow=variables_get
    //% sprite.defl=mySprite
    //% vector.shadow=mathUtils_createVector
    //% group=Vectors
    //% weight=110
    export function setSpriteVector(sprite: Sprite, kind: SpriteVectorType, vector: util.Point) {
        switch (kind) {
            case SpriteVectorType.Position:
                sprite.setPosition(vector.x, vector.y);
                break;
            case SpriteVectorType.Velocity:
                sprite.setVelocity(vector.x, vector.y);
                break;
            case SpriteVectorType.Acceleration:
                sprite.ax = vector.x;
                sprite.ay = vector.y;
                break;
            case SpriteVectorType.Friction:
                sprite.fx = vector.x;
                sprite.fy = vector.y;
                break;
            case SpriteVectorType.Scaling:
                sprite.sx = vector.x;
                sprite.sy = vector.y;
                break;
        }
    }

    //% blockId=mathUtils_getVectorComponent
    //% block="$vector $component"
    //% vector.shadow=variables_get
    //% vector.defl=myVector
    //% group=Vectors
    //% weight=100
    //% blockGap=8
    export function getVectorComponent(vector: util.Point, component: VectorComponent) {
        return component === VectorComponent.X ? vector.x : vector.y;
    }

    //% blockId=mathUtils_setVectorComponent
    //% block="set $vector $component to $value"
    //% vector.shadow=variables_get
    //% vector.defl=myVector
    //% group=Vectors
    //% weight=90
    export function setVectorComponent(vector: util.Point, component: VectorComponent, value: number) {
        if (component === VectorComponent.X) {
            vector.x = value;
        }
        else {
            vector.y = value;
        }
    }

    //% blockId=mathUtils_addVectors
    //% block="$v1 + $v2"
    //% v1.shadow=mathUtils_createVector
    //% v2.shadow=mathUtils_createVector
    //% group=Vectors
    //% weight=80
    //% blockGap=8
    export function addVectors(v1: util.Point, v2: util.Point) {
        return new util.Point(v1.x + v2.x, v1.y + v2.y);
    }

    //% blockId=mathUtils_subtractVectors
    //% block="$v1 - $v2"
    //% v1.shadow=mathUtils_createVector
    //% v2.shadow=mathUtils_createVector
    //% group=Vectors
    //% weight=70
    //% blockGap=8
    export function subtractVectors(v1: util.Point, v2: util.Point) {
        return new util.Point(v1.x - v2.x, v1.y - v2.y);
    }

    //% blockId=mathUtils_scaleVector
    //% block="scale $v by $scalar"
    //% v.shadow=mathUtils_createVector
    //% group=Vectors
    //% weight=60
    export function scaleVector(v: util.Point, scalar: number) {
        return new util.Point(v.x * scalar, v.y * scalar);
    }

    //% blockId=mathUtils_vectorMagnitude
    //% block="$v magnitude"
    //% v.shadow=mathUtils_createVector
    //% group=Vectors
    //% weight=55
    //% blockGap=8
    export function vectorMagnitude(v: util.Point) {
        return Math.sqrt(v.x * v.x + v.y * v.y);
    }

    //% blockId=mathUtils_vectorAngle
    //% block="$v angle"
    //% v.shadow=mathUtils_createVector
    //% group=Vectors
    //% weight=53
    export function vectorAngle(v: util.Point) {
        return Math.atan2(v.y, v.x);
    }

    //% blockId=mathUtils_vectorDotProduct
    //% block="$v1 · $v2"
    //% v1.shadow=mathUtils_createVector
    //% v2.shadow=mathUtils_createVector
    //% group=Vectors
    //% weight=50
    export function vectorDotProduct(v1: util.Point, v2: util.Point) {
        return v1.x * v2.x + v1.y * v2.y;
    }

    //% blockId=mathUtils_normalizeVector
    //% block="normalize $v"
    //% v.shadow=mathUtils_createVector
    //% group=Vectors
    //% weight=45
    //% blockGap=8
    export function normalizeVector(v: util.Point) {
        const magnitude = vectorMagnitude(v);
        if (magnitude === 0) {
            // arbitrary choice, since we can't normalize a zero vector
            return new util.Point(1, 0);
        }
        return new util.Point(v.x / magnitude, v.y / magnitude);
    }

    //% blockId=mathUtils_normalFromAngle
    //% block="normal vector from angle $angle"
    //% group=Vectors
    //% weight=42
    //% blockGap=8
    export function normalFromAngle(angle: number) {
        return new util.Point(Math.cos(angle), Math.sin(angle));
    }

    //% blockId=mathUtils_orthogonalNormal
    //% block="orthogonal normal of $v"
    //% v.shadow=mathUtils_createVector
    //% group=Vectors
    //% weight=41
    export function orthogonalNormal(v: util.Point) {
        const ortho = new util.Point(-v.y, v.x);
        return normalizeVector(ortho);
    }

    //% blockId=mathUtils_rotateVector
    //% block="rotate $v by $angle radians"
    //% v.shadow=mathUtils_createVector
    //% group=Vectors
    //% weight=40
    //% blockGap=8
    export function rotateVector(v: util.Point, angle: number) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        return new util.Point(v.x * cos - v.y * sin, v.x * sin + v.y * cos);
    }

    //% blockId=mathUtils_reflectVector
    //% block="reflect $v across normal $normal"
    //% v.shadow=mathUtils_createVector
    //% normal.shadow=mathUtils_createVector
    //% group=Vectors
    //% weight=30
    //% blockGap=8
    export function reflectVector(v: util.Point, normal: util.Point) {
        const d2 = 2 * vectorDotProduct(v, normal);

        return new util.Point(
            v.x - d2 * normal.x,
            v.y - d2 * normal.y
        );
    }

    //% blockId=mathUtils_deflectVectorOffLineSegment
    //% block="deflect $v off line from $lineStart to $lineEnd"
    //% v.shadow=mathUtils_createVector
    //% lineStart.shadow=mathUtils_createVector
    //% lineEnd.shadow=mathUtils_createVector
    //% group=Vectors
    //% weight=20
    //% blockGap=8
    export function deflectVectorOffLineSegment(v: util.Point, lineStart: util.Point, lineEnd: util.Point) {
        const lineVector = subtractVectors(lineEnd, lineStart);
        const lineNormal = orthogonalNormal(lineVector);
        return reflectVector(v, lineNormal);
    }

    //% blockId=mathUtils_projectVector
    //% block="project $v onto $onto"
    //% v.shadow=mathUtils_createVector
    //% onto.shadow=mathUtils_createVector
    //% group=Vectors
    //% weight=10
    export function projectVector(v: util.Point, onto: util.Point) {
        return scaleVector(onto, vectorDotProduct(v, onto) / vectorDotProduct(onto, onto));
    }
}