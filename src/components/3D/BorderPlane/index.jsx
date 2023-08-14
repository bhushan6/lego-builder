/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import {
  useLayoutEffect,
  useMemo,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { DoubleSide, RawShaderMaterial, Color, Vector2 } from "three";

const vertexShader = `
varying vec2 vUv;
attribute vec3 normal;
attribute vec3 position;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

varying vec3 vNormal;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * viewMatrix  * modelMatrix * vec4(position, 1.0);
}
`;
const fragmentShader = `
precision highp float;
varying vec2 vUv;

uniform vec3 uBorderColor;
uniform float uBorderWidth;
uniform float uBorderRadius;
uniform vec2 uResolution;
uniform vec2 uSize;

float getEdgeDist() {
  vec2 ndc = vec2( vUv.x * 2.0 - 1.0, vUv.y * 2.0 - 1.0 );
  vec2 planeSpaceCoord = vec2( uSize.x * 0.5 * ndc.x, uSize.y * 0.5 * ndc.y );
  vec2 corner = uSize * 0.5;
  vec2 offsetCorner = corner - abs( planeSpaceCoord );
  float innerRadDist = min( offsetCorner.x, offsetCorner.y ) * -1.0;
  float roundedDist = length( max( abs( planeSpaceCoord ) - uSize * 0.5 + uBorderRadius, 0.0 ) ) - uBorderRadius;
  float s = step( innerRadDist * -1.0, uBorderRadius );
  return mix( innerRadDist, roundedDist, s );
}

void main() {
    vec2 p = vUv * uSize;
    float border = 0.0;
    
    float edgeDist = getEdgeDist();

    if ( edgeDist * -1.0 < uBorderWidth ) {
      gl_FragColor = vec4( uBorderColor, 1 );
    }else{
      discard;
    }
}
`;

export const BorderPlane = forwardRef(function BorderPlane(
  { planeSize = [25, 25], color = "#ffffff", ...props },
  ref
) {
  const { size } = useThree();

  const mesh = useRef();

  const uniforms = useMemo(() => {
    return {
      uTime: { value: 0 },
      uBorderColor: { value: new Color(0xffffff) },
      uBorderWidth: { value: 5 },
      uBorderRadius: { value: 0 },
      uResolution: { value: new Vector2() },
      uSize: { value: new Vector2(25, 25) },
    };
  }, []);

  useLayoutEffect(() => {
    mesh.current.material.uniforms.uResolution.value.x = size.width;
    mesh.current.material.uniforms.uResolution.value.y = size.height;
  }, [size]);

  useLayoutEffect(() => {
    mesh.current.material.uniforms.uSize.value.x = planeSize[0];
    mesh.current.material.uniforms.uSize.value.y = planeSize[1];
    mesh.current.material.uniforms.uBorderWidth.value =
      (Math.min(planeSize[0], planeSize[1]) / 50) * 5;
  }, [planeSize]);

  useLayoutEffect(() => {
    mesh.current.material.uniforms.uBorderColor.value.set(color);
  }, [color]);

  const planeMaterial = useMemo(() => {
    return new RawShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      visible: true,
      side: DoubleSide,
    });
  }, [uniforms]);

  //   useFrame(({ clock }) => {
  //     const { elapsedTime } = clock;
  //     planeMaterial.uniforms.uTime.value = elapsedTime;
  //   });

  useImperativeHandle(ref, () => mesh.current);

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      ref={mesh}
      material={planeMaterial}
      {...props}
    >
      <planeGeometry args={planeSize} />
    </mesh>
  );
});
