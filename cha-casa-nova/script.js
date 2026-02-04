const loading = document.getElementById("loading-lista");
let itemSelecionado = null;
let categoriaSelecionada = null;
const URL = "https://script.google.com/macros/s/AKfycbyfiXqQjwHo90FLvWOaTg2X40lZPmFAK0leRqZQogFlRchgUUICE2L254ffC_d2Vmbbvw/exec";
const iconesPorItem = {
  // COZINHA
  "Cafeteira": { tipo: "fa", icon: "fa-mug-hot" },
  "Batedeira": { tipo: "fa", icon: "fa-blender" },
  "Liquidificador": { tipo: "fa", icon: "fa-blender" },
  "Jogo de panela (antiaderente)": { tipo: "fa", icon: "fa-utensils" },
  "Jogo de copo": { tipo: "fa", icon: "fa-glass-water" },
  "Jogo de talher": { tipo: "fa", icon: "fa-utensils" },
  "Jogo de xícara": { tipo: "fa", icon: "fa-mug-saucer" },
  "Jogo de prato": { tipo: "fa", icon: "fa-plate-wheat" },
  "Airfray": { tipo: "fa", icon: "fa-fire" },
  "Conjunto de utensílios de cozinha(silicone)": { tipo: "fa", icon: "fa-kitchen-set" },
  "Jogo de taça": { tipo: "fa", icon: "fa-wine-glass" },
  "Kit de pia": { tipo: "fa", icon: "fa-sink" },
  "Jogo de mantimentos (acrílico)": { tipo: "fa", icon: "fa-box" },
  "Escorredor de macarrão": { tipo: "fa", icon: "fa-bowl-food" },
  "Jogo de tupperware": { tipo: "fa", icon: "fa-box-open" },
  "Escorredor de louça (inox)": { tipo: "fa", icon: "fa-utensils" },
  "Porta tempero (inox)": { tipo: "fa", icon: "fa-pepper-hot" },
  "Tábua (madeira)": { tipo: "fa", icon: "fa-cutlery" },
  "Jogo de faca": { tipo: "fa", icon: "fa-utensils" },
  "Jarra (vidro)": { tipo: "fa", icon: "fa-glass-water" },
  "Garrafa de café": { tipo: "fa", icon: "fa-mug-hot" },
  "Saleiro": { tipo: "fa", icon: "fa-pepper-hot" },
  "Forma de bolo": { tipo: "fa", icon: "fa-cake-candles" },
  "Fruteira": { tipo: "fa", icon: "fa-apple-whole" },
  "Jogo de tapete de cozinha": { tipo: "fa", icon: "fa-rug" },
  "Pipoqueira": { tipo: "fa", icon: "fa-fire" },

  // BANHEIRO
  "Tapete": { tipo: "fa", icon: "fa-rug" },
  "Kit de banheiro": { tipo: "fa", icon: "fa-soap" },
  "Cesto de roupa": { tipo: "fa", icon: "fa-basket-shopping" },
  "Toalha de banho": { tipo: "fa", icon: "fa-bath" },
  "Toalha de rosto": { tipo: "fa", icon: "fa-hands" },
  "Porta papel higiênico": { tipo: "fa", icon: "fa-toilet-paper" },

  // SALA
  "Cortina": { tipo: "fa", icon: "fa-window-maximize" },
  "Almofada": { tipo: "fa", icon: "fa-couch" },
  "Manta de sofá": { tipo: "fa", icon: "fa-layer-group" },
  "Puf": { tipo: "fa", icon: "fa-chair" },
  "Decoração para sala": { tipo: "fa", icon: "fa-paint-roller" },

  // QUARTO
  "Roupa de cama": { tipo: "fa", icon: "fa-bed" },
  "Travesseiro": { tipo: "fa", icon: "fa-cloud" },
  "Espelho": { tipo: "fa", icon: "fa-arrows-left-right" }, 
  "Coberta": { tipo: "fa", icon: "fa-layer-group" },


  // LAVANDERIA
  "Rodo": { tipo: "fa", icon: "fa-broom" },
  "Vassoura": { tipo: "fa", icon: "fa-broom" },
  "Pote para sabão em pó (acrílico)": { tipo: "fa", icon: "fa-box" },
  "Pote para amaciante (acrílico)": { tipo: "fa", icon: "fa-bottle-droplet" },
  "Prendedor": { tipo: "fa", icon: "fa-paperclip" },
  "Varal de chão": { tipo: "fa", icon: "fa-shirt" },
  "Balde": { tipo: "fa", icon: "fa-bucket" }
};
fetch(URL)
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("lista");
    let categoriaAtual = "";

    for (let i = 1; i < data.length; i++) {
      const [categoria, item, nome] = data[i];

      // ===== CATEGORIA =====
      if (categoria !== categoriaAtual) {
        categoriaAtual = categoria;

        const categoriaDiv = document.createElement("div");
        categoriaDiv.classList.add("categoria");
        categoriaDiv.innerHTML = `
          <h2>
            <i data-lucide="leaf"></i>
            ${categoria}
          </h2>
        `;
        container.appendChild(categoriaDiv);
       
      }
 loading.style.opacity = "0";
loading.style.transition = "opacity 0.4s ease";

setTimeout(() => {
  loading.style.display = "none";
}, 400);
      // ===== ÍCONE DO ITEM =====
      const iconeConfig = iconesPorItem[item];
      let iconeHTML = "";

      if (iconeConfig?.tipo === "lucide") {
        iconeHTML = `<i data-lucide="${iconeConfig.icon}"></i>`;
      } else if (iconeConfig?.tipo === "fa") {
        iconeHTML = `<i class="fa-solid ${iconeConfig.icon}"></i>`;
      } else {
        // fallback ABSOLUTO
        iconeHTML = `<i class="fa-solid fa-house"></i>`;
      }

// ===== ITEM =====
const itemDiv = document.createElement("div");
itemDiv.classList.add("item");

// 👉 SE JÁ FOI SELECIONADO (veio da planilha)
const selecionado = nome && nome.trim() !== "";

if (selecionado) {
  itemDiv.classList.add("selecionado");

  itemDiv.innerHTML = `
    <span class="item-text">
      <i class="fa-solid fa-check"></i>
      ${item}
    </span>
    <span class="nome">${nome}</span>
  `;
} else {
  itemDiv.innerHTML = `
    <span class="item-text">
      ${iconeHTML}
      ${item}
    </span>
    <span class="nome">Selecionar</span>
  `;

itemDiv.addEventListener("click", (e) => {

  window.itemSelecionado = item;
  window.categoriaSelecionada = categoria;
  window.itemDivAtual = itemDiv;

  const popup = document.getElementById("popupPresente");

  let x = e.clientX;
  let y = e.clientY;

  // 🛡️ proteção para não sair da tela
  const popupWidth = 360;
  const popupHeight = 260;

  if (x + popupWidth > window.innerWidth) {
    x = window.innerWidth - popupWidth - 20;
  }

  if (y + popupHeight > window.innerHeight) {
    y = window.innerHeight - popupHeight - 20;
  }
if (window.innerWidth < 768) {
  popup.style.left = "50%";
  popup.style.top = "50%";
  popup.style.transform = "translate(-50%, -50%)";
  return;
}
  popup.style.left = `${x}px`;
  popup.style.top = `${y}px`;
  popup.style.display = "block";
});
}

container.appendChild(itemDiv);
    }
       // 🔥 GARANTE que os ícones sejam renderizados corretamente
    if (window.lucide) {
      lucide.createIcons();
    }
    container.classList.add("carregado");
  });
