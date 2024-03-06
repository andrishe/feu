const fs = require("fs").promises;

async function readFileContent(file) {
  try {
    const data = await fs.readFile(file, "utf-8");
    return data;
  } catch (err) {
    console.error(`Error reading file ${file}: `, err);
    throw err;
  }
}
// Fonction pour trouver la position de la forme dans le plateau
const findShapePosition = (board, shape) => {
  for (let i = 0; i <= board.length - shape.length; i++) {
    for (let j = 0; j <= board[0].length - shape[0].length; j++) {
      let match = true;
      for (let k = 0; k < shape.length; k++) {
        for (let l = 0; l < shape[k].length; l++) {
          if (board[i + k][j + l] !== shape[k][l]) {
            match = false;
            break;
          }
        }
        if (!match) break;
      }
      if (match) {
        return { x: j + 1, y: i + 1 };
      }
    }
  }
  return null;
};

(async () => {
  try {
    // Lecture des fichiers
    const boardContent = await readFileContent("to_find.txt");
    const shapeContent = await readFileContent("unfindable.txt");

    // Conversion du contenu des fichiers en tableau de lignes
    const board = boardContent.trim().split("\n");
    const shape = shapeContent.trim().split("\n");

    // Recherche de la position de la forme dans le plateau
    const position = findShapePosition(board, shape);

    // Affichage du résultat
    if (position) {
      console.log("Trouvé !");
      console.log(`Coordonnées : ${position.y},${position.x}`);
    } else {
      console.log("Introuvable");
    }
  } catch (error) {
    console.error("Une erreur est survenue :", error);
  }
})();
