// Two cubes act as both light emitters and solid occluders for the cascade field.
// RGB is HDR radiance while alpha stays opaque, so the light can wrap around the
// geometry without turning either cube into a soft particle.

struct AgentDots {
  size: vec2f,
  /** Per-cube glow, 0..1: left in x, right in y. */
  glow: vec2f,
  /** xy: pointer in scene pixels; z: 1 while a pointer is over the canvas, else 0. */
  pointer: vec4f,
};

@group(0) @binding(0) var<uniform> agent: AgentDots;

fn box_sdf(point: vec2f, center: vec2f, half_size: vec2f) -> f32 {
  let delta = abs(point - center) - half_size;
  return length(max(delta, vec2f(0.0))) + min(max(delta.x, delta.y), 0.0);
}

// Skews a cube's emission toward the face nearest the pointer. Uniform when the pointer
// sits at the cube's center or is absent; fully one-sided once it reaches an edge.
fn directional_weight(pixel: vec2f, center: vec2f, half_size: vec2f) -> f32 {
  let offset = agent.pointer.xy - center;
  let reach = length(offset) / half_size.x;
  let bias = agent.pointer.z * clamp(reach, 0.0, 1.0);
  let dir = offset / max(length(offset), 1e-3);
  let local = clamp((pixel - center) / half_size, vec2f(-1.0), vec2f(1.0));
  let facing = clamp(0.5 + 0.5 * dot(local, dir), 0.0, 1.0);
  return mix(1.0, 2.0 * facing, bias);
}

@fragment
fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let pixel = uv * agent.size;
  let edge = min(agent.size.x, agent.size.y);
  let half_size = vec2f(edge * 0.075);
  let left_center = agent.size * vec2f(0.39, 0.5);
  let right_center = agent.size * vec2f(0.61, 0.5);
  let left_mask = 1.0 - smoothstep(-0.8, 0.8, box_sdf(pixel, left_center, half_size));
  let right_mask = 1.0 - smoothstep(-0.8, 0.8, box_sdf(pixel, right_center, half_size));
  let left_emission = mix(0.16, 4.8, agent.glow.x) * directional_weight(pixel, left_center, half_size);
  let right_emission = mix(0.16, 4.8, agent.glow.y) * directional_weight(pixel, right_center, half_size);
  let ember = vec3f(1.0, 0.07, 0.015);
  let radiance = ember * (left_emission * left_mask + right_emission * right_mask);
  return vec4f(radiance, max(left_mask, right_mask));
}
