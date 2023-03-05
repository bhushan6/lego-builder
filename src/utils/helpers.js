import { base } from "./constants";
import * as THREE from "three";
import { mergeBufferGeometries } from "three/addons/utils/BufferGeometryUtils.js";

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
  return mergeBufferGeometries(geometries);
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
  )
    return false;
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
