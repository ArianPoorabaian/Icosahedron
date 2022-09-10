uniform sampler2D uTexture;

varying vec3 vNormal;
varying vec2 vUv;
varying vec3 eyeVector;

vec2 hash22(vec2 p){
  p=fract(p*vec2(5.3983,5.4427));
  p +=dot(p.yx,p.xy + vec2(21.5351,14.3137));
  return fract(vec2(p.x*p.y*95.4337,p.x*p.y*97.597));
}


void main()
{

  vec3 X=dFdx(vNormal);
  vec3 Y=dFdy(vNormal);
  vec3 normal=normalize(cross(X,Y));
  float diifuse=dot(normal,vec3(1.0));
  vec2 rand=hash22(vec2(floor(diifuse*12.0)));

  vec2 uuv=vec2(
    sign(rand.x-0.5)*1.0 + (rand.x-0.5)*0.6,
    sign(rand.y-0.5)*1.0 + (rand.y-0.5)*0.6);

  vec2 uv=uuv*gl_FragCoord.xy/vec2(2000.0,1500.0);



  vec3 refracted=refract(eyeVector,normal,1.0/3.0);
  uv+=0.2*refracted.xy;


  vec4 txt=texture2D(uTexture,uv);
  gl_FragColor=txt; 
  // gl_FragColor=vec4(diifuse); 
  // gl_FragColor=vec4(eyeVector,1.0); 
}