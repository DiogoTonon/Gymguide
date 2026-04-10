// ─── DIETA ─────────────────────────────────────────

const btnCalc = document.getElementById("btn-calcular");
const calcResult = document.getElementById("calc-result");

const foodSelect = document.getElementById("food-select");
const foodGramsInput = document.getElementById("food-grams");
const addFoodBtn = document.getElementById("add-food-btn");
const dietItemsBody = document.getElementById("diet-items-body");

const totalKcalEl = document.getElementById("total-kcal");
const totalProteinEl = document.getElementById("total-protein");
const totalCarbsEl = document.getElementById("total-carbs");
const totalFatEl = document.getElementById("total-fat");
const dietGoalComparison = document.getElementById("diet-goal-comparison");

let dietaMontada = [];
let metaAtual = null;

function showDietToast(msg, tipo = "sucesso") {
    let toast = document.getElementById("diet-toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "diet-toast";
        toast.style.cssText = `
            position: fixed; bottom: 28px; right: 28px;
            background: #1a1a1a; border: 1px solid #2a2a2a;
            border-left: 3px solid #c8ff00;
            color: #f0f0f0; padding: 14px 20px;
            border-radius: 12px; font-size: 14px;
            opacity: 0; transform: translateY(10px);
            transition: all 0.3s ease; pointer-events: none;
            z-index: 9999; font-family: 'Fjalla One', sans-serif;
        `;
        document.body.appendChild(toast);
    }

    toast.style.borderLeftColor = tipo === "erro" ? "#ff4d4d" : "#c8ff00";
    toast.textContent = msg;
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(10px)";
    }, 3000);
}

// Calculadora de macros
if (btnCalc) {
  btnCalc.addEventListener("click", () => {
    const peso = parseFloat(document.getElementById("calc-peso").value);
    const altura = parseFloat(document.getElementById("calc-altura").value);
    const idade = parseFloat(document.getElementById("calc-idade").value);
    const sexo = document.getElementById("calc-sexo").value;
    const atividade = parseFloat(document.getElementById("calc-atividade").value);
    const objetivo = document.getElementById("calc-objetivo").value;

    if (!peso || !altura || !idade) {
      calcResult.innerHTML = `
        <div class="calc-result-card">
          <p>Preencha todos os campos para calcular seu plano.</p>
        </div>
      `;
      calcResult.classList.add("visible");
      return;
    }

    const tmb = sexo === "m"
      ? 10 * peso + 6.25 * altura - 5 * idade + 5
      : 10 * peso + 6.25 * altura - 5 * idade - 161;

    const gastoTotal = Math.round(tmb * atividade);

    const ajustes = {
      bulking: 400,
      manutencao: 0,
      cutting: -400
    };

    const objetivoLabel = {
      bulking: "Bulking",
      manutencao: "Manutenção",
      cutting: "Cutting"
    };

    const calorias = gastoTotal + ajustes[objetivo];

    let proteinaPorKg = 2.0;
    let gorduraPorKg = 1.0;

    if (objetivo === "bulking") {
      proteinaPorKg = 2.2;
      gorduraPorKg = 1.0;
    } else if (objetivo === "cutting") {
      proteinaPorKg = 2.4;
      gorduraPorKg = 0.8;
    } else {
      proteinaPorKg = 2.0;
      gorduraPorKg = 0.9;
    }

    const proteina = Math.round(peso * proteinaPorKg);
    const gordura = Math.round(peso * gorduraPorKg);
    const caloriasProteina = proteina * 4;
    const caloriasGordura = gordura * 9;
    const carbo = Math.round((calorias - caloriasProteina - caloriasGordura) / 4);

    metaAtual = {
      calorias,
      proteina,
      carbo,
      gordura
    };

    calcResult.innerHTML = `
      <div class="calc-result-card">
        <div class="calc-result-top">
          <div>
            <h4>Plano para ${objetivoLabel[objetivo]}</h4>
            <p>TMB estimada: <strong>${Math.round(tmb)} kcal</strong> · Gasto diário estimado: <strong>${gastoTotal} kcal</strong></p>
          </div>

          <div class="calc-kcal-box">
            <span>Meta diária</span>
            <strong>${calorias}</strong>
            <span>kcal</span>
          </div>
        </div>

        <div class="calc-macros-grid">
          <div class="calc-macro-item">
            <span>Proteína</span>
            <strong>${proteina} g</strong>
            <small>${(proteina / peso).toFixed(1)} g/kg</small>
          </div>

          <div class="calc-macro-item">
            <span>Carboidrato</span>
            <strong>${carbo} g</strong>
            <small>${(carbo / peso).toFixed(1)} g/kg</small>
          </div>

          <div class="calc-macro-item">
            <span>Gordura</span>
            <strong>${gordura} g</strong>
            <small>${(gordura / peso).toFixed(1)} g/kg</small>
          </div>
        </div>

        <div class="calc-observation">
          Esses valores servem como ponto de partida. O ideal é acompanhar peso, medidas,
          espelho, força no treino e ajustar após 2 a 3 semanas de consistência.
        </div>
      </div>
    `;

    calcResult.classList.add("visible");
    atualizarResumoDieta();
  });
}

