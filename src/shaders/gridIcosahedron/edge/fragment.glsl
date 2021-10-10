#pragma glslify:edgeFactorTri=require(../../modules/edgeFactorTri)

uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;

uniform float uWidth;

varying vec2 vUv;

varying vec3 vCenter;

void main(){
    float line=1.-edgeFactorTri(vCenter,uWidth);
    if(line<.1){
        discard;
    }
    vec3 color=vec3(vec2(line),1.);
    gl_FragColor=vec4(color,1.);
}