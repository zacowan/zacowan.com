// Two cubes act as both light emitters and solid occluders for the cascade field.
// RGB is HDR radiance while alpha stays opaque, so the light can wrap around the
// geometry without turning either cube into a soft particle.

struct AgentDots {
  size: vec2f,
  time: f32,
  spacing: f32,
  radius: f32,
  animation_mode: u32,
};

@group(0) @binding(0) var<uniform> agent: AgentDots;

fn box_sdf(point: vec2f, center: vec2f, half_size: vec2f) -> f32 {
  let delta = abs(point - center) - half_size;
  return length(max(delta, vec2f(0.0))) + min(max(delta.x, delta.y), 0.0);
}

fn cube_strength(index: f32) -> f32 {
  let cycle = fract(agent.time / 2.4 + index * 0.5);
  return 0.14 + 0.86 * smoothstep(0.08, 0.38, cycle) *
    (1.0 - smoothstep(0.7, 0.95, cycle));
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
  let left_emission = mix(0.16, 4.8, cube_strength(0.0));
  let right_emission = mix(0.16, 4.8, cube_strength(1.0));
  let ember = vec3f(1.0, 0.07, 0.015);
  let radiance = ember * (left_emission * left_mask + right_emission * right_mask);
  return vec4f(radiance, max(left_mask, right_mask));
}
