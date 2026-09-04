import type { CubeGlow } from "./simulation";

export const REST_GLOW = 0.08;
const PULSE_PERIOD = 2.4;
const PULSE_COUNT = 3;
/** Right cube trails the left by half a period so the pulse travels back and forth. */
const PULSE_STAGGER = 0.5;
export const INTRO_DURATION = PULSE_PERIOD * (PULSE_COUNT + PULSE_STAGGER);

const smoothstep = (edge0: number, edge1: number, x: number) => {
	const t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0), 1);
	return t * t * (3 - 2 * t);
};

/** One rest → peak → rest pulse shape over a unit cycle; 0 outside the pulse window. */
const pulse = (cycle: number) => {
	if (cycle < 0 || cycle >= PULSE_COUNT) return 0;
	const phase = cycle - Math.floor(cycle);
	return smoothstep(0.08, 0.38, phase) * (1 - smoothstep(0.7, 0.95, phase));
};

export const introGlow = (time: number): CubeGlow => [
	REST_GLOW + (1 - REST_GLOW) * pulse(time / PULSE_PERIOD),
	REST_GLOW + (1 - REST_GLOW) * pulse(time / PULSE_PERIOD - PULSE_STAGGER),
];

/** Moves a hover glow toward its target: quick to light up, slow to fade. */
export const approachGlow = (current: number, target: number, delta: number) => {
	const rate = target > current ? 8 : 2.5;
	return current + (target - current) * Math.min(1, delta * rate);
};

/** Hit-test a pointer (canvas-relative px) against the two cubes, with a small hover margin. */
export const hoveredCube = (
	x: number,
	y: number,
	width: number,
	height: number,
): 0 | 1 | undefined => {
	const half = Math.min(width, height) * 0.075 * 1.4;
	if (Math.abs(y - height * 0.5) > half) return undefined;
	if (Math.abs(x - width * 0.39) <= half) return 0;
	if (Math.abs(x - width * 0.61) <= half) return 1;
	return undefined;
};
