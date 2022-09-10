varying vec2 vUv;
varying vec3 vNormal;
varying vec3 eyeVector;
attribute vec3 aBarry;
varying vec3 vBarry;

void main(){
    vBarry=aBarry;
    vec3 newPosition=position;
    vec4 worldPosition=modelMatrix*vec4(position,1.0);
    eyeVector=normalize(worldPosition.xyz-cameraPosition);

    vec4 modelPosition=modelMatrix*vec4(position,1.);
    vec4 viewPosition=viewMatrix*modelPosition;
    gl_Position=projectionMatrix*viewPosition;

    vUv=uv;
    vNormal=normalize(normalMatrix*normal);
}