const readlineSync = require("readline-sync");

const arithmetic = (exp) => {
  const result = eval(exp);
  return result;
};

const expression = readlineSync.question("Entrez une expression : ");

console.log(arithmetic(expression));
