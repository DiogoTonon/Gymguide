// ─── EXERCÍCIOS ─────────────────────────────────────────

// Inicializar card
function initCard(card) {
  const video = card.querySelector("video");
  if (!video) return;

  card.addEventListener("mouseenter", () => {
    document.querySelectorAll(".exercise-card").forEach(c => {
      if (c !== card) c.classList.remove("ativo");
    });

    card.classList.add("ativo");
    video.play();
  });

  card.addEventListener("mouseleave", () => {
    card.classList.remove("ativo");
    video.pause();
  });
}

// Aplicar nos cards existentes
document.querySelectorAll(".exercise-card").forEach(initCard);

// Filtros por categoria
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const categoria = btn.dataset.category;
    const nivelAtivo = document.getElementById("nivel-select")?.value || "todos";

    document.querySelectorAll(".exercise-card").forEach(card => {
      const bateuCategoria = categoria === "todos" || card.dataset.category === categoria;
      const bateuNivel = nivelAtivo === "todos" || card.dataset.level === nivelAtivo;

      if (bateuCategoria && bateuNivel) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

// Filtro por nível
document.getElementById("nivel-select")?.addEventListener("change", function () {
  const nivel = this.value;
  const categoriaAtiva = document.querySelector(".filter-btn.active")?.dataset.category || "todos";

  document.querySelectorAll(".exercise-card").forEach(card => {
    const bateuCategoria = categoriaAtiva === "todos" || card.dataset.category === categoriaAtiva;
    const bateuNivel = nivel === "todos" || card.dataset.level === nivel;

    if (bateuCategoria && bateuNivel) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });
});

// Sugestão por músculo
const select = document.getElementById("muscle-select");
const btnSug = document.getElementById("btn-sugerir");
const resultado = document.getElementById("resultado");

if (btnSug) {
  btnSug.addEventListener("click", () => {
    const selected = select.value;

    if (!selected) {
      resultado.innerHTML = "<p style='color:var(--color-muted)'>Selecione um músculo primeiro.</p>";
      return;
    }

    const filtrados = exercises.filter(ex => ex.muscle === selected);

    if (!filtrados.length) {
      resultado.innerHTML = "<p style='color:var(--color-muted)'>Nenhum exercício cadastrado para esse grupo ainda.</p>";
      return;
    }

    renderExercises(filtrados);
  });
}

function renderExercises(lista) {
  resultado.innerHTML = "";

  lista.forEach(ex => {
    const card = document.createElement("div");
    card.classList.add("exercise-card");
    card.innerHTML = `
      <video src="../assets/videos/${ex.name.replace(/\s+/g, '')}.mp4" muted loop playsinline></video>
      <h3>${ex.name}</h3>
    `;
    resultado.appendChild(card);
    initCard(card);
  });
}