const fs = require("fs").promises;

// Fonction asynchrone pour lire le contenu d'un fichier
async function readFileContent(file) {
  try {
    const data = await fs.readFile(file, "utf-8");
    return data;
  } catch (err) {
    console.log(`Error reading file ${file}:`, err);
    throw err;
  }
}

// Fonction récursive pour résoudre la grille Sudoku
const gridSudoku = (grid, row, col) => {
  if (row === 9) {
    return true;
  }

  if (col === 9) {
    return gridSudoku(grid, row + 1, 0);
  }

  if (grid[row][col] !== 0) {
    return gridSudoku(grid, row, col + 1);
  }

  // Essayer les chiffres de 1 à 9 dans la case actuelle
  for (let num = 1; num <= 9; num++) {
    if (isSafe(grid, row, col, num)) {
      grid[row][col] = num;

      if (gridSudoku(grid, row, col + 1)) {
        return true;
      }
    }
    grid[row][col] = 0;
  }
  return false;
};

// Fonction pour afficher la grille Sudoku dans la console
const displayGrid = (grid) => {
  for (let i = 0; i < 9; i++) {
    let row = "";
    for (let j = 0; j < 9; j++) {
      row += grid[i][j] + " ";
    }
    console.log(row);
  }
};

// Fonction pour vérifier si un chiffre peut être placé en toute sécurité dans une case
const isSafe = (grid, row, col, num) => {
  for (let x = 0; x < 9; x++) {
    if (grid[row][x] === num || grid[x][col] === num) {
      return false;
    }
  }

  // Déterminer le coin supérieur gauche de la sous-grille
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;

  // Vérification du carré 3x3
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i + startRow][j + startCol] === num) {
        return false;
      }
    }
  }

  return true;
};

// Fonction principale pour résoudre la grille Sudoku à partir du fichier
const fileContent = async () => {
  try {
    const sudoContent = await readFileContent("sudo.txt");

    // Convertir le contenu du fichier en une grille Sudoku 9x9
    const grid = sudoContent
      .trim()
      .split("\n")
      .map((line) => line.split("").map(Number));

    // Résoudre la grille Sudoku et l'afficher si elle est résolue
    if (gridSudoku(grid, 0, 0)) {
      displayGrid(grid);
    }
  } catch (error) {
    console.log("Error:", error);
  }
};

// Appel de la fonction principale
fileContent();
