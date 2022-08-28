import { computeAvailableStock } from "./api";

describe("Api", () => {
  describe("computeAvailableStock", () => {
    test("should return updated products data with available stock and name of product", () => {
      const returnVal = computeAvailableStock(
        [
          {
            id: "prod-1",
            name: "Dining Table",
            articles: [
              { id: "art-1", amountRequired: 4 },
              { id: "art-2", amountRequired: 1 },
            ],
          },
        ],
        [
          {
            id: "art-1",
            name: "Patched Leg",
            amountInStock: 20,
          },
          {
            id: "art-2",
            name: "Patched Screw",
            amountInStock: 92,
          },
        ]
      );

      const expectedValue = [
        {
          id: "prod-1",
          name: "Dining Table",
          articles: [
            {
              id: "art-1",
              amountRequired: 4,
              name: "Patched Leg",
            },
            {
              id: "art-2",
              amountRequired: 1,
              name: "Patched Screw",
            },
          ],
          availableStock: 5,
        },
      ];

      expect(returnVal).toEqual(expectedValue);
    });
  });
});