// Select de alimentos
function preencherSelectAlimentos() {
  if (!foodSelect || typeof alimentosBase === "undefined") return;

  alimentosBase.forEach((alimento, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = alimento.nome;
    foodSelect.appendChild(option);
  });
}

// Cálculo proporcional
function calcularValoresAlimento(alimento, quantidade) {
  const fator = quantidade / 100;

  return {
    calorias: alimento.calorias * fator,
    proteina: alimento.proteina * fator,
    carbo: alimento.carbo * fator,
    gordura: alimento.gordura * fator
  };
}

// Renderizar tabela
function renderizarTabelaDieta() {
  if (!dietItemsBody) return;

  if (dietaMontada.length === 0) {
    dietItemsBody.innerHTML = `
      <tr class="empty-row">
        <td colspan="7">Nenhum alimento adicionado ainda.</td>
      </tr>
    `;
    atualizarResumoDieta();
    return;
  }

  dietItemsBody.innerHTML = dietaMontada.map((item, index) => `
    <tr>
      <td>${item.nome}</td>
      <td>${item.quantidade}g</td>
      <td>${item.calorias.toFixed(1)}</td>
      <td>${item.proteina.toFixed(1)}g</td>
      <td>${item.carbo.toFixed(1)}g</td>
      <td>${item.gordura.toFixed(1)}g</td>
      <td>
        <button class="remove-food-btn" data-index="${index}">
          Remover
        </button>
      </td>
    </tr>
  `).join("");

  document.querySelectorAll(".remove-food-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const index = Number(event.target.dataset.index);
      removerAlimento(index);
    });
  });

  atualizarResumoDieta();
}

// Atualizar resumo
function atualizarResumoDieta() {
  const totais = dietaMontada.reduce((acc, item) => {
    acc.calorias += item.calorias;
    acc.proteina += item.proteina;
    acc.carbo += item.carbo;
    acc.gordura += item.gordura;
    return acc;
  }, {
    calorias: 0,
    proteina: 0,
    carbo: 0,
    gordura: 0
  });

  if (totalKcalEl) totalKcalEl.textContent = totais.calorias.toFixed(0);
  if (totalProteinEl) totalProteinEl.textContent = totais.proteina.toFixed(1);
  if (totalCarbsEl) totalCarbsEl.textContent = totais.carbo.toFixed(1);
  if (totalFatEl) totalFatEl.textContent = totais.gordura.toFixed(1);

  renderizarComparacaoMeta(totais);
}

// Status da comparação
function obterStatus(atual, meta) {
  if (!meta || meta <= 0) {
    return { classe: "", texto: "Sem meta calculada" };
  }

  const percentual = (atual / meta) * 100;

  if (percentual >= 90 && percentual <= 110) {
    return { classe: "status-ok", texto: "Dentro de uma faixa boa da meta" };
  }

  if (percentual < 90) {
    return { classe: "status-low", texto: `Faltam ${(meta - atual).toFixed(1)}` };
  }

  return { classe: "status-high", texto: `Passou ${(atual - meta).toFixed(1)}` };
}

