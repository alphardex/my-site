#pragma glslify:getEyeVector=require(../modules/getEyeVector)
#pragma glslify:rotate=require(glsl-rotate)
#pragma glslify:PI=require(glsl-constants/PI)
#pragma glslify:qinticInOutAbs=require(../modules/qinticInOutAbs)

uniform float uTime;
uniform vec3 uAxis;
uniform float uVelocity;

uniform float uDistortion;

varying vec2 vUv;

varying vec3 vNormal;
varying vec3 vEyeVector;

void main(){
    // 扭曲并旋转顶点
    vec3 newPos=position;
    float displacement=uVelocity*uTime;
    float progress=fract(displacement)-.02*uDistortion*dot(uAxis,newPos);
    progress=qinticInOutAbs(progress)*PI;
    newPos=rotate(newPos,uAxis,progress);
    
    vec4 modelPosition=modelMatrix*vec4(newPos,1.);
    vec4 viewPosition=viewMatrix*modelPosition;
    vec4 projectedPosition=projectionMatrix*viewPosition;
    gl_Position=projectedPosition;
    
    vUv=uv;
    
    // 获取N和I
    vNormal=rotate(normal,uAxis,progress);
    vEyeVector=getEyeVector(modelMatrix,newPos,cameraPosition);
}