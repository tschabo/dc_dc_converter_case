let platineX = 61;
let platineY = 34;
let platineZ = 15.5

let holeCenterX = 55.4;
let holeCenterY = 28.4;

let holeR = 1.5;

let outerX = platineX + 10;
let outerY = platineY + 10;
let outerZ = platineZ + 2.5;

let wall = 2;
let spaceBetweenFloorAndPlatine = 4;

let cornerCubeX = (outerX - holeCenterX - holeR) / 2 + 2 * holeR + 2;
let cornerCubeY = (outerY - holeCenterY - holeR) / 2 + 2 * holeR + 2;
let cornerCubeZ = (wall + spaceBetweenFloorAndPlatine);

function base() {
    return difference(
        cube({ size: [outerX, outerY, outerZ] }),
        translate(
            [wall, wall, wall],
            cube({ size: [outerX - wall * 2, outerY - wall * 2, outerZ - wall] })
        )
    );
}

function cornerCubes() {
    let cc = cube({ size: [cornerCubeX, cornerCubeY, cornerCubeZ] });//= cube({ size: [cornerCubeX, cornerCubeY, cornerCubeZ] });
    for(let x = 0; x < 2; x++){
        for(let y = 0; y < 2; y++){
            if(x == 0 && y == 0)
                continue;
            cc = union(cc, translate([x*(outerX-cornerCubeX), y*(outerY-cornerCubeY), 0], cube({ size: [cornerCubeX, cornerCubeY, cornerCubeZ] })))
        }
    }
    return cc;
}

function withCornercubes(){
    return union(base(), cornerCubes());
}

function main() {
    return withCornercubes()
}