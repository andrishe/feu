const fs = require("fs").promises;

async function readFileContent(file) {
  try {
    return data;
  } catch (err) {
    console.log(`Error reading file ${file}:`, err);
    throw err;
  }
}

// Fonction pour calculer la taille du plus grand carré sur le plateau
const maxSquare = (square) => {
  // Nombre de lignes dans le plateau
  const rows = square.length;
  if (rows === 0) {
    return 0;
  }

  // Nombre de colonnes dans le plateau
  const cols = square[0].length;

  // Initialisation d'une matrice pour stocker les résultats intermédiaires
  const squareArray = Array(rows + 1)
    .fill(0)
    .map(() => Array(cols + 1).fill(0));

  let maxSize = 0;

  // Parcours du plateau pour calculer la taille du plus grand carré
  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= cols; j++) {
      if (square[i - 1][j - 1] === "*") {
        // Mise à jour de la matrice squareArray avec les valeurs calculées
        squareArray[i][j] =
          Math.min(
            squareArray[i][j - 1],
            squareArray[i - 1][j],
            squareArray[i - 1][j - 1]
          ) + 1;
        // Mise à jour de la taille maximale du carré trouvé
        maxSize = Math.max(maxSize, squareArray[i][j]);
      }
    }
  }

  return maxSize;
};

// Fonction principale pour lire le contenu du fichier et exécuter le calcul
const fileContent = async () => {
  try {
    const squareContent = await readFileContent("plateau.txt");

    const square = squareContent.trim().split("\n");

    console.log("Taille du plus grand carré :", maxSquare(square));
  } catch (error) {
    console.log("Error:", error);
  }
};

fileContent();
