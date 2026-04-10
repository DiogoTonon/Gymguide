const alimentosBase = [
  // ─── CARBOIDRATOS ─────────────────────────
  { nome: "Arroz branco cozido", calorias: 130, proteina: 2.5, carbo: 28, gordura: 0.3 },
  { nome: "Arroz integral cozido", calorias: 112, proteina: 2.6, carbo: 23, gordura: 0.9 },
  { nome: "Macarrão cozido", calorias: 131, proteina: 5, carbo: 25, gordura: 1.1 },
  { nome: "Batata inglesa cozida", calorias: 87, proteina: 1.9, carbo: 20, gordura: 0.1 },
  { nome: "Batata doce cozida", calorias: 86, proteina: 1.6, carbo: 20, gordura: 0.1 },
  { nome: "Mandioca cozida", calorias: 125, proteina: 1.1, carbo: 30, gordura: 0.3 },
  { nome: "Aveia", calorias: 389, proteina: 16.9, carbo: 66.3, gordura: 6.9 },
  { nome: "Pão francês", calorias: 300, proteina: 8, carbo: 58, gordura: 3.1 },
  { nome: "Pão integral", calorias: 247, proteina: 13, carbo: 41, gordura: 4.2 },
  { nome: "Tapioca", calorias: 358, proteina: 0.2, carbo: 88, gordura: 0.2 },

  // ─── PROTEÍNAS ─────────────────────────
  { nome: "Peito de frango grelhado", calorias: 165, proteina: 31, carbo: 0, gordura: 3.6 },
  { nome: "Carne bovina magra", calorias: 217, proteina: 26, carbo: 0, gordura: 12 },
  { nome: "Carne moída magra", calorias: 212, proteina: 26, carbo: 0, gordura: 11 },
  { nome: "Peixe (tilápia grelhada)", calorias: 128, proteina: 26, carbo: 0, gordura: 2.7 },
  { nome: "Atum em lata (água)", calorias: 116, proteina: 26, carbo: 0, gordura: 1 },
  { nome: "Ovo inteiro", calorias: 143, proteina: 13, carbo: 1.1, gordura: 9.5 },
  { nome: "Clara de ovo", calorias: 52, proteina: 11, carbo: 0.7, gordura: 0.2 },
  { nome: "Whey protein", calorias: 400, proteina: 80, carbo: 8, gordura: 7 },

  // ─── LATICÍNIOS ─────────────────────────
  { nome: "Leite integral", calorias: 61, proteina: 3.2, carbo: 4.8, gordura: 3.3 },
  { nome: "Leite desnatado", calorias: 34, proteina: 3.4, carbo: 5, gordura: 0.1 },
  { nome: "Iogurte natural", calorias: 59, proteina: 10, carbo: 3.6, gordura: 0.4 },
  { nome: "Queijo muçarela", calorias: 280, proteina: 22, carbo: 3, gordura: 22 },
  { nome: "Queijo minas", calorias: 264, proteina: 17, carbo: 3, gordura: 20 },

  // ─── GORDURAS ─────────────────────────
  { nome: "Azeite de oliva", calorias: 884, proteina: 0, carbo: 0, gordura: 100 },
  { nome: "Manteiga", calorias: 717, proteina: 0.9, carbo: 0.1, gordura: 81 },
  { nome: "Margarina", calorias: 717, proteina: 0, carbo: 0, gordura: 81 },
  { nome: "Amendoim", calorias: 567, proteina: 26, carbo: 16, gordura: 49 },
  { nome: "Pasta de amendoim", calorias: 588, proteina: 25, carbo: 20, gordura: 50 },

  // ─── FRUTAS ─────────────────────────
  { nome: "Banana", calorias: 89, proteina: 1.1, carbo: 22.8, gordura: 0.3 },
  { nome: "Maçã", calorias: 52, proteina: 0.3, carbo: 14, gordura: 0.2 },
  { nome: "Laranja", calorias: 47, proteina: 0.9, carbo: 12, gordura: 0.1 },
  { nome: "Mamão", calorias: 43, proteina: 0.5, carbo: 11, gordura: 0.3 },
  { nome: "Abacate", calorias: 160, proteina: 2, carbo: 9, gordura: 15 },

  // ─── LEGUMES / VERDURAS ─────────────────────────
  { nome: "Brócolis", calorias: 34, proteina: 2.8, carbo: 7, gordura: 0.4 },
  { nome: "Cenoura", calorias: 41, proteina: 0.9, carbo: 10, gordura: 0.2 },
  { nome: "Alface", calorias: 15, proteina: 1.4, carbo: 2.9, gordura: 0.2 },
  { nome: "Tomate", calorias: 18, proteina: 0.9, carbo: 3.9, gordura: 0.2 },
  { nome: "Pepino", calorias: 16, proteina: 0.7, carbo: 3.6, gordura: 0.1 }
];