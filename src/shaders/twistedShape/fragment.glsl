#pragma glslify:fresnel=require(../modules/fresnel)

uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;

uniform vec3 uColor;

varying vec2 vUv;

varying vec3 vNormal;
varying vec3 vEyeVector;

void main(){
    vec2 newUv=vUv;
    vec3 color=uColor;
    
    // 菲涅尔反射
    float F=fresnel(0.,.6,2.,vEyeVector,vNormal);
    color+=F;
    
    gl_FragColor=vec4(color,1.);
}