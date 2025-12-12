function randomDiap(n, m) {
  return Math.floor(Math.random() * (m - n + 1)) + n;
}

function mood(colorsCount) {
  const colors = [
    "",
    "красный",
    "оранжевый",
    "жёлтый",
    "зелёный",
    "голубой",
    "синий",
    "фиолетовый",
  ];

  if (colorsCount > 7) {
    console.log("Максимальное количество разных цветов: 7");
    colorsCount = 7;
  }

  console.log("цветов: " + colorsCount);
  const usedColors = {};

  let foundColors = 0;

  while (foundColors < colorsCount) {
    const randomIndex = randomDiap(1, 7);
    const selectedColor = colors[randomIndex];

    const isColorUsed = usedColors[selectedColor];

    if (!isColorUsed) {
      usedColors[selectedColor] = true;
      console.log(selectedColor);
      foundColors++;
    }
  }
}
mood(4);
