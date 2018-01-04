interface Coordinates2D {
  x: number;
  y: number;
}

interface Coordinates3D extends Coordinates2D {
  z: number;
}

type CarthesianCoordinates = Coordinates2D | Coordinates3D;
const pos: CarthesianCoordinates = {
  x: 33,
  y: 311,
  z: -1,
};

function getTranslate(param: CarthesianCoordinates): string {
  if (isCoordinates3D(param)) {
    return `translate3d(${param.x}px, ${param.y}px, ${param.z}px)`;
  } else {
    return `translate(${param.x}px, ${param.y}px)`;
  }
}

function isCoordinates3D(param: CarthesianCoordinates): param is Coordinates3D {
  return 'z' in param;
}
