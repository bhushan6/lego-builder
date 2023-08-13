/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useLayoutEffect, useMemo, useRef } from "react";
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
uniform vec2 uResolution;
uniform vec2 uSize;

void main() {
    vec2 p = vUv * uSize;
    float border = 0.0;

    if (p.x < uBorderWidth / 2.0 || p.x > uSize.x - uBorderWidth / 2.0 ||
      p.y < uBorderWidth / 2.0 || p.y > uSize.y - uBorderWidth / 2.0) {
    border = 1.0;
  }

  gl_FragColor = vec4( uBorderColor, border);

}
`;

export const BorderPlane = ({
  planeSize = [10, 10],
  color = "#ffffff",
  ...props
}) => {
  const { size } = useThree();

  const ref = useRef();

  const uniforms = useMemo(() => {
    return {
      uTime: { value: 0 },
      uBorderColor: { value: new Color(0xffffff) },
      uBorderWidth: { value: 10 },
      uResolution: { value: new Vector2() },
      uSize: { value: new Vector2(20, 20) },
    };
  }, []);

  useLayoutEffect(() => {
    ref.current.material.uniforms.uResolution.value.x = size.width;
    ref.current.material.uniforms.uResolution.value.y = size.height;
  }, [size]);

  useLayoutEffect(() => {
    ref.current.material.uniforms.uSize.value.x = planeSize[0];
    ref.current.material.uniforms.uSize.value.y = planeSize[1];
  }, [planeSize]);

  useLayoutEffect(() => {
    // ref.current.material.uniforms.uBorderColor.value = color;
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

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      ref={ref}
      material={planeMaterial}
      {...props}
    >
      <planeGeometry args={planeSize} />
    </mesh>
  );
};
