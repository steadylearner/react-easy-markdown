// Test for React
const { substitutePrefix, substitutePrefixes } = require("..");

// Test substituePrefixes with set API

// 1. Test the base function for our package that will not be used but to prove concept.
describe('Test substitutePrefix when href include prefix given and vice versa', () => {
  const set = ["s-", "https://"];
  test("When href don't have the prefix in it, the test should return the original value.", () => {
    expect(substitutePrefix("www.steadylearner.com/blog")(set))
    // expect(substitutePrefix("www.steadylearner.com/blog", set))
      .toBe("www.steadylearner.com/blog");
  });
  test("When href have a different prefix in it, the test should return the original value.", () => {
    expect(substitutePrefix("h-www.steadylearner.com/blog")(set))
      .toBe("h-www.steadylearner.com/blog");
  });
  test("When href have the same prefix in it, the test should return the substituted value.", () => {
    expect(substitutePrefix("s-www.steadylearner.com/blog")(set))
      .toBe("https://www.steadylearner.com/blog");
  });
});

// 2. Start to test What will be really used for package.
// (The difference from before is argument for substitutePrefixes
// became an array of arrays(multi dimensional array) with [].)
describe('It should include the what the substitutePrefix can do also. Therefore, we test with the same arguments first.', () => {
  const set = [["s-", "https://"]];
  test("When href don't have the prefix in it, the test should return the original value.", () => {
    expect(substitutePrefixes("www.steadylearner.com/blog")(set))
      .toBe("www.steadylearner.com/blog");
  });
  test("When href have a different prefix in it, the test should return the original value.", () => {
    expect(substitutePrefixes("h-www.steadylearner.com/blog")(set))
      .toBe("h-www.steadylearner.com/blog");
  });
  test("When href have the same prefix in it, the test should return the substituted value.", () => {
    expect(substitutePrefixes("s-www.steadylearner.com/blog")(set))
      .toBe("https://www.steadylearner.com/blog");
  });
});

describe('Test when substitutePrefixes should return the original href', () => {
  const https = "https://";
  const jest = [
    ["j-", https],
    ["e-", https],
    ["s-", https],
    ["t-", https],
  ];
  test("When href don't have none of prefix in it, the test should return the original value.", () => {
    expect(substitutePrefixes("www.steadylearner.com/blog")(jest))
      .toBe("www.steadylearner.com/blog");
  });
  test("When href have a different prefix from the prefixes passed to the function, the test should return the original value.", () => {
    expect(substitutePrefixes("h-www.steadylearner.com/blog")(jest))
      .toBe("h-www.steadylearner.com/blog");
  })
});

describe('Test when substitutePrefixes should return the substituted href', () => {
  test("When href have different prefixes and similar substitutions in it, the test should return the substituted value.", () => {
    expect(substitutePrefixes("j-www.steadylearner.com")([
      ["j-", "https://"],
      ["e-", "http://"],
      ["s-", "htt://"],
      ["t-", "ht://"],
    ]))
      .toBe("https://www.steadylearner.com");
  });

  test("When href have different prefixes and the same substitutions in it, the test should return the substituted value.", () => {
    const https = "https://";
    const jest = [
      ["j-", https],
      ["e-", https],
      ["s-", https],
      ["t-", https],
    ];

    expect(substitutePrefixes("j-www.steadylearner.com")(jest))
      .toBe("https://www.steadylearner.com");
    expect(substitutePrefixes("e-www.steadylearner.com")(jest))
      .toBe("https://www.steadylearner.com");
    expect(substitutePrefixes("s-www.steadylearner.com")(jest))
      .toBe("https://www.steadylearner.com");
    expect(substitutePrefixes("t-www.steadylearner.com")(jest))
      .toBe("https://www.steadylearner.com");
  });

  test("When href have diffent prefixes and substitutions. It should return different substituted value.", () => {
    const example = [
      ["s-", "https://www.steadylearner.com"],
      ["l-", "https://www.linkedin.com/in"],
      ["y-", "https://www.youtube.com/channel"],
      ["t-", "https://twitter.com"],
      ["g-", "https://github.com"],
    ];

    expect(substitutePrefixes("s-/blog")(example))
      .toBe("https://www.steadylearner.com/blog");
    expect(substitutePrefixes("l-/steady-learner-3151b7164")(example))
      .toBe("https://www.linkedin.com/in/steady-learner-3151b7164");
    expect(substitutePrefixes("y-/UCt_jsJOe91EVjd58kHpgTfw")(example))
      .toBe("https://www.youtube.com/channel/UCt_jsJOe91EVjd58kHpgTfw");
    expect(substitutePrefixes("t-/steadylearner_p")(example))
      .toBe("https://twitter.com/steadylearner_p");
    expect(substitutePrefixes("g-/steadylearner")(example))
      .toBe("https://github.com/steadylearner");
    // should return the substitutions when only prefix is given to href
    expect(substitutePrefixes("s-")(example))
      .toBe("https://www.steadylearner.com");
  });
});