// Renderizar comparação
function renderizarComparacaoMeta(totais) {
  if (!dietGoalComparison) return;

  if (!metaAtual) {
    dietGoalComparison.innerHTML = `
      <div class="comparison-empty">
        Calcule sua meta acima para comparar a dieta montada com seu objetivo.
      </div>
    `;
    return;
  }

  const statusKcal = obterStatus(totais.calorias, metaAtual.calorias);
  const statusProt = obterStatus(totais.proteina, metaAtual.proteina);
  const statusCarb = obterStatus(totais.carbo, metaAtual.carbo);
  const statusFat = obterStatus(totais.gordura, metaAtual.gordura);

  dietGoalComparison.innerHTML = `
    <div class="comparison-header">
      <h4>Comparação com a meta</h4>
      <p>Veja se a dieta montada está próxima do objetivo calculado.</p>
    </div>

    <div class="comparison-grid">
      <div class="comparison-item">
        <span>Calorias</span>
        <strong class="${statusKcal.classe}">
          ${totais.calorias.toFixed(0)} / ${metaAtual.calorias.toFixed(0)}
        </strong>
        <small>${statusKcal.texto} kcal</small>
      </div>

      <div class="comparison-item">
        <span>Proteína</span>
        <strong class="${statusProt.classe}">
          ${totais.proteina.toFixed(1)} / ${metaAtual.proteina.toFixed(1)}
        </strong>
        <small>${statusProt.texto} g</small>
      </div>

      <div class="comparison-item">
        <span>Carboidratos</span>
        <strong class="${statusCarb.classe}">
          ${totais.carbo.toFixed(1)} / ${metaAtual.carbo.toFixed(1)}
        </strong>
        <small>${statusCarb.texto} g</small>
      </div>

      <div class="comparison-item">
        <span>Gorduras</span>
        <strong class="${statusFat.classe}">
          ${totais.gordura.toFixed(1)} / ${metaAtual.gordura.toFixed(1)}
        </strong>
        <small>${statusFat.texto} g</small>
      </div>
    </div>
  `;
}

// Adicionar alimento
function adicionarAlimento() {
  if (!foodSelect || !foodGramsInput) return;

  const selectedIndex = foodSelect.value;
  const quantidade = parseFloat(foodGramsInput.value);

  if (selectedIndex === "" || !quantidade || quantidade <= 0) {
    showDietToast("Selecione um alimento e informe uma quantidade válida.", "erro");
    return;
}

  const alimento = alimentosBase[selectedIndex];
  const valores = calcularValoresAlimento(alimento, quantidade);

  dietaMontada.push({
    nome: alimento.nome,
    quantidade,
    calorias: valores.calorias,
    proteina: valores.proteina,
    carbo: valores.carbo,
    gordura: valores.gordura
  });

  renderizarTabelaDieta();

  foodSelect.value = "";
  foodGramsInput.value = "";
}

// Remover alimento
function removerAlimento(index) {
  dietaMontada.splice(index, 1);
  renderizarTabelaDieta();
}

// Inicialização
if (addFoodBtn) {
  addFoodBtn.addEventListener("click", adicionarAlimento);
}

preencherSelectAlimentos();
renderizarTabelaDieta();

// ─── TOGGLE DAS SEÇÕES ─────────────────────────
const toggleButtons = document.querySelectorAll(".toggle-section-btn");

toggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.dataset.target;
    const content = document.getElementById(targetId);

    if (!content) return;

    content.classList.toggle("is-collapsed");
    button.classList.toggle("closed");
  });
});

const saveDietBtn = document.getElementById("save-diet-btn");
const dietTitleInput = document.getElementById("diet-title");

if (saveDietBtn) {
  saveDietBtn.addEventListener("click", function () {
    const title = dietTitleInput.value.trim();

    if (!title) {
    showDietToast("Digite um nome para a dieta.", "erro");
    return;
}

    if (!dietaMontada || dietaMontada.length === 0) {
    showDietToast("Adicione pelo menos um alimento antes de salvar.", "erro");
    return;
}

    const itemsToSend = dietaMontada.map((item) => ({
      food_name: item.nome,
      quantity: `${item.quantidade}g`,
      calories: item.calorias.toFixed(1),
      protein: item.proteina.toFixed(1),
      carbs: item.carbo.toFixed(1),
      fats: item.gordura.toFixed(1)
    }));

    fetch("/save_diet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title,
        items: itemsToSend
      })
    })
    .then(response => response.json())
    .then(data => {
    showDietToast(data.message, data.success ? "sucesso" : "erro");
    if (data.success) {
        dietTitleInput.value = "";
    }
})
.catch(error => {
    console.error("Erro ao salvar dieta:", error);
    showDietToast("Erro ao salvar dieta.", "erro");
});
  });
}