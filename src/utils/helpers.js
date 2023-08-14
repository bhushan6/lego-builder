import { base, knobSize } from "./constants";
import { BoxGeometry, CylinderGeometry } from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

export function CSSToHex(cssColor) {
  return parseInt(`0x${cssColor.substring(1)}`, 16);
}

export function getMeasurementsFromDimensions({ x, y, z }) {
  return {
    width: base * x,
    height: base * y || (base * 2) / 1.5,
    depth: base * z,
  };
}

export function mergeMeshes(geometries) {
  return mergeGeometries(geometries);
}

export function createGeometry({
  width,
  height,
  depth,
  dimensions,
  knobDim = knobSize,
}) {
  let geometries = [];
  const cubeGeo = new BoxGeometry(width - 0.1, height - 0.1, depth - 0.1);

  geometries.push(cubeGeo);

  for (let i = 0; i < dimensions.x; i++) {
    for (let j = 0; j < dimensions.z; j++) {
      const cylinder = new CylinderGeometry(knobDim, knobDim, knobDim, 20);
      const x = base * i - ((dimensions.x - 1) * base) / 2;
      const y = base / 1.5;
      const z = base * j - ((dimensions.z - 1) * base) / 2;
      cylinder.translate(x, y, z);
      geometries.push(cylinder);
    }
  }

  const brickGeometry = mergeGeometries(geometries);
  return brickGeometry;
}

export function collisonXYZ(o1, o2) {
  if (
    Math.abs(o1.position.x - o2.position.x) >
    (o1.geometry.parameters.width + o2.geometry.parameters.width) / 2
  )
    return false;
  if (
    Math.abs(o1.position.y - o2.position.y) >
    (o1.geometry.parameters.height + o2.geometry.parameters.height) / 2
  )
    return false;
  if (
    Math.abs(o1.position.z - o2.position.z) >
    (o1.geometry.parameters.depth + o2.geometry.parameters.depth) / 2
  ) {
    return false;
  }
  return true;
}

export function degToRad(angle) {
  return angle * (Math.PI / 180);
}

export function radToDeg(angle) {
  return 360 - (angle / Math.PI) * 180;
}

export function uID(length = 8) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
}

function hslToRgb(h, s, l) {
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function rgbToHex(r, g, b) {
  return (
    "#" +
    ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
  );
}

export function generateSoftColors() {
  const hue = Math.random();
  const saturation = Math.random() * 0.2 + 0.4; // 40% to 60%
  const lightness = Math.random() * 0.3 + 0.5; // 50% to 80%

  const [r, g, b] = hslToRgb(hue, saturation, lightness);
  const hexColor = rgbToHex(r, g, b);

  return hexColor;
}
