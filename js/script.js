/* HOME: interacción de la pieza pop. Ajustá GRID_SIZE si querés otra matriz. */
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const menuPop = document.querySelector(".menu-pop");
  const menuClose = document.querySelector(".menu-close");
  const menuLinks = document.querySelectorAll(".menu-link");
  const pageSections = document.querySelectorAll(".page-section");

  document.querySelectorAll(".page-footer").forEach((footer) => {
    const invitation = document.createElement("div");
    invitation.className = "footer-invite";

    const title = document.createElement("h2");
    title.textContent = "¿QUERÉS SER PARTE?";

    const copy = document.createElement("p");
    copy.textContent = "Sumate al universo Pop y contanos cuál es tu artista favorito.";

    const link = document.createElement("a");
    link.href = "#join-pop";
    link.className = "footer-invite-link";
    link.innerHTML = 'SUMATE AL POP <span aria-hidden="true">→</span>';

    invitation.append(title, copy, link);
    footer.insertBefore(invitation, footer.querySelector(".footer-meta"));
  });

  const showSection = (sectionId) => {
    const section = sectionId ? document.getElementById(sectionId) : null;
    if (!section || !pageSections.length) return;

    pageSections.forEach((item) => {
      const isActive = item.id === sectionId;
      item.classList.toggle("active", isActive);
      item.hidden = !isActive;
    });

    window.scrollTo(0, 0);
  };

  const setMenuOpen = (isOpen) => {
    if (!menuToggle || !menuPop || !menuClose) return;
    menuPop.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuPop.setAttribute("aria-hidden", String(!isOpen));
  };

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuPop.classList.contains("is-open");
      setMenuOpen(!isOpen);
    });
  }

  if (menuClose) {
    menuClose.addEventListener("click", () => setMenuOpen(false));
  }

  menuLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      const targetId = href ? href.replace("#", "") : "";
      event.preventDefault();
      setMenuOpen(false);
      showSection(targetId);
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href")?.replace("#", "");
      if (!targetId || !document.getElementById(targetId)) return;
      event.preventDefault();
      showSection(targetId);
    });
  });

  document.querySelectorAll("[data-scroll-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.scrollTarget?.replace("#", "");
      if (!targetId) return;
      showSection(targetId);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenuOpen(false);
  });

  pageSections.forEach((section) => {
    if (section.id !== "home") {
      section.classList.remove("active");
    }
  });

  showSection("home");

  const storyVignettes = document.querySelectorAll(".story-vignette");
  storyVignettes.forEach((vignette) => vignette.classList.add("is-hidden"));

  if ("IntersectionObserver" in window) {
    const vignetteObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("is-hidden");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    storyVignettes.forEach((vignette) => vignetteObserver.observe(vignette));
  } else {
    storyVignettes.forEach((vignette) => vignette.classList.remove("is-hidden"));
  }

  // ICONS: la grilla conserva la estética original y se reemplaza por la ficha editorial del artista seleccionado.
  const artistCards = document.querySelectorAll(".artist-card");
  const artistGrid = document.querySelector(".artist-grid");
  const artistDetailView = document.querySelector(".artist-detail-view");
  let openArtist = null;

  artistGrid?.classList.remove("is-hidden");
  artistDetailView?.classList.remove("is-open");
  artistDetailView && (artistDetailView.innerHTML = "");
  artistCards.forEach((item) => item.classList.remove("is-open"));

  const artistProfiles = [
    {
      id: "warhol",
      name: "ANDY WARHOL",
      country: "Estados Unidos",
      life: "1928–1987",
      intro: "Andy Warhol fue una de las figuras centrales del Pop Art estadounidense. Durante los años sesenta comenzó a convertir imágenes provenientes del consumo, la publicidad, la prensa y la cultura de las celebridades en protagonistas de sus obras.",
      image: "img/Andy.jpg",
      blocks: [
        { id: "who", number: "01", title: "QUIÉN FUE", text: "Andy Warhol fue una de las figuras centrales del Pop Art estadounidense. Durante los años sesenta comenzó a convertir imágenes provenientes del consumo, la publicidad, la prensa y la cultura de las celebridades en protagonistas de sus obras. Su trabajo borró parte de la distancia tradicional entre una obra de arte y una imagen que podía encontrarse en un supermercado, una revista o una pantalla." },
        { id: "look", number: "02", title: "SU MIRADA", text: "Warhol estaba especialmente interesado en la repetición y en la circulación masiva de las imágenes. Latas de sopa, botellas de Coca-Cola, fotografías de estrellas de Hollywood y noticias de prensa podían repetirse una y otra vez, de una manera cercana a los procesos de producción industrial. La serigrafía se convirtió en uno de los procedimientos fundamentales de su producción." },
        { id: "works", number: "03", title: "OBRAS CLAVE", works: [
          { title: "Campbell’s Soup Cans", year: "1962", className: "work-thumb--warhol", image: "img/campbells.jpeg" },
          { title: "Marilyn Diptych", year: "1962", className: "work-thumb--warhol", image: "img/marilyn.jpeg" },
          { title: "Brillo Boxes", year: "1964", className: "work-thumb--default", image: "img/brillo.jpeg" }
          ] },
        { id: "seal", number: "04", title: "SU SELLO", words: ["REPETICIÓN", "CONSUMO", "CELEBRIDAD", "SERIGRAFÍA"], text: "Warhol convirtió algunas de las imágenes más comunes de la sociedad de consumo en iconos del arte contemporáneo." },
        { id: "fact", number: "05", title: "DATO POP", fact: "Su estudio neoyorquino, conocido como The Factory, fue mucho más que un lugar de trabajo. Durante los años sesenta se convirtió en un punto de encuentro entre artistas, músicos, actores, cineastas y figuras de la cultura underground." }
      ]
    },
    {
      id: "lichtenstein",
      name: "ROY LICHTENSTEIN",
      country: "Estados Unidos",
      life: "1923–1997",
      intro: "Roy Lichtenstein llevó al gran formato el lenguaje visual de los cómics y de la publicidad comercial. Durante los años sesenta comenzó a apropiarse y transformar imágenes procedentes de historietas, anuncios y otros medios impresos, trasladándolas al terreno de la pintura.",
      image: "img/Roy.jpg",
      blocks: [
        { id: "who", number: "01", title: "QUIÉN FUE", text: "Roy Lichtenstein llevó al gran formato el lenguaje visual de los cómics y de la publicidad comercial. Durante los años sesenta comenzó a apropiarse y transformar imágenes procedentes de historietas, anuncios y otros medios impresos, trasladándolas al terreno de la pintura." },
        { id: "look", number: "02", title: "SU MIRADA", text: "Sus imágenes parecen haber salido directamente de una imprenta. Utilizó contornos negros muy definidos, colores primarios, globos de diálogo y los característicos puntos Ben-Day asociados a los sistemas de impresión comercial. Sin embargo, detrás de esa apariencia mecánica existía una composición cuidadosamente construida." },
        { id: "works", number: "03", title: "OBRAS CLAVE", works: [
          { title: "Whaam!", year: "1963", className: "work-thumb--lichtenstein", image: "img/whaam.jpeg" },
          { title: "Drowning Girl", year: "1963", className: "work-thumb--default", image: "img/drowning girl.jpeg" },
          { title: "Look Mickey", year: "1961", className: "work-thumb--lichtenstein", image: "img/mickey.jpeg" }
          ] },
        { id: "seal", number: "04", title: "SU SELLO", words: ["CÓMIC", "BEN-DAY", "CONTORNOS", "APROPIACIÓN"], text: "Lichtenstein convirtió recursos gráficos considerados comerciales o populares en un lenguaje inmediatamente reconocible dentro del arte." },
        { id: "fact", number: "05", title: "DATO POP", fact: "Whaam! se basó en una imagen procedente de un cómic bélico. Lichtenstein transformó ese material comercial mediante cambios de composición, escala y técnica hasta convertirlo en una de las imágenes más reconocibles del Pop Art." }
      ]
    },
    {
      id: "hamilton",
      name: "RICHARD HAMILTON",
      country: "Reino Unido",
      life: "1922–2011",
      intro: "Richard Hamilton fue una figura fundamental en el desarrollo temprano del Pop Art británico. Durante los años cincuenta comenzó a explorar cómo la publicidad, los electrodomésticos, las revistas, el diseño y los nuevos productos estaban transformando la vida cotidiana.",
      image: "img/Richard.jpg",
      blocks: [
        { id: "who", number: "01", title: "QUIÉN FUE", text: "Richard Hamilton fue una figura fundamental en el desarrollo temprano del Pop Art británico. Durante los años cincuenta comenzó a explorar cómo la publicidad, los electrodomésticos, las revistas, el diseño y los nuevos productos estaban transformando la vida cotidiana." },
        { id: "look", number: "02", title: "SU MIRADA", text: "Hamilton trabajó especialmente con el collage y con imágenes tomadas de la cultura de masas. Le interesaba observar cómo el deseo, el consumo, la tecnología y los medios comenzaban a construir una nueva idea de modernidad. Su obra permite conectar directamente los primeros experimentos británicos con lo que posteriormente sería conocido como Pop Art." },
        { id: "works", number: "03", title: "OBRAS CLAVE", works: [
          { title: "Just what is it that makes today's homes so different, so appealing?", year: "1956", className: "work-thumb--hamilton", image: "img/just what is it.jpeg" },
          { title: "Interior", year: "1964", className: "work-thumb--default", image: "img/interior.jpeg" },
          { title: "My Marilyn", year: "1965", className: "work-thumb--hamilton", image: "img/my marilyn.jpeg" }
          ] },
        { id: "seal", number: "04", title: "SU SELLO", words: ["COLLAGE", "CONSUMO", "MEDIOS", "CULTURA POPULAR"], text: "Hamilton observó la cultura de masas antes de que el Pop Art se transformara en un fenómeno internacional." },
        { id: "fact", number: "05", title: "DATO POP", fact: "Su collage de 1956 “Just what is it that makes today's homes so different, so appealing?” se convirtió en una de las imágenes fundamentales asociadas con los orígenes del Pop Art británico." }
      ]
    },
    {
      id: "oldenburg",
      name: "CLAES OLDENBURG",
      country: "Suecia / Estados Unidos",
      life: "1929–2022",
      intro: "Claes Oldenburg transformó los objetos más comunes de la vida cotidiana en esculturas inesperadas. Hamburguesas, helados, teléfonos, enchufes, pinzas y otros objetos podían aparecer deformados, construidos con materiales blandos o llevados a escalas monumentales.",
      image: "img/Claes.jpg",
      blocks: [
        { id: "who", number: "01", title: "QUIÉN FUE", text: "Claes Oldenburg transformó los objetos más comunes de la vida cotidiana en esculturas inesperadas. Hamburguesas, helados, teléfonos, enchufes, pinzas y otros objetos podían aparecer deformados, construidos con materiales blandos o llevados a escalas monumentales." },
        { id: "look", number: "02", title: "SU MIRADA", text: "Oldenburg cuestionó qué objetos merecían convertirse en arte. En lugar de representar héroes o temas tradicionales, dirigió su atención hacia los productos y objetos que las personas encontraban diariamente en tiendas, cocinas y calles. El cambio de material y escala hacía que lo familiar se volviera extraño." },
        { id: "works", number: "03", title: "OBRAS CLAVE", works: [
          { title: "Floor Burger", year: "1962", className: "work-thumb--oldenburg", image: "img/floor burger.jpeg" },
          { title: "Floor Cake", year: "1962", className: "work-thumb--default", image: "img/floor cake.jpeg" },
          { title: "Soft Toilet", year: "1966", className: "work-thumb--oldenburg", image: "img/soft toilet.jpeg" }
          ] },
        { id: "seal", number: "04", title: "SU SELLO", words: ["ESCALA", "OBJETOS", "ESCULTURA", "COTIDIANO"], text: "Oldenburg hizo que un objeto común pudiera convertirse en algo monumental, absurdo y completamente nuevo." },
        { id: "fact", number: "05", title: "DATO POP", fact: "En 1961 desarrolló The Store, un proyecto en Nueva York donde presentó objetos realizados por él mismo inspirados en productos que podían encontrarse en los comercios del barrio." }
      ]
    },
    {
      id: "rosenquist",
      name: "JAMES ROSENQUIST",
      country: "Estados Unidos",
      life: "1933–2017",
      intro: "James Rosenquist llevó al Pop Art la escala monumental y el impacto visual de la publicidad. Antes de consolidar su carrera artística trabajó pintando grandes carteles publicitarios, experiencia que influyó directamente en la manera en que posteriormente construyó sus pinturas.",
      image: "img/James.jpg",
      blocks: [
        { id: "who", number: "01", title: "QUIÉN FUE", text: "James Rosenquist llevó al Pop Art la escala monumental y el impacto visual de la publicidad. Antes de consolidar su carrera artística trabajó pintando grandes carteles publicitarios, experiencia que influyó directamente en la manera en que posteriormente construyó sus pinturas." },
        { id: "look", number: "02", title: "SU MIRADA", text: "Rosenquist tomaba fragmentos de fotografías, anuncios y objetos reconocibles y los combinaba en composiciones enormes. Los cambios extremos de escala y la yuxtaposición de imágenes hacían que elementos familiares adquirieran nuevos significados." },
        { id: "works", number: "03", title: "OBRAS CLAVE", works: [
          { title: "F-111", year: "1964–1965", className: "work-thumb--rosenquist", image: "img/F-111.jpeg" },
          { title: "President Elect", year: "1960–1961", className: "work-thumb--default", image: "img/president.jpeg" },
          { title: "I Love You with My Ford", year: "1961", className: "work-thumb--rosenquist", image: "img/ford.jpeg" }
          ] },
        { id: "seal", number: "04", title: "SU SELLO", words: ["PUBLICIDAD", "ESCALA", "FRAGMENTACIÓN", "COLLAGE"], text: "Su lenguaje tomó la escala de las vallas publicitarias y la trasladó al espacio del arte." },
        { id: "fact", number: "05", title: "DATO POP", fact: "Antes de dedicarse completamente a su obra artística, Rosenquist trabajó pintando carteles publicitarios de gran formato en Nueva York. Esa experiencia ayuda a explicar las enormes dimensiones y los cambios de escala característicos de muchas de sus obras." }
      ]
    }
  ];

  const setArtist = (card) => {
    artistCards.forEach((item) => {
      const isOpen = item === card;
      item.classList.toggle("is-open", isOpen);
      item.setAttribute("aria-pressed", String(isOpen));
    });
  };

  const showArtistSheet = (artistId) => {
    const artist = artistProfiles.find((item) => item.id === artistId);
    if (!artist || !artistGrid || !artistDetailView) return;

    artistGrid.classList.add("is-hidden");
    artistDetailView.classList.add("is-open");
    artistDetailView.innerHTML = `
      <div class="artist-detail-shell">
        <div class="artist-detail-topbar">
          <button class="return-grid" type="button" data-action="back">← VOLVER A LOS ARTISTAS</button>
        </div>

        <div class="artist-hero">
          <div class="artist-photo-wrap">
            <img src="${artist.image}" alt="${artist.name}" onerror="this.onerror=null; this.style.display='none'; this.parentElement.classList.add('image-missing');" />
          </div>
          <div class="artist-header-copy">
            <p class="artist-country">${artist.country}</p>
            <h3>${artist.name}</h3>
            <p class="artist-life">${artist.life}</p>
            <p class="artist-intro">${artist.intro}</p>
          </div>
        </div>

        <div class="artist-story">
          ${artist.blocks.map((block) => {
            if (block.works) {
              return `
                <section class="story-block">
                  <div class="story-block-header">
                    <span>${block.number}</span>
                    <h4>${block.title}</h4>
                  </div>
                  <div class="artist-works">
                    ${block.works.map((work) => `
                      <article class="work-item">
                        <button class="work-image-trigger" type="button" aria-label="Ampliar ${work.title}">
                          <div class="work-thumb ${work.className}"><img class="work-art-image" src="${work.image}" alt="${work.title}" /></div>
                        </button>
                        <strong>${work.title}</strong>
                        <em>${work.year}</em>
                      </article>
                    `).join("")}
                  </div>
                </section>
              `;
            }

            if (block.words) {
              return `
                <section class="story-block">
                  <div class="story-block-header">
                    <span>${block.number}</span>
                    <h4>${block.title}</h4>
                  </div>
                  <div class="artist-wordset">
                    ${block.words.map((word) => `<span>${word}</span>`).join("")}
                  </div>
                  <p>${block.text}</p>
                </section>
              `;
            }

            if (block.fact) {
              return `
                <section class="story-block">
                  <div class="story-block-header">
                    <span>${block.number}</span>
                    <h4>${block.title}</h4>
                  </div>
                  <div class="artist-fact-box">
                    <strong>DATO POP!</strong>
                    <p>${block.fact}</p>
                  </div>
                </section>
              `;
            }

            return `
              <section class="story-block">
                <div class="story-block-header">
                  <span>${block.number}</span>
                  <h4>${block.title}</h4>
                </div>
                <p>${block.text}</p>
              </section>
            `;
          }).join("")}
        </div>

        <div class="artist-nav">
          <button class="artist-nav-button" type="button" data-direction="prev">← ARTISTA ANTERIOR</button>
          <button class="artist-nav-button artist-nav-button--next" type="button" data-direction="next">SIGUIENTE ARTISTA →</button>
        </div>
      </div>
    `;

    const profileIndex = artistProfiles.findIndex((item) => item.id === artistId);
    const prevArtist = artistProfiles[(profileIndex - 1 + artistProfiles.length) % artistProfiles.length];
    const nextArtist = artistProfiles[(profileIndex + 1) % artistProfiles.length];

    const backButton = artistDetailView.querySelector("[data-action='back']");
    const prevButton = artistDetailView.querySelector('[data-direction="prev"]');
    const nextButton = artistDetailView.querySelector('[data-direction="next"]');

    backButton?.addEventListener("click", () => {
      artistDetailView.classList.remove("is-open");
      artistGrid.classList.remove("is-hidden");
      artistDetailView.innerHTML = "";
    });

    prevButton?.addEventListener("click", () => showArtistSheet(prevArtist.id));
    nextButton?.addEventListener("click", () => showArtistSheet(nextArtist.id));
  };

  artistCards.forEach((card) => {
    const artistId = card.dataset.artist;
    card.addEventListener("click", (event) => {
      event.preventDefault();
      if (!artistId) return;
      openArtist = card;
      setArtist(card);
      showArtistSheet(artistId);
    });

    card.addEventListener("mouseenter", () => {
      if (!artistDetailView.classList.contains("is-open")) setArtist(card);
    });
    card.addEventListener("mouseleave", () => {
      if (!artistDetailView.classList.contains("is-open")) setArtist(openArtist);
    });
    card.addEventListener("focus", () => {
      if (!artistDetailView.classList.contains("is-open")) setArtist(card);
    });
    card.addEventListener("blur", () => {
      if (!artistDetailView.classList.contains("is-open")) setArtist(openArtist);
    });
  });

  // CONSUME!: góndola interactiva con hotspots y modal reutilizable.
  const marketProducts = [
    { id: "campbells", name: "CAMPBELL'S SOUP CANS", artist: "Andy Warhol", year: "1962", type: "Serigrafía / pintura", info: "Warhol convirtió un producto cotidiano y producido en masa en una obra de arte, cuestionando la separación entre comercio y arte." },
    { id: "brillo", name: "BRILLO BOXES", artist: "Andy Warhol", year: "1964", type: "Escultura / reproducción", info: "Warhol reprodujo cajas comerciales de detergente y las trasladó al contexto artístico, trabajando sobre consumo, repetición y cultura de masas." },
    { id: "comics", name: "CÓMICS", artist: "Cultura del cómic estadounidense", year: "1930–1960", type: "Estética de la prensa y la viñeta", info: "Los cómics aportaron colores planos, contornos negros, puntos Ben-Day y narrativas directas que influyeron decisivamente en artistas Pop como Roy Lichtenstein." },
    { id: "banana", name: "THE VELVET UNDERGROUND & NICO", artist: "Andy Warhol", year: "1967", type: "Diseño de portada", info: "Warhol diseñó la banana icónica del álbum, transformando un símbolo comercial y minimalista en una imagen profunda y reconocible del Pop Art." },
    { id: "haring", name: "KEITH HARING", artist: "Keith Haring", year: "1980s", type: "Arte urbano / gráfico", info: "Haring construyó un lenguaje de líneas gruesas, figuras sencillas y colores planos, conectado con la ciudad y con la cultura visual popular." },
    { id: "lichtenstein", name: "WHAAM! / ROY LICHTENSTEIN", artist: "Roy Lichtenstein", year: "1963", type: "Óleo / técnica de cómic", info: "Lichtenstein tomó recursos visuales del cómic —líneas gruesas, explosiones, estrellas y puntos Ben-Day— y los trasladó al arte contemporáneo." },
    { id: "tazas", name: "TAZAS POP ART", artist: "Diseño contemporáneo", year: "2024", type: "Objeto de consumo / merchandising", info: "La estética de Warhol y Lichtenstein aún continúa en la cultura material: objetos cotidianos, merchandising y diseño comercial repiten su lenguaje visual." },
    { id: "libros", name: "LIBROS", artist: "Archivo y estudio del Pop Art", year: "2024", type: "Material de referencia", info: "Los libros representan la permanencia del Pop Art como disciplina de estudio, diseño, publicidad y reflexión estética en la cultura contemporánea." },
    { id: "gafas", name: "GAFAS POP", artist: "Estética contemporánea", year: "2024", type: "Accesorio / apropiación visual", info: "Los colores saturados, las formas impactantes y los objetos cotidianos siguen siendo parte del lenguaje Pop en la moda, el diseño y la cultura comercial." },
    { id: "tote", name: "TOTE BAGS", artist: "Merchandising Pop Art", year: "2024", type: "Objeto reproducible", info: "Las imágenes vinculadas al arte vuelven al consumo cuando se transforman en productos reproducibles y de circulación masiva." },
    { id: "cuadernos", name: "CUADERNOS", artist: "Diseño gráfico Pop", year: "2024", type: "Material de estudio y diseño", info: "Los cuadernos conectan la repetición, la tipografía expresiva y la ilustración de cómic con el uso cotidiano del color y la identidad visual." },
    { id: "termos", name: "TERMOS POP ART", artist: "Objetos cotidianos", year: "2024", type: "Producto contemporáneo", info: "El lenguaje Pop sigue trasladándose a la vida diaria mediante objetos que mezclan consumo, diseño y referencia cultural sin perder su carácter masivo." }
  ];

  const marketMap = Object.fromEntries(marketProducts.map((product) => [product.id, product]));
  const modal = document.querySelector("#work-modal");
  if (!modal) return;
  const modalArtwork = modal.querySelector(".modal-artwork");
  let modalTrigger = null;
  let modalScrollPosition = 0;

  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.classList.remove("work-modal--artwork");
    modal.setAttribute("aria-hidden", "true");
    modalArtwork.removeAttribute("src");
    modalArtwork.alt = "";
    modalTrigger?.focus({ preventScroll: true });
    if (modalTrigger) window.scrollTo({ top: modalScrollPosition, behavior: "instant" });
    modalTrigger = null;
  };

  artistDetailView?.addEventListener("click", (event) => {
    const trigger = event.target.closest(".work-image-trigger");
    if (!trigger) return;

    const artwork = trigger.querySelector(".work-art-image");
    if (!artwork || !modalArtwork) return;

    modalTrigger = trigger;
    modalScrollPosition = window.scrollY;
    modalArtwork.src = artwork.src;
    modalArtwork.alt = artwork.alt;
    document.querySelector("#modal-title").textContent = artwork.alt;
    modal.classList.add("work-modal--artwork", "is-open");
    modal.setAttribute("aria-hidden", "false");
    modal.querySelector(".modal-close").focus({ preventScroll: true });
  });

  document.querySelectorAll(".hotspot").forEach((hotspot) => {
    hotspot.addEventListener("click", () => {
      const product = marketMap[hotspot.dataset.product];
      if (!product) return;

      document.querySelector("#modal-title").textContent = product.name;
      document.querySelector('[data-modal="artist"]').textContent = product.artist;
      document.querySelector('[data-modal="year"]').textContent = product.year;
      document.querySelector('[data-modal="type"]').textContent = product.type;
      document.querySelector('[data-modal="why"]').textContent = product.info;

      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      modal.querySelector(".modal-close").focus();
    });
  });

  modal.querySelectorAll("[data-close-modal]").forEach((button) => button.addEventListener("click", closeModal));
  document.addEventListener("keydown", (event) => { if (event.key === "Escape" && modal.classList.contains("is-open")) closeModal(); });
  modal.addEventListener("click", (event) => {
    if (event.target === modal || event.target.classList.contains("modal-backdrop")) closeModal();
  });

  // Mini juego: selección, respuesta y resultado final.
  const questions = [
    { answer: "arte", text: "Esta lata viene de una serie de Warhol: el objeto común se volvió obra al entrar en el museo.", image: "img/arte.campbell.jpeg" },
    { answer: "publicidad", text: "Es una imagen publicitaria. En el Pop Art, copiar ese lenguaje es justamente parte de la provocación.", image: "img/publicidad.cereal.jpeg" },
    { answer: "arte", text: "Los puntos y el encuadre de cómic pertenecen a una obra de Lichtenstein.", image: "img/arte.sandwich.jpeg" },
    { answer: "arte", text: "Una caja Brillo en una galería: la ambigüedad entre producto y obra es el centro de la pieza.", image: "img/arte.brillo.jpeg" },
    { answer: "publicidad", text: "Un aviso también puede parecer pop. Tu mirada detecta que el contexto cambia todo.", image: "img/publicidad.labial.jpeg" }
  ];
  const screens = document.querySelectorAll(".game-screen");
  const showScreen = (name) => screens.forEach((screen) => { screen.hidden = !screen.classList.contains(name); });
  let currentQuestion = 0; let score = 0;
  const renderQuestion = () => { const question = questions[currentQuestion]; document.querySelector(".game-progress").textContent = `${currentQuestion + 1} / ${questions.length}`; const gameImage = document.querySelector(".game-image"); gameImage.className = "game-image"; gameImage.querySelector("img").src = question.image; gameImage.querySelector("img").alt = `Imagen de la ronda ${currentQuestion + 1}`; showScreen("game-question"); };
  document.querySelector("#start-game").addEventListener("click", () => { currentQuestion = 0; score = 0; renderQuestion(); });
  document.querySelectorAll(".game-options button").forEach((button) => button.addEventListener("click", () => { const question = questions[currentQuestion]; const correct = button.dataset.answer === question.answer; if (correct) score += 1; document.querySelector(".feedback-status").textContent = correct ? "✓ ¡ACERTASTE!" : "× CASI"; document.querySelector(".feedback-copy").textContent = question.text; showScreen("game-feedback"); }));
  document.querySelector("#next-question").addEventListener("click", () => { currentQuestion += 1; if (currentQuestion < questions.length) renderQuestion(); else { document.querySelector(".score-output").textContent = `${score} / ${questions.length}`; showScreen("game-result"); } });
  document.querySelector("#restart-game").addEventListener("click", () => { currentQuestion = 0; score = 0; renderQuestion(); });

  // THE FACTORY: titular editable, contador y variantes de portada.
  const headlineInput = document.querySelector("#pop-headline");
  const coverHeadline = document.querySelector("#cover-headline");
  const charCount = document.querySelector("#char-count");
  const dailyCover = document.querySelector("#daily-cover");
  const fallbackHeadline = "EL ARTE ESTÁ EN TODAS PARTES";
  const factoryStyles = ["comic", "screenprint", "advert", "collage", "impact"];
  const factoryPalette = ["#ffd400", "#ff007f", "#00b8e6", "#ed2939", "#5729c7"];
  let factoryStyleIndex = 0;

  const escapeMarkup = (value) => value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);

  const renderFactoryArtwork = (value) => {
    const normalized = value.trim() || fallbackHeadline;
    const words = normalized.split(/\s+/);
    const safeWords = words.map(escapeMarkup);
    const text = escapeMarkup(normalized);
    const style = factoryStyles[factoryStyleIndex];
    const headline = coverHeadline;
    const typeScale = Math.max(0.34, Math.min(1, Math.sqrt(20 / Math.max(normalized.length, 20))));

    dailyCover.dataset.style = style;
    dailyCover.style.setProperty("--factory-type-scale", typeScale.toFixed(3));
    dailyCover.classList.remove("is-changing");
    void dailyCover.offsetWidth;
    dailyCover.classList.add("is-changing");

    if (style === "screenprint") {
      headline.innerHTML = `<div class="screenprint-grid">${Array.from({ length: 4 }, (_, index) => `<span class="screenprint-copy screenprint-copy--${index + 1}">${text}</span>`).join("")}</div>`;
    } else if (style === "advert") {
      headline.innerHTML = `<div class="advert-layout">${safeWords.map((word, index) => `<span class="advert-word advert-word--${index % 4}">${word}</span>`).join("")}</div>`;
    } else if (style === "collage") {
      headline.innerHTML = `<div class="collage-layout">${safeWords.map((word, index) => `<span class="collage-word collage-word--${index % 5}">${word}</span>`).join("")}</div>`;
    } else if (style === "impact") {
      const impactIndex = Math.max(0, Math.ceil(safeWords.length / 2) - 1);
      headline.innerHTML = `<div class="impact-layout"><span class="impact-burst" aria-hidden="true">✦</span>${safeWords.map((word, index) => `<span class="impact-word${index === impactIndex ? " impact-word--hero" : ""}">${word}</span>`).join("")}</div>`;
    } else {
      headline.innerHTML = `<span class="comic-headline">${text}</span><span class="comic-burst" aria-hidden="true">!</span>`;
    }

    window.setTimeout(() => dailyCover.classList.remove("is-changing"), 180);
  };

  const updateHeadline = () => {
    const value = headlineInput.value;
    charCount.textContent = value.length;
    renderFactoryArtwork(value);
  };
  headlineInput.addEventListener("input", updateHeadline);
  document.querySelector("#make-pop").addEventListener("click", updateHeadline);
  document.querySelector("#edit-headline").addEventListener("click", () => headlineInput.focus());
  document.querySelector("#new-version").addEventListener("click", () => {
    factoryStyleIndex = (factoryStyleIndex + 1) % factoryStyles.length;
    renderFactoryArtwork(headlineInput.value);
  });
  updateHeadline();

  // POP TODAY: retornos circulares con desplazamiento fluido.
  document.querySelectorAll(".hotspot").forEach((hotspot) => {
    hotspot.addEventListener("click", () => {
      const product = marketMap[hotspot.dataset.product];
      if (!product) return;

      document.querySelector("#modal-title").textContent = product.name;
      document.querySelector('[data-modal="artist"]').textContent = product.artist;
      document.querySelector('[data-modal="year"]').textContent = product.year;
      document.querySelector('[data-modal="type"]').textContent = product.type;
      document.querySelector('[data-modal="why"]').textContent = product.info;

      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      modal.querySelector(".modal-close").focus();
    });
  });

  document.querySelectorAll("[data-scroll-target]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelector(button.dataset.scrollTarget).scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
});
