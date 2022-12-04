const contestService = require("../services/contestService");
const Contest = require("../models/Contest");
const Ticket = require("../models/Ticket");
const mockingoose = require("mockingoose");
const { default: mongoose } = require("mongoose");

describe("Contest service test", () => {
  test("Add new contest success", async () => {
    mockingoose.resetAll();
    mockingoose(Contest).toReturn([], "find");
    mockingoose(Contest).toReturn(
      {
        name: "Mega",
        startDate: "1.12.2022",
        endDate: "30.12.2022",
        ticketNumbers: 10,
        chooseprices: ["$24", "$46", "$67", "$140", "$150"],
        mainPrice: "$36",
        status: "InActive",
        createdAt: {
          $date: {
            $numberLong: "1670103871701",
          },
        },
        updatedAt: {
          $date: {
            $numberLong: "1670103871701",
          },
        },
        __v: 0,
      },
      "save"
    );

    //     // arrange and act
    var result = await contestService.createContest(
      "Mega",
      "1.12.2022",
      "30.12.2022",
      10,
      ["$24", "$46", "$67", "$140", "$150"],
      "$36",
      "Active"
    );
    // assert
    expect(result.name).toBe("Mega");
  });

  test("should give error when contest name already used", async () => {
    mockingoose(Contest).toReturn(
      [
        {
          name: "Mega",
          startDate: "1.12.2022",
          endDate: "30.12.2022",
          ticketNumbers: 10,
          chooseprices: ["$24", "$46", "$67", "$140", "$150"],
          mainPrice: "$36",
          status: "InActive",
          createdAt: {
            $date: {
              $numberLong: "1670103871701",
            },
          },
          updatedAt: {
            $date: {
              $numberLong: "1670103871701",
            },
          },
          __v: 0,
        },
      ],
      "find"
    );

    // arrange and act
    let error = null;
    try {
      var result = await contestService.createContest(
        "Mega",
        "1.12.2022",
        "30.12.2022",
        10,
        ["$24", "$46", "$67", "$140", "$150"],
        "$36",
        "Active"
      );
    } catch (err) {
      error = err;
    }

    expect(error).not.toBeNull();
  });
});
