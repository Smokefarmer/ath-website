export const fragmentShader = `
uniform vec3 iResolution;
uniform float iTime;
uniform int iFrame;
uniform sampler2D iChannel0;


varying vec2 vUv;

mat3 rotz(float a) {
    float c = cos(a), s = sin(a);
    return mat3(c,-s,0,s,c,0,0,0,1);
}

float sdHexPrism(vec3 p, vec2 h) {
    vec3 q = abs(p);
    const vec3 k = vec3(-0.8660254, 0.5, 0.57735);
    p = abs(p);
    p.xy -= 2.0*min(dot(k.xy, p.xy), 0.0)*k.xy;
    vec2 d = vec2(
        length(p.xy - vec2(clamp(p.x, -k.z*h.x, k.z*h.x), h.x))*sign(p.y - h.x),
        p.z-h.y );
    return min(max(d.x,d.y),0.0) + length(max(d,0.0));
}

#define ox 1.3
#define oz 1.5
float var_z = 0.0;

void common_map(vec3 p, out float df0, out float df1) {
    p *= rotz(p.z * 0.05);

    p.y = 7.0 + 5.0 * var_z - p.y; 

    float wave = sin(length(p.xz) * 0.0 - iTime * 0.0);

    df0 = p.y + wave - 1.0;
    vec2 hex_size = vec2(0.25 + p.y * 0.25, 10.0);


	vec3 q0 = p;
	q0.x = mod(q0.x - ox, ox + ox) - ox;
	q0.z = mod(q0.z - oz * 0.5, oz) - oz * 0.5;
	float hex0 = sdHexPrism(q0.xzy, hex_size) - 0.2; 
	

	vec3 q1 = p;
	q1.x = mod(q1.x, ox + ox) - ox;
	q1.z = mod(q1.z, oz) - oz * 0.5;
	float hex1 = sdHexPrism(q1.xzy, hex_size) - 0.2; 
	
    // the hexagones
	df1 = min(hex0, hex1);
}

float smin(float a, float b, float k) {
    float h = clamp(0.5 + 0.5*(b-a)/k, 0.0, 1.0);
    return mix(b, a, h) - k*h*(1.0-h);
}

float smax(float a, float b, float k) {
    return smin(a, b, -k);
}

float map(vec3 p) {
    float df0, df1;
    common_map(p, df0, df1);
    return smax(df0, df1, 0.1);
}

float mat(vec3 p) {
    float df0, df1;
    common_map(p, df0, df1);
    if (df0 > df1) return 1.0;
    return 0.0;
}

vec3 getNormal(vec3 p) {
    const vec3 e = vec3(0.1, 0, 0);
    return normalize(vec3(
        map(p+e)-map(p-e),
        map(p+e.yxz)-map(p-e.yxz),
        map(p+e.zyx)-map(p-e.zyx)));
}

float getAmbiantOcclusion(vec3 p, vec3 n, float k) {
    float diff = 0.1; 
    float d = map(p + n*diff);
    float occl = (diff - d);
    return clamp(1.0 - k*occl, 0.0, 1.0);
}

float getShadow(vec3 ro, vec3 rd, float minD, float maxD, float k) {
    float res = 1.0;
    float d = minD;
    float s = 0.;
    for(int i = 0; i < 20; ++i) {
        s = map(ro + rd * d);
        if(abs(s)<d*d*1e-5) return 0.0;
        res = min(res, k * s / d);
        d += s;
        if(d >= maxD) break;
    }
    return res;
}

vec3 cam(vec2 uv, vec3 ro, vec3 cv, float fov) {
    vec3 cu = normalize(vec3(0,1,0));
    vec3 z = normalize(cv-ro);
    vec3 x = normalize(cross(cu,z));
    vec3 y = cross(z,x);
    return normalize(z + fov*uv.x*x + fov*uv.y*y);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 si = iResolution.xy;
    vec2 uvc = (2.*fragCoord.xy-si)/si.y;
    vec3 ro = vec3(0.0, 0.0, iTime * 20.0 + 5.0);
    vec3 cv = ro + vec3(0.0, 0.0, 2.0);
    vec3 rd = cam(uvc, ro, cv, 0.4);

    vec3 col = vec3(0);
    vec3 p = ro;
    float s = 1., d = 0.;
    const float md = 70.;

    for (int i = 0; i < 50; i++) {
      float safeS = max(s, 1e-6);
      if (d*d/safeS > 1e6 || d > md) break;
       var_z = sin(p.z * 0.1) * 0.5 + 0.5; 
       s = map(p); 
       d += s * 0.5; 
       p = ro + rd * d;
    }
    
if (d < md) {
    vec3 n = getNormal(p);
    vec3 lp = vec3(0,5,0);
    vec3 ld = normalize(lp - p);
    float diff = pow(dot(n, ld) * .5 + .5,2.0);
    float ao = getAmbiantOcclusion(p, n, 10.0);
    float sha = clamp(getShadow(p, ld, 0.01, 130.0, 5.0), 0. ,0.9);
    
       if (mat(p) > 0.5) { 
                vec3 green1 = vec3(0.05, 0.2, 0.05);
                vec3 green2 = vec3(0.15, 0.25, 0.15);
                vec3 darkGrey = vec3(0.1);
                vec3 g = mix(green1, green2, var_z * 0.7);
                col = mix(g, darkGrey, 0.25);

        } else {
                col = vec3(0.1575) * 0.5;
        }    
          col *= texture2D(iChannel0, reflect(rd, n).xy * 0.5 + 0.5).rgb;
          col += diff * sha * 0.5;
    }
           
    
    col = clamp(col, 0., 1.);

    col *= exp(1.0-d*d*0.001);

    fragColor = vec4(col, 1.0);
}

// === Three.js entrypoint ===
void main() {
    vec2 fragCoord = vUv * iResolution.xy;
    vec4 color = vec4(0.0);
    mainImage(color, fragCoord);
    gl_FragColor = color;
}
`;
