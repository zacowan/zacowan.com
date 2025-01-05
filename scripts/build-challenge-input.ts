// NOTE: the goal with this script is to prevent the challenge solution from being in the client js bundle
import "dotenv/config";
import { writeFile, copyFile, readFile, rm } from "fs/promises";
import path from "path";
import { caesarShift } from "@/lib/caesar";

const SERVER_CONSTANTS_FILE = path.resolve(
  __dirname,
  "../lib/constants.server.ts",
);
const TMP_SERVER_CONSTANTS_FILE = path.resolve(
  __dirname,
  "../lib/constants.server.tmp.ts",
);
const OUTPUT_FILE = path.resolve(__dirname, "../lib/challenge-input.ts");

const main = async () => {
  // copy the constants file
  await copyFile(SERVER_CONSTANTS_FILE, TMP_SERVER_CONSTANTS_FILE);
  // remove the first line of the copied file, which should be the logic to ensure that the constants file is only imported on the server
  const tmpConstants = await readFile(TMP_SERVER_CONSTANTS_FILE, "utf-8");
  const lines = tmpConstants.split("\n");
  lines.shift();
  const newTmpConstants = lines.join("\n");
  await writeFile(TMP_SERVER_CONSTANTS_FILE, newTmpConstants);
  // dynamically import the constants file and extract the CHALLENGE_SOLUTION named export
  const { CHALLENGE_SOLUTION } = (await import(TMP_SERVER_CONSTANTS_FILE)) as {
    CHALLENGE_SOLUTION: string;
  };
  // write the new file with the caesar-shifted CHALLENGE_SOLUTION
  const code = `export const CHALLENGE_INPUT = "${caesarShift(CHALLENGE_SOLUTION, 23)}";`;
  await writeFile(OUTPUT_FILE, code);
  // remove the temporary constants file
  await rm(TMP_SERVER_CONSTANTS_FILE);
};

main();
