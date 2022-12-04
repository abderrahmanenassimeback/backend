const priceService = require("../services/priceService");
const Price = require("../models/Price");
const mockingoose = require("mockingoose");

describe("Prize service tests", () => {
  test("Add new prize success", async () => {
    mockingoose(Price).toReturn(
      {
        name: "test",
        winningChance: 30,
        __v: 0,
      },
      "save"
    );

    // arrange and act
    var result = await priceService.addPrice("test", 30);
    // assert
    expect(result.name).toBe("test");
  });

  test("Add new prize fail", async () => {
    let error = null;

    try {
      var result = await priceService.addPrice("test", null);
    } catch (e) {
      error = e;
    }
    expect(error).not.toBeNull();
  });

  test("Get price list sucess", async () => {
    mockingoose(Price).toReturn(
      [
        {
          name: "signature tea",
          winningChance: 10,
          __v: 0,
        },
        {
          name: "discovery box worth €39",
          winningChance: 6,
          __v: 0,
        },
      ],
      "find"
    );

    // arrange and act
    var result = await priceService.getPriceList();
    // assert
    expect(result[0].name).toBe("signature tea");
  });

  test("Get price list fail ", async () => {
    var result = await priceService.getPriceList();
    // assert
    expect(result).toBeNull;
  });
});
