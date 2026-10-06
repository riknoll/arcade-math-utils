namespace mathUtils {
    export function lineIntersectsLine(
        line1Start: util.Point,
        line1End: util.Point,
        line2Start: util.Point,
        line2End: util.Point
    ) {
        // https://github.com/anvaka/isect/blob/master/src/intersectSegments.js
        const s1_x = line1Start.x - line1End.x;
        const s1_y = line1Start.y - line1End.y;
        const s2_x = line2Start.x - line2End.x;
        const s2_y = line2Start.y - line2End.y;

        const div = s1_x * s2_y - s2_x * s1_y;

        const s = (s1_y * (line1Start.x - line2Start.x) - s1_x * (line1Start.y - line2Start.y)) / div;
        if (s < 0 || s > 1) return null;

        const t = (s2_x * (line2Start.y - line1Start.y) + s2_y * (line1Start.x - line2Start.x)) / div;

        if (t >= 0 && t <= 1) {
            return new util.Point(
                line1Start.x - (t * s1_x),
                line1Start.y - (t * s1_y)
            );
        }
        return null;
    }
}