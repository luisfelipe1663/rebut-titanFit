function toggleMenu() {
    document.getElementById("menu").classList.toggle("active");
}

/* =======================================================
   ANIMAÇÕES (TODAS JUNTAS)
======================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* SOBRE NÓS */
    const sobreNos = document.querySelector(".sobrenos-home");

    if (sobreNos) {
        const observerSobre = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    sobreNos.classList.add("animar");
                    observerSobre.disconnect();
                }
            });
        }, { threshold: 0.3 });

        observerSobre.observe(sobreNos);
    }

    /* PLANOS HOME */
    const planosHome = document.querySelectorAll(
        ".plano_basico-home, .plano_avancado-home, .plano_premium-home"
    );

    const secaoPlanosHome = document.querySelector(".caixa-planos_home");

    if (secaoPlanosHome && planosHome.length > 0) {

        const observerPlanos = new IntersectionObserver((entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    planosHome.forEach((plano, index) => {

                        setTimeout(() => {
                            plano.classList.add("animar");
                        }, index * 300);

                    });

                    observerPlanos.disconnect();
                }

            });

        }, { threshold: 0.3 });

        observerPlanos.observe(secaoPlanosHome);
    }

    /* SERVIÇOS */
    const servicos = document.querySelectorAll(".animar-servico");

    if (servicos.length > 0) {

        const observerServicos = new IntersectionObserver((entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    servicos.forEach((servico, index) => {

                        setTimeout(() => {
                            servico.classList.add("ativo");
                        }, index * 250);

                    });

                    observerServicos.disconnect();
                }

            });

        }, { threshold: 0.2 });

        servicos.forEach((servico) => {
            observerServicos.observe(servico);
        });
    }

    /* BOTÃO PROFESSOR / USUÁRIO */
    const botoes = document.querySelectorAll(".botao-escolha");
    const inputTipo = document.getElementById("tipoUsuario");

    if (botoes.length > 0 && inputTipo) {

        botoes.forEach((botao) => {

            botao.addEventListener("click", () => {

                botoes.forEach(b => b.classList.remove("ativo"));
                botao.classList.add("ativo");

                inputTipo.value = botao.textContent.toLowerCase();

            });

        });

    }

});

/* =======================================================
   CARD CENTRAL (FORA DO DOMCONTENTLOADED)
======================================================= */

const cardsContainer = document.querySelector(".pagina-planos-cards");
const cards = document.querySelectorAll(".pagina-plano-card");

function destacarCardCentral() {

    if (!cardsContainer || cards.length === 0) return;

    const centroTela = window.innerWidth / 2;

    let cardMaisCentral = null;
    let menorDistancia = Infinity;

    cards.forEach((card) => {

        const rect = card.getBoundingClientRect();
        const centroCard = rect.left + rect.width / 2;
        const distancia = Math.abs(centroTela - centroCard);

        if (distancia < menorDistancia) {
            menorDistancia = distancia;
            cardMaisCentral = card;
        }

    });

    cards.forEach((card) => {
        card.classList.remove("ativo");
    });

    if (cardMaisCentral) {
        cardMaisCentral.classList.add("ativo");
    }
}

if (cardsContainer && cards.length > 0) {

    cardsContainer.addEventListener("scroll", destacarCardCentral);
    window.addEventListener("resize", destacarCardCentral);
    window.addEventListener("load", destacarCardCentral);
}