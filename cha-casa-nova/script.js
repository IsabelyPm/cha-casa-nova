document.addEventListener("DOMContentLoaded", () => {

  const loading = document.getElementById("loading-lista");
  const overlay = document.getElementById("overlay");
  const popupPresente = document.getElementById("popupPresente");

  let itemSelecionado = null;
  let categoriaSelecionada = null;
  let itemDivAtual = null;

  const URL =
    "https://script.google.com/macros/s/AKfycbyfiXqQjwHo90FLvWOaTg2X40lZPmFAK0leRqZQogFlRchgUUICE2L254ffC_d2Vmbbvw/exec";

  // ===============================
  // ÍCONES
  // ===============================
  const iconesPorItem = {
    "Cafeteira": "fa-mug-hot",
    "Batedeira": "fa-blender",
    "Liquidificador": "fa-blender",
    "Jogo de panela (antiaderente)": "fa-utensils",
    "Jogo de copo": "fa-glass-water",
    "Jogo de talher": "fa-utensils",
    "Jogo de xícara": "fa-mug-saucer",
    "Jogo de prato": "fa-plate-wheat",
    "Airfray": "fa-fire",
    "Conjunto de utensílios de cozinha(silicone)": "fa-kitchen-set",
    "Jogo de taça": "fa-wine-glass",
    "Kit de pia": "fa-sink",
    "Jogo de mantimentos (acrílico)": "fa-box",
    "Escorredor de macarrão": "fa-bowl-food",
    "Jogo de tupperware": "fa-box-open",
    "Escorredor de louça (inox)": "fa-utensils",
    "Porta tempero (inox)": "fa-pepper-hot",
    "Tábua (madeira)": "fa-utensils",
    "Jogo de faca": "fa-utensils",
    "Jarra (vidro)": "fa-glass-water",
    "Garrafa de café": "fa-mug-hot",
    "Saleiro": "fa-pepper-hot",
    "Forma de bolo": "fa-cake-candles",
    "Fruteira": "fa-apple-whole",
    "Jogo de tapete de cozinha": "fa-rug",
    "Pipoqueira": "fa-fire",

    "Tapete": "fa-rug",
    "Kit de banheiro": "fa-soap",
    "Cesto de roupa": "fa-basket-shopping",
    "Toalha de banho": "fa-bath",
    "Toalha de rosto": "fa-hands",
    "Porta papel higiênico": "fa-toilet-paper",

    "Cortina": "fa-window-maximize",
    "Almofada": "fa-couch",
    "Manta de sofá": "fa-layer-group",
    "Puf": "fa-chair",
    "Decoração para sala": "fa-paint-roller",

    "Roupa de cama": "fa-bed",
    "Travesseiro": "fa-cloud",
    "Espelho": "fa-arrows-left-right",
    "Coberta": "fa-layer-group",

    "Rodo": "fa-broom",
    "Vassoura": "fa-broom",
    "Pote para sabão em pó (acrílico)": "fa-box",
    "Pote para amaciante (acrílico)": "fa-bottle-droplet",
    "Prendedor": "fa-paperclip",
    "Varal de chão": "fa-shirt",
    "Balde": "fa-bucket"
  };

  // ===============================
  // FECHAR POPUP AO CLICAR NO FUNDO
  // ===============================
  overlay.addEventListener("click", () => {
    popupPresente.classList.remove("ativo");
    overlay.classList.remove("ativo");
  });

  // ===============================
  // BUSCAR LISTA
  // ===============================
  fetch(URL)
    .then(res => res.json())
    .then(data => {

      const container = document.getElementById("lista");
      let categoriaAtual = "";

      for (let i = 1; i < data.length; i++) {
        const [categoria, item, nome] = data[i];

        // CATEGORIA
        if (categoria !== categoriaAtual) {
          categoriaAtual = categoria;
          const categoriaDiv = document.createElement("div");
          categoriaDiv.className = "categoria";
          categoriaDiv.innerHTML = `<h2>${categoria}</h2>`;
          container.appendChild(categoriaDiv);
        }

        // ITEM
        const itemDiv = document.createElement("div");
        itemDiv.className = "item";

        if (nome) {
          itemDiv.classList.add("selecionado");
          itemDiv.innerHTML = `
            <span class="item-text">
              <i class="fa-solid fa-check"></i>
              ${item}
            </span>
            <span class="nome">${nome}</span>
          `;
        } else {
          const icon = iconesPorItem[item] || "fa-gift";

          itemDiv.innerHTML = `
            <span class="item-text">
              <i class="fa-solid ${icon}"></i>
              ${item}
            </span>
            <span class="nome">Selecionar</span>
          `;

          itemDiv.addEventListener("click", (e) => {
            itemSelecionado = item;
            categoriaSelecionada = categoria;
            itemDivAtual = itemDiv;

            overlay.classList.add("ativo");
            popupPresente.classList.add("ativo");

            // MOBILE → CENTRAL
            if (window.innerWidth < 768) {
              popupPresente.style.left = "50%";
              popupPresente.style.top = "50%";
              popupPresente.style.transform = "translate(-50%, -50%)";
              return;
            }

            // DESKTOP → PERTO DO CLIQUE
            let x = e.clientX;
            let y = e.clientY;

            const w = popupPresente.offsetWidth;
            const h = popupPresente.offsetHeight;

            if (x + w > window.innerWidth) x -= w + 10;
            if (y + h > window.innerHeight) y -= h + 10;

            popupPresente.style.left = `${x}px`;
            popupPresente.style.top = `${y}px`;
            popupPresente.style.transform = "none";
          });
        }

        container.appendChild(itemDiv);
      }

      loading.style.display = "none";
    });

  // ===============================
  // CONFIRMAR PRESENTE
  // ===============================
  window.confirmarPresente = async function () {
    const input = document.getElementById("nomePresente");
    const nomeUsuario = input.value.trim();

    if (!nomeUsuario) {
      input.style.borderColor = "#fa5252";
      input.focus();
      return;
    }

    try {
      const formData = new FormData();
      formData.append("tipo", "presente");
      formData.append("categoria", categoriaSelecionada);
      formData.append("item", itemSelecionado);
      formData.append("nome", nomeUsuario);

      await fetch(URL, { method: "POST", body: formData });

      itemDivAtual.classList.add("selecionado");
      itemDivAtual.innerHTML = `
        <span class="item-text">
          <i class="fa-solid fa-check"></i>
          ${itemSelecionado}
        </span>
        <span class="nome">${nomeUsuario}</span>
      `;

      input.value = "";
      popupPresente.classList.remove("ativo");
      overlay.classList.remove("ativo");

    } catch (e) {
      alert("Erro ao salvar. Tente novamente.");
      console.error(e);
    }
  };

});