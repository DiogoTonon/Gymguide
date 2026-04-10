// ─── FICHAS DE TREINO ─────────────────────────────────────────
let fichaAtual = null;

const btnGerarFicha = document.getElementById("btn-gerar-ficha");
const fichaResultado = document.getElementById("ficha-resultado");
const fichaMusculo = document.getElementById("ficha-musculo");
const fichaNivel = document.getElementById("ficha-nivel");

const saveTrainingBtn = document.getElementById("save-training-btn");
const trainingTitleInput = document.getElementById("training-title");

// ─── TOAST ─────────────────────────────────────────────────────
function showPageToast(msg) {
  let toast = document.getElementById("page-toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "page-toast";
    toast.className = "page-toast";
    document.body.appendChild(toast);
  }

  toast.textContent = msg;
  toast.classList.add("show");

  clearTimeout(toast._hideTimeout);
  toast._hideTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

// ─── GERAR FICHA ───────────────────────────────────────────────
btnGerarFicha?.addEventListener("click", () => {
  const musculo = fichaMusculo.value;
  const nivel = fichaNivel.value;

  if (!musculo || !nivel) {
    fichaAtual = null;
    fichaResultado.innerHTML = "<p style='color:var(--color-muted)'>Selecione o grupo muscular e o nível.</p>";
    showPageToast("Selecione o músculo e o nível.");
    return;
  }

  const dias = fichas[musculo]?.[nivel];

  if (!dias) {
    fichaAtual = null;
    fichaResultado.innerHTML = "<p style='color:var(--color-muted)'>Nenhuma ficha encontrada para essa combinação.</p>";
    showPageToast("Nenhuma ficha encontrada.");
    return;
  }

  const labels = {
    peito: "Peito",
    costas: "Costas",
    pernas: "Pernas",
    ombros: "Ombros",
  };

  const niveisLabel = {
    iniciante: "Iniciante",
    intermediario: "Intermediário",
    avancado: "Avançado",
  };

  fichaAtual = {
    musculo: labels[musculo],
    nivel: niveisLabel[nivel],
    dias: dias
  };

  const diasHTML = dias.map((dia) => {
    const exerciciosHTML = dia.exercicios.map((ex, i) => `
      <tr class="${i % 2 === 0 ? "row-par" : "row-impar"}">
        <td class="td-dia">${i === 0 ? dia.dia : ""}</td>
        <td class="td-nome">${ex.nome}</td>
        <td class="td-series">${ex.series} séries</td>
        <td class="td-reps">${ex.reps} reps</td>
      </tr>
    `).join("");

    return exerciciosHTML;
  }).join(`<tr class="row-separador"><td colspan="4"></td></tr>`);

  fichaResultado.innerHTML = `
    <div class="ficha-card">
      <div class="ficha-header">
        <span class="ficha-titulo">${labels[musculo]}</span>
        <span class="ficha-badge">${niveisLabel[nivel]}</span>
      </div>
      <table class="ficha-table">
        <thead>
          <tr>
            <th>Dia</th>
            <th>Exercício</th>
            <th>Séries</th>
            <th>Reps</th>
          </tr>
        </thead>
        <tbody>
          ${diasHTML}
        </tbody>
      </table>
    </div>
  `;

  showPageToast("Ficha gerada com sucesso!");
});

// ─── SALVAR FICHA ─────────────────────────────────────────────
if (saveTrainingBtn) {
  saveTrainingBtn.addEventListener("click", function () {
    const title = trainingTitleInput.value.trim();

    if (!title) {
      showPageToast("Digite um nome para a ficha.");
      return;
    }

    if (!fichaAtual || !fichaAtual.dias || fichaAtual.dias.length === 0) {
      showPageToast("Gere uma ficha antes de salvar.");
      return;
    }

    const description = fichaAtual.dias
      .map((diaObj) => {
        const exerciciosTexto = diaObj.exercicios
          .map((ex) => `${ex.nome} - ${ex.series}x${ex.reps}`)
          .join(", ");

        return `${diaObj.dia}: ${exerciciosTexto}`;
      })
      .join(" | ");

    fetch("/save_training_plan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title,
        description: `${fichaAtual.musculo} - ${fichaAtual.nivel} | ${description}`
      })
    })
      .then(response => response.json())
      .then(data => {
        showPageToast(data.message);

        if (data.success) {
          trainingTitleInput.value = "";
        }
      })
      .catch(error => {
        console.error("Erro ao salvar ficha:", error);
        showPageToast("Erro ao salvar ficha.");
      });
  });
}