// ─── DADOS DA FICHA DE TREINO ────────────────────────────────
// Estrutura: fichas[musculo][nivel] = array de dias
// Para editar: só mexa aqui, o código abaixo lê isso automaticamente
const fichas = {
  peito: {
    iniciante: [
      {
        dia: "Segunda-feira",
        exercicios: [
          { nome: "Supino Reto com Barra",    series: 3, reps: "12" },
          { nome: "Crucifixo com Halter",     series: 3, reps: "15" },
          { nome: "Flexão de Braços",         series: 3, reps: "10" },
        ]
      },
      {
        dia: "Quarta-feira",
        exercicios: [
          { nome: "Supino Inclinado Halter",  series: 3, reps: "12" },
          { nome: "Peck Deck",                series: 3, reps: "15" },
          { nome: "Crossover Cabos",          series: 3, reps: "12" },
        ]
      },
      {
        dia: "Sexta-feira",
        exercicios: [
          { nome: "Supino Declinado",         series: 3, reps: "12" },
          { nome: "Mergulho entre Bancos",    series: 3, reps: "10" },
          { nome: "Pullover",                 series: 3, reps: "12" },
        ]
      },
    ],
    intermediario: [
      {
        dia: "Segunda-feira",
        exercicios: [
          { nome: "Supino Reto com Barra",    series: 4, reps: "10" },
          { nome: "Supino Inclinado Halter",  series: 4, reps: "10" },
          { nome: "Crucifixo Inclinado",      series: 3, reps: "12" },
          { nome: "Peck Deck",                series: 3, reps: "12" },
        ]
      },
      {
        dia: "Quinta-feira",
        exercicios: [
          { nome: "Supino Declinado",         series: 4, reps: "10" },
          { nome: "Crossover Cabos",          series: 4, reps: "12" },
          { nome: "Pullover",                 series: 3, reps: "12" },
          { nome: "Mergulho no Paralelo",     series: 3, reps: "10" },
        ]
      },
    ],
    avancado: [
      {
        dia: "Segunda-feira",
        exercicios: [
          { nome: "Supino Reto com Barra",    series: 5, reps: "6-8"  },
          { nome: "Supino Inclinado Halter",  series: 4, reps: "8-10" },
          { nome: "Crucifixo Inclinado",      series: 4, reps: "10"   },
          { nome: "Peck Deck",                series: 3, reps: "12"   },
          { nome: "Crossover Cabos",          series: 3, reps: "15"   },
        ]
      },
      {
        dia: "Quarta-feira",
        exercicios: [
          { nome: "Supino Declinado",         series: 4, reps: "8-10" },
          { nome: "Mergulho no Paralelo",     series: 4, reps: "8"    },
          { nome: "Pullover",                 series: 4, reps: "10"   },
          { nome: "Crucifixo Plano",          series: 3, reps: "12"   },
        ]
      },
      {
        dia: "Sexta-feira",
        exercicios: [
          { nome: "Supino com Halter",        series: 4, reps: "8-10" },
          { nome: "Crossover Alto",           series: 4, reps: "12"   },
          { nome: "Crossover Baixo",          series: 4, reps: "12"   },
          { nome: "Peck Deck",                series: 3, reps: "15"   },
        ]
      },
    ],
  },

  costas: {
    iniciante: [
      {
        dia: "Terça-feira",
        exercicios: [
          { nome: "Remada Curvada com Barra", series: 3, reps: "12" },
          { nome: "Puxada Frontal",           series: 3, reps: "12" },
          { nome: "Remada Unilateral",        series: 3, reps: "12" },
        ]
      },
      {
        dia: "Sexta-feira",
        exercicios: [
          { nome: "Puxada pela Frente",       series: 3, reps: "12" },
          { nome: "Remada Baixa",             series: 3, reps: "12" },
          { nome: "Hiperextensão Lombar",     series: 3, reps: "15" },
        ]
      },
    ],
    intermediario: [
      {
        dia: "Terça-feira",
        exercicios: [
          { nome: "Remada Curvada com Barra", series: 4, reps: "10" },
          { nome: "Puxada Frontal",           series: 4, reps: "10" },
          { nome: "Remada Unilateral",        series: 3, reps: "12" },
          { nome: "Remada Baixa",             series: 3, reps: "12" },
        ]
      },
      {
        dia: "Sexta-feira",
        exercicios: [
          { nome: "Barra Fixa",               series: 4, reps: "8"  },
          { nome: "Remada Cavalinho",         series: 4, reps: "10" },
          { nome: "Puxada Supinada",          series: 3, reps: "12" },
          { nome: "Hiperextensão Lombar",     series: 3, reps: "15" },
        ]
      },
    ],
    avancado: [
      {
        dia: "Terça-feira",
        exercicios: [
          { nome: "Levantamento Terra",       series: 4, reps: "5"    },
          { nome: "Barra Fixa",               series: 4, reps: "8-10" },
          { nome: "Remada Curvada com Barra", series: 4, reps: "8"    },
          { nome: "Remada Unilateral",        series: 3, reps: "10"   },
          { nome: "Puxada Frontal",           series: 3, reps: "10"   },
        ]
      },
      {
        dia: "Sexta-feira",
        exercicios: [
          { nome: "Remada Cavalinho",         series: 4, reps: "8"  },
          { nome: "Puxada Supinada",          series: 4, reps: "8"  },
          { nome: "Remada Baixa",             series: 4, reps: "10" },
          { nome: "Pullover",                 series: 3, reps: "12" },
        ]
      },
    ],
  },

  pernas: {
    iniciante: [
      {
        dia: "Segunda-feira",
        exercicios: [
          { nome: "Agachamento Livre",        series: 3, reps: "12" },
          { nome: "Leg Press 45°",            series: 3, reps: "15" },
          { nome: "Cadeira Extensora",        series: 3, reps: "15" },
        ]
      },
      {
        dia: "Quinta-feira",
        exercicios: [
          { nome: "Afundo",                   series: 3, reps: "12" },
          { nome: "Cadeira Flexora",          series: 3, reps: "15" },
          { nome: "Panturrilha em Pé",        series: 4, reps: "20" },
        ]
      },
    ],
    intermediario: [
      {
        dia: "Segunda-feira",
        exercicios: [
          { nome: "Agachamento Livre",        series: 4, reps: "10" },
          { nome: "Leg Press 45°",            series: 4, reps: "12" },
          { nome: "Cadeira Extensora",        series: 3, reps: "12" },
          { nome: "Cadeira Flexora",          series: 3, reps: "12" },
        ]
      },
      {
        dia: "Quinta-feira",
        exercicios: [
          { nome: "Agachamento Sumô",         series: 4, reps: "10" },
          { nome: "Afundo com Halter",        series: 3, reps: "12" },
          { nome: "Mesa Flexora",             series: 3, reps: "12" },
          { nome: "Panturrilha Sentado",      series: 4, reps: "20" },
        ]
      },
    ],
    avancado: [
      {
        dia: "Segunda-feira",
        exercicios: [
          { nome: "Agachamento Livre",        series: 5, reps: "5"    },
          { nome: "Leg Press 45°",            series: 4, reps: "10"   },
          { nome: "Hack Squat",               series: 4, reps: "10"   },
          { nome: "Cadeira Extensora",        series: 3, reps: "12"   },
          { nome: "Cadeira Flexora",          series: 3, reps: "12"   },
        ]
      },
      {
        dia: "Quinta-feira",
        exercicios: [
          { nome: "Agachamento Búlgaro",      series: 4, reps: "10"   },
          { nome: "Mesa Flexora",             series: 4, reps: "10"   },
          { nome: "Stiff",                    series: 4, reps: "10"   },
          { nome: "Panturrilha em Pé",        series: 5, reps: "15"   },
        ]
      },
    ],
  },

  ombros: {
    iniciante: [
      {
        dia: "Quarta-feira",
        exercicios: [
          { nome: "Desenvolvimento com Halter", series: 3, reps: "12" },
          { nome: "Elevação Lateral",           series: 3, reps: "15" },
          { nome: "Elevação Frontal",           series: 3, reps: "15" },
        ]
      },
    ],
    intermediario: [
      {
        dia: "Quarta-feira",
        exercicios: [
          { nome: "Desenvolvimento com Barra",  series: 4, reps: "10" },
          { nome: "Elevação Lateral",           series: 4, reps: "12" },
          { nome: "Elevação Frontal",           series: 3, reps: "12" },
          { nome: "Remada Alta",                series: 3, reps: "12" },
        ]
      },
    ],
    avancado: [
      {
        dia: "Quarta-feira",
        exercicios: [
          { nome: "Desenvolvimento Arnold",     series: 4, reps: "10"   },
          { nome: "Elevação Lateral",           series: 5, reps: "12"   },
          { nome: "Elevação Frontal",           series: 4, reps: "10"   },
          { nome: "Remada Alta",                series: 4, reps: "10"   },
          { nome: "Encolhimento",               series: 4, reps: "12"   },
        ]
      },
    ],
  },
};