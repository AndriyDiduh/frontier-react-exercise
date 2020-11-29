import { FormInstructions } from "./formInstructionTypes";
import formInstructions from "./formInstructions.json";

/**
 * Test for data consistency
 */

test("DATA: Has a Sections data", () => {
  const data: FormInstructions = formInstructions;
  expect(data).toHaveProperty("sections");
});

test("DATA: Has a Theme data", () => {
  const data: FormInstructions = formInstructions;
  expect(data).toHaveProperty("theme");
});

test("DATA: One or more sections available to build a form", () => {
  expect(formInstructions.sections.length).toBeGreaterThan(0);
});
