function convertToInteger(input) {
  const validRomanPattern =
    /^(R{0,3})(CR|CD|D?C{0,3})(ZC|ZL|L?Z{0,3})(AZ|AB|B?A{0,3})$/i;

  if (!validRomanPattern.test(input)) {
    return "รูปแบบรูปแบบไม่ถูกต้อง";
  }

  const Numberls = {
    A: 1,
    B: 5,
    Z: 10,
    L: 50,
    C: 100,
    D: 500,
    R: 1000,
  };

  let total = 0;
  let explanation = "";
  let currentGroup = undefined;
  let currentSum = 0;

  for (let i = input.length - 1; i >= 0; i--) {
    const previousChar = input[i - 1]?.toUpperCase() ?? "";
    const previousValue = Numberls[previousChar];
    const currentChar = input[i].toUpperCase();
    const currentValue = Numberls[currentChar];
    const nextChar = input[i + 1]?.toUpperCase() ?? "";
    const nextValue = Numberls[nextChar];

    if (currentValue < nextValue) {
      total -= currentValue;

      explanation =
        `${currentChar}${nextChar}=${nextValue - currentValue}, ` + explanation;
    } else {
      total += currentValue;

      if (previousChar == currentChar || currentChar == currentGroup) {
        currentGroup = currentChar;
        currentSum += currentValue;
      }

      if (previousChar !== currentGroup && nextChar == currentGroup) {
        explanation =
          `${currentGroup.repeat(
            currentSum / Numberls[currentGroup]
          )}=${currentSum}, ` + explanation;
        currentGroup = "";
        currentSum = 0;
      } else if (currentValue < previousValue || previousValue == undefined) {
        explanation = `${currentChar}=${currentValue}, ` + explanation;
      }
    }
  }

  explanation = explanation.slice(0, -2);

  return `Input: s = ${input}\nOutput: ${total}\nExplanation: ${explanation}\n`;
}

// ทดสอบ
console.log(convertToInteger("AAA"));
console.log(convertToInteger("LBAAA"));
console.log(convertToInteger("RCRZCAB"));
