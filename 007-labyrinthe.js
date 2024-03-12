const fs = require("fs").promises;

async function readFileContent(file) {
  try {
    const data = await fs.readFile(file, "utf-8");
    return data;
  } catch (err) {
    console.log(`Error reading file ${file}:`, err);
    throw err;
  }
}

const dirRows = [-1, 0, 0, 1];
const dirCols = [0, -1, 1, 0];

// Fonction pour vérifier si une direction est valide dans la grille
const isDirectionValid = (grid, row, col) => {
  return row >= 0 && col >= 0 && row < grid.length && col < grid[0].length;
};

// Fonction récursive pour trouver un chemin dans le labyrinthe
const findPath = (grid, row, col) => {
  if (row === grid.length - 1 && col === grid[0].length - 1) {
    return true;
  }

  // Marquer la cellule actuelle comme visitée
  grid[row][col] = 0;

  // Parcourir les directions possibles
  for (let i = 0; i < 4; i++) {
    const newRow = row + dirRows[i];
    const newCol = col + dirCols[i];

    // Vérifier si la nouvelle direction est valide et si elle mène à une cellule libre
    if (
      isDirectionValid(grid, newRow, newCol) &&
      grid[newRow][newCol] === "*" &&
      findPath(grid, newRow, newCol)
    ) {
      return true;
    }
  }

  return false;
};

const fileContent = async () => {
  try {
    const labContent = await readFileContent("labyrinthe.txt");

    // Convertir le contenu du fichier en une grille de labyrinthe
    const grid = labContent
      .trim()
      .split("\n")
      .map((line) => line.split(""));

    // Vérifier s'il existe un chemin dans le labyrinthe
    if (findPath(grid, 0, 0)) {
      console.log("Chemin trouvé:");
      for (let i = 0; i < grid.length; i++) {
        console.log(grid[i].join(""));
      }
    } else {
      console.log("Aucun chemin trouvé dans le labyrinthe.");
    }
  } catch (error) {
    console.log("Error:", error);
  }
};

fileContent();
