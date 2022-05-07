import * as index from "./index";

describe("side-nav/CollapseButton/index", () => {
  [
    {
      name: "default",
      value: expect.any(Function),
    },
  ].forEach(({ name, value }) => {
    it(`exports ${name}`, () => {
      expect(index).toHaveProperty(name, value);
    });
  });
});
