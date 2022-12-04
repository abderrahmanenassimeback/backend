const userService = require("../services/userService");
const User = require("../models/User");
const mockingoose = require("mockingoose");

describe("User service tests", () => {
  test("Get users sucess", async () => {
    mockingoose(User).toReturn(
      [
        {
          name: "nassim abderahman",
          email: "nassimabderahmanfront@gmail.com",
          passportNumber: 45324,
          password:
            "$2a$08$/BoMn1gQNJvp1ym60ID2lOBjgS9Tzy0Hc1g8pHqY.aW8Qc1P0Bgi2",
          userType: "User",
          __v: 0,
        },
        {
          name: "lakshan",
          email: "lakshan100@gmail.com",
          passportNumber: 1233432,
          password:
            "$2a$08$.DENmeaXC3oiaDT7KbKXhOGwc5QwZcmzC0jjYOALHeSOgb7J79VJK",
          userType: "Employee",
          __v: 0,
        },
      ],
      "find"
    );

    // arrange and act
    var result = await userService.getUsersList();
    // assert
    expect(result[0].name).toBe("nassim abderahman");
  });

  test("Get users fail", async () => {
    // arrange and act
    var result = await userService.getUsersList();
    // assert
    expect(result).toBeNull;
  });

  test("update user success ", async () => {
    mockingoose(User).toReturn(
      {
        name: "name",
        email: "nassimabderahmanfront@gmail.com",
        passportNumber: 45324,
        password:
          "$2a$08$/BoMn1gQNJvp1ym60ID2lOBjgS9Tzy0Hc1g8pHqY.aW8Qc1P0Bgi2",
        userType: "User",
        __v: 0,
      },
      "findOneAndUpdate"
    );

    // arrange and act
    var result = await userService.updateUserProfile(1, "name");
    // assert
    expect(result.name).toBe("name");
  });
});
