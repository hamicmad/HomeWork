function ObjStorage() {
  let storage = {};

  this.addValue = function (key, value) {
    storage[key] = value;
  };

  this.GetValue = function (key) {
    return storage[key];
  };

  this.DeleteValue = function (key) {
    if (key in storage) {
      delete storage[key];
      return true;
    }
    return false;
  };

  this.GetKeys = function () {
    return Object.keys(storage);
  };
}

const drinkStorage = new ObjStorage();

const addDrinkBtn = document.getElementById("addDrinkBtn");
const getDrinkBtn = document.getElementById("getDrinkBtn");
const deleteDrinkBtn = document.getElementById("deleteDrinkBtn");
const listDrinksBtn = document.getElementById("listDrinksBtn");
const outputDiv = document.getElementById("output");

addDrinkBtn.addEventListener("click", function () {
  let name = prompt("Введите название напитка:");
  if (!name) return;

  let isAlcohol = confirm("Напиток алкогольный?");
  let ingredients = prompt("Введите ингридиенты:");
  if (!ingredients) return;

  let recipe = prompt("Введите рецепт:");
  if (!recipe) return;

  const drinkInfo = {
    isAlcohol: isAlcohol,
    ingredients: ingredients,
    recipe: recipe,
  };

  drinkStorage.addValue(name, drinkInfo);
  alert("Добавлено");
});

getDrinkBtn.addEventListener("click", function () {
  let name = prompt("Введите название напитка:");
  let drinkInfo = drinkStorage.GetValue(name);
  if (drinkInfo) {
    alert(
      `НАПИТОК: ${name}\n\n` +
        `Алкогольный: ${drinkInfo.isAlcohol ? "Да" : "Нет"}\n` +
        `Ингридиенты: ${drinkInfo.ingredients}\n` +
        `Рецепт приготовления:${drinkInfo.recipe}`
    );
  } else alert("Напиток не найден");
});

deleteDrinkBtn.addEventListener("click", function () {
  let name = prompt("Введите название напитка:");
  if (!name) return;

  let info = drinkStorage.DeleteValue(name);
  if (info) alert(`Напиток ${name} удален`);
  else alert("Напиток не найден");
});

listDrinksBtn.addEventListener("click", function () {
  let list = drinkStorage.GetKeys();
  let listNames = "";
  for (let i = 0; i < list.length; i++) {
    listNames += list[i] + "\n";
  }
  alert(listNames);
});
