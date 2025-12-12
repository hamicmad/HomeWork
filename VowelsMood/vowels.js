function countRussianVowelsSimple(text) {
  const lowerText = text.toLowerCase();
  const vowels = "аеёиоуыэюя";

  let count = 0;

  for (let i = 0; i < lowerText.length; i++) {
    const char = lowerText[i];
    if (vowels.includes(char)) {
      count++;
    }
  }

  return count;
}

function main() {
  const userInput = prompt("Введите строку:");

  if (userInput !== null) {
    const vowelCount = countRussianVowels(userInput);
    console.log(`Количество русских гласных букв: ${vowelCount}`);
  } else {
    console.log("Отмена");
  }
}
main();
