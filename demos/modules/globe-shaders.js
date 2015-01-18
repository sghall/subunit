var earthShader = {
  uniforms: {
    'texture': { type: 't', value: null }
  },
  vertexShader: [
    'varying vec3 vNormal;',
    'varying vec2 vUv;',
    'void main() {',
      'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
      'vNormal = normalize( normalMatrix * normal );',
      'vUv = uv;',
    '}'
  ].join('\n'),
  fragmentShader: [
    'uniform sampler2D texture;',
    'varying vec3 vNormal;',
    'varying vec2 vUv;',
    'void main() {',
      'vec3 diffuse = texture2D( texture, vUv ).xyz;',
      'float intensity = 1.05 - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) );',
      'vec3 atmosphere = vec3( 1.0, 1.0, 1.0 ) * pow( intensity, 3.0 );',
      'gl_FragColor = vec4( diffuse + atmosphere, 1.0 );',
    '}'
  ].join('\n')
};

var uniforms = THREE.UniformsUtils.clone(earthShader.uniforms);

uniforms['texture'].value = THREE.ImageUtils.loadTexture('images/world.jpg');

export var earth = new THREE.ShaderMaterial({
  uniforms: uniforms,
  vertexShader: earthShader.vertexShader,
  fragmentShader: earthShader.fragmentShader
});

var atmosphereShader = {
  uniforms: {},
  vertexShader: [
    'varying vec3 vNormal;',
    'void main() {',
      'vNormal = normalize( normalMatrix * normal );',
      'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
    '}'
  ].join('\n'),
  fragmentShader: [
    'varying vec3 vNormal;',
    'void main() {',
      'float intensity = pow( 0.8 - dot( vNormal, vec3( 0, 0, 1.0 ) ), 12.0 );',
      'gl_FragColor = vec4( 1.0, 1.0, 1.0, 1.0 ) * intensity;',
    '}'
  ].join('\n')
};

export var atmosphere = new THREE.ShaderMaterial({
  uniforms: THREE.UniformsUtils.clone(atmosphereShader.uniforms),
  vertexShader: atmosphereShader.vertexShader,
  fragmentShader: atmosphereShader.fragmentShader,
  side: THREE.BackSide,
  blending: THREE.AdditiveBlending,
  transparent: true
});

