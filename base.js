let wall = 2;
let spaceBetweenFloorAndPlatine = 8;

let platineX = 61;
let platineY = 34;
let platineZ = 15.5

let holeCenterX = 55.4;
let holeCenterY = 28.4;

let holeR = 1.5;

let outerX = platineX + 10;
let outerY = platineY + 10;
let outerZ = platineZ + spaceBetweenFloorAndPlatine + wall;


let cornerCubeX = (outerX - holeCenterX - holeR) / 2 + 2 * holeR ;
let cornerCubeY = (outerY - holeCenterY - holeR) / 2 + 2 * holeR ;
let cornerCubeZ = (wall + spaceBetweenFloorAndPlatine);

function notch(){
    let notchX = wall;
    let notchY = 14; // for cable
    let notchZ = outerZ - (wall + spaceBetweenFloorAndPlatine - 5 /*for cable*/);

    return translate(
        [0,(outerY-notchY)/2,(wall + spaceBetweenFloorAndPlatine - 5 /*for cable*/)],
        cube({size:[notchX,notchY,notchZ]})
    );
}

function notch5VSide(){
    let x=wall;
    let y=11;
    let z=9;
    
    let offsetX = outerX - wall;
    let offsetY = (outerY - y) / 2;
    let offsetZ = spaceBetweenFloorAndPlatine + wall + 1;
    
    return translate(
        [offsetX, offsetY, offsetZ],
        cube({size:[x,y,z]})
        );
}

function base() {
    let b = difference(
        cube({ size: [outerX, outerY, outerZ] }),
        translate(
            [wall, wall, wall],
            cube({ size: [outerX - wall * 2, outerY - wall * 2, outerZ - wall] })
        )
    );
    b = difference(b,notch());
    b = difference(b,notch5VSide());
    return b;
}

function cornerCubes() {
    let cc = cube({ size: [cornerCubeX, cornerCubeY, cornerCubeZ] });
    for(let x = 0; x < 2; x++){
        for(let y = 0; y < 2; y++){
            if(x == 0 && y == 0)
                continue;
            cc = union(cc, translate([x*(outerX-cornerCubeX), y*(outerY-cornerCubeY), 0], cube({ size: [cornerCubeX, cornerCubeY, cornerCubeZ] })))
        }
    }
    return cc;
}

function bolts(){
    let bolt = cylinder({r: holeR - 0.1, h: cornerCubeZ + 2, center: [true,true,false]}) ;
    let all = bolt;
    for(let x = 0; x < 2; x++){
        for(let y = 0; y < 2; y++){
            if(x == 0 && y == 0)
                continue;
            all = union(all, translate([x*holeCenterX, y*holeCenterY,0], bolt));
        }
    }
    return translate([(outerX-holeCenterX)/2, (outerY-holeCenterY)/2,0],all);
}



function withCornercubes(){
    return union(base(), cornerCubes());
}

function withCornercubesAndBolts(){
    return union(withCornercubes(), bolts());
}

function main() {
    return withCornercubesAndBolts()
}
