document.addEventListener("DOMContentLoaded", function () {

    // Corrige o data-exercise de cada botão para usar o nome do h3 do card
    document.querySelectorAll(".exercise-card").forEach((card) => {
        const nome = card.querySelector("h3")?.textContent.trim();
        const btn = card.querySelector(".favorite-btn");
        if (nome && btn) {
            btn.dataset.exercise = nome;
        }
    });

    // Carrega os favoritos do usuário logado e marca os botões
    fetch("/meus_favoritos")
        .then(res => res.json())
        .then(favoritos => {
            document.querySelectorAll(".favorite-btn").forEach((btn) => {
                if (favoritos.includes(btn.dataset.exercise)) {
                    btn.textContent = "♥";
                    btn.classList.add("favoritado");
                }
            });
        })
        .catch(() => {
            // usuário não logado ou erro — não faz nada, botões ficam com ♡
        });

    // Clique nos botões de favoritar
    document.querySelectorAll(".favorite-btn").forEach((button) => {
        button.addEventListener("click", function () {
            const exerciseName = this.dataset.exercise;

            fetch("/favorite_exercise", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams({ exercise_name: exerciseName })
            })
            .then(res => {
                if (res.status === 401) {
                    alert("Você precisa estar logado para favoritar exercícios.");
                    return null;
                }
                return res.json();
            })
            .then(data => {
                if (!data) return;

                if (data.success) {
                    if (data.favoritado) {
                        this.textContent = "♥";
                        this.classList.add("active");
                    } else {
                        this.textContent = "♡";
                        this.classList.remove("active");
                    }
                } else {
                    alert(data.message);
                }
            })
            .catch(() => {
                alert("Erro ao favoritar exercício. Tente novamente.");
            });
        });
    });

});

const buttons = document.querySelectorAll(".favorite-btn");

buttons.forEach(btn => {
  btn.addEventListener("click", function () {
    const name = this.dataset.name;
    const type = this.dataset.type;

    fetch("/favorite", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        item_name: name,
        item_type: type
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        this.classList.add("active");
        this.textContent = "♥";
      }
    });
  });
});