function toggleBox(id) {
  document.querySelectorAll('.acao-box').forEach(box => {
    box.style.display = 'none';
  });

  const box = document.getElementById(id);
  box.style.display = 'block';
}
function confirmarPresenca() {
  const nome = document.getElementById("nomePresenca").value.trim();
  if (!nome) return;

const formData = new FormData();
formData.append("tipo", "presenca");
formData.append("nome", nome);

fetch(URL, {
  method: "POST",
  body: formData
})
.then(res => res.text())
.then(txt => console.log("RETORNO:", txt))
.catch(err => console.error(err));

  document.getElementById("popup").style.display = "flex";

  setTimeout(() => {
    document.getElementById("popup").style.display = "none";
  }, 3000);
}
function copiarPix() {
  const texto = document.querySelector(".pix-chave").innerText;
  navigator.clipboard.writeText(texto);

  document.getElementById("msgPix").innerText =
    "Código Pix copiado 💖";
}


window.addEventListener("load", () => {
  document.body.style.visibility = "visible";
});
async function confirmarPresente() {
  const input = document.getElementById("nomePresente");
  const nomeUsuario = input.value.trim();

  if (!nomeUsuario) {
    input.style.borderColor = "#fa5252";
    input.focus();
    return;
  }

  input.style.borderColor = "#c9b199";

  // fecha popup
  document
    .getElementById("popupPresente")
    .classList.remove("ativo");

  try {
    const formData = new FormData();
    formData.append("tipo", "presente");
    formData.append("categoria", window.categoriaSelecionada);
    formData.append("item", window.itemSelecionado);
    formData.append("nome", nomeUsuario);

    await fetch(URL, {
      method: "POST",
      body: formData
    });

    // atualiza visual do item
    window.itemDivAtual.classList.add("selecionado");
    window.itemDivAtual.innerHTML = `
      <span class="item-text">
        <i class="fa-solid fa-check"></i>
        ${window.itemSelecionado}
      </span>
      <span class="nome">${nomeUsuario}</span>
    `;

    // limpa campo
    input.value = "";

  } catch (e) {
    alert("Erro ao salvar. Tente novamente.");
    console.error(e);
  }
}
document
  .getElementById("popupPresente")
  .addEventListener("click", (e) => {
    if (e.target.id === "popupPresente") {
      e.target.classList.remove("ativo");
    }
  });