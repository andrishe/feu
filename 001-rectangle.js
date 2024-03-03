const readlineSync = require("readline-sync");

const rectangle = (n) => {
  if (isNaN(n)) {
    console.log("Erreur : Veuillez entrer un nombre!");
    process.exit(0);
  }

  let char = "";
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 || i === n - 1) {
        char += "O";
      } else {
        if (j === 0 || j === n - 1) {
          char += "O";
        } else {
          char += " ";
        }
      }
    }
    char += "\n";
  }
  return char;
};

const number = readlineSync.question("Entrez un nombre : ");

console.log(rectangle(number));
