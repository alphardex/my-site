#pragma glslify:rotate=require(glsl-takara/rotate/rotate)
#pragma glslify:HALF_PI=require(glsl-takara/constants/HALF_PI)
#pragma glslify:PI=require(glsl-takara/constants/PI)
#pragma glslify:rotateByOrigin=require(glsl-takara/rotate/rotateByOrigin)

uniform float uProgress;
uniform float uAngle;
uniform float uTime;
uniform float uFloat;

varying vec2 vUv;
varying vec3 vPosition;

vec3 unroll(vec3 p,float angle,float progress){
    float rad=.1;
    float rolls=4.;
    vec3 zAxis=vec3(0.,0.,1.);
    vec3 origin=vec3(-.5,.5,0.);// 旋转中心为左上角
    vec3 origin2=vec3(-.5,.5,rad);
    float sc=sin(angle)+cos(angle);
    float totalAngle=rolls*PI;
    
    // rotate forward
    p=rotateByOrigin(p,zAxis,-angle,origin);
    
    float offset=(p.x+.5)/sc;
    float finalProgress=clamp((progress-offset)/.01,0.,1.);
    
    p.z=rad+rad*(1.-offset/2.)*sin(-offset*totalAngle-HALF_PI);
    p.x=-.5+rad*(1.-offset/2.)*cos(-offset*totalAngle+HALF_PI);
    
    // rotate back
    p=rotateByOrigin(p,zAxis,angle,origin);
    
    // unroll
    p=rotateByOrigin(p,vec3(sin(angle),cos(angle),0.),-progress*totalAngle,origin2);
    p+=vec3(
        progress*cos(angle)*sc,
        -progress*sin(angle)*sc,
        -progress*rad/2.
    );
    
    p=mix(p,position,finalProgress);
    return p;
}

vec3 distort(vec3 p){
    float freq=.25;
    float angle=(uTime*10.+uv.x*20.-uv.y*10.)*freq;
    float amp=uFloat*10.;
    float strength=sin(angle)*amp;
    p.z+=strength;
    return p;
}

void main(){
    vec3 newPos=position;
    
    vec3 unrolledPos=unroll(newPos,uAngle,uProgress);
    
    vec3 distortedPos=distort(unrolledPos);
    
    vec4 modelPosition=modelMatrix*vec4(distortedPos,1.);
    vec4 viewPosition=viewMatrix*modelPosition;
    vec4 projectedPosition=projectionMatrix*viewPosition;
    gl_Position=projectedPosition;
    
    vUv=uv;
    vPosition=position;
}