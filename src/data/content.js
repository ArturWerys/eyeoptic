const content = {
  nav: [
    { href: "/products/ttl", label: "Lupy TTL" },
    { href: "/products/flipUp", label: "Lupy Flip-Up" },
    { href: "/products/led", label: "Oświetlenie LED" },
    { href: "/products/accessories", label: "Akcesoria" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Kontakt" },
  ],

  home: {
    hero: {
      slides: [
        {
          title: "Lupy TTL",
          subtitle:
            "Precyzyjne rozwiązanie dopasowane do specjalizacji, stylu pracy i odległości roboczej.",
          href: "/products/ttl",
          buttonLabel: "Poznaj lupy TTL",
          img: "/images/home_page/ttl.png",
          imageLayout: {
            desktopHeight: "92%",
            desktopMaxWidth: "96%",
            objectPosition: "center 54%",
          },
        },
        {
          title: "Lupy TTL Sport",
          subtitle:
            "Lżejsza konstrukcja dla większego komfortu i swobody pracy.",
          href: "/products/ttl",
          buttonLabel: "Poznaj lupy TTL Sport",
          img: "/images/home_page/ttl-sport.png",
          imageLayout: {
            desktopHeight: "92%",
            desktopMaxWidth: "96%",
            objectPosition: "center 54%",
          },
        },
        {
          title: "Lupy Flip-Up",
          subtitle:
            "Regulowane ustawienie i szybkie dopasowanie do własnych preferencji pracy.",
          href: "/products/flipUp",
          buttonLabel: "Poznaj lupy Flip-Up",
          img: "/images/home_page/flip-up.png",
          imageLayout: {
            desktopHeight: "90%",
            desktopMaxWidth: "94%",
            objectPosition: "center 55%",
          },
        },
        {
          title: "Lupy Ergo Flip-Up",
          subtitle:
            "Większy komfort pracy, ergonomia i swoboda ustawienia dopasowana do użytkownika.",
          href: "/products/flipUp",
          buttonLabel: "Poznaj lupy Ergo Flip-Up",
          img: "/images/home_page/ergo-flip-up.png",
          imageLayout: {
            desktopHeight: "88%",
            desktopMaxWidth: "92%",
            objectPosition: "center 53%",
          },
        },
        {
          title: "Oświetlenie LED",
          subtitle:
            "Lepsza widoczność pola zabiegowego i większy komfort codziennej pracy.",
          href: "/products/led",
          buttonLabel: "Poznaj oświetlenie LED",
          img: "/images/home_page/led-free-2.png",
          imageLayout: {
            desktopHeight: "89%",
            desktopMaxWidth: "93%",
            objectPosition: "center 55%",
          },
        },
      ],
      points: [
        { title: "Ergonomia", desc: "Naturalna pozycja głowy i pleców" },
        { title: "Precyzja", desc: "Więcej detalu, pewniejszy ruch" },
        { title: "Dopasowanie", desc: "Dobór pod specjalizację i styl pracy" },
      ],
      ctaPrimary: { label: "Umów dobór lup", href: "/contact" },
      ctaSecondary: { label: "Zobacz modele", href: "/products" },
    },

    why: {
      heading: "Co zyskujesz dzięki dobrze dobranym lupom?",
      tiles: [
        "Maksymalna kontrola pola zabiegowego",
        "Lepsza ocena detali",
        "Mniejsze obciążenie odcinka szyjnego i lędźwiowego",
        "Stabilna praca w powiększeniu",
      ],
    },

    products: {
      heading: "Produkty EYE OPTIC - wybierz rozwiązanie dla siebie",
      tiles: [
        {
          title: "Lupy TTL",
          desc: "Maksymalna stabilność i precyzja obrazu.",
          href: "/products/ttl",
          img: "/ttl-1.jpg",
        },
        {
          title: "Lupy Flip-Up",
          desc: "Elastyczność i regulacja. Idealne jako pierwsze lupy i do pracy mieszanej.",
          href: "/products/flipUp",
          img: "/flip-up-2.png",
        },
        {
          title: "Oświetlenie LED",
          desc: "Równomierne światło w osi widzenia - mniej cieni w polu pracy.",
          href: "/products/led",
          img: "/led-1.jpg",
        },
        {
          title: "Akcesoria",
          desc: "Oprawy, paski stabilizujące, etui, osłony i elementy wyposażenia.",

          href: "/products/accessories",
        },
      ],
    },
    process: {
      heading: "Dobór w 3 krokach",
      text: "Krótki proces, dzięki któremu dobieramy lupy do Twojej specjalizacji, pozycji pracy i codziennych potrzeb.",
      steps: [
        {
          n: "01",
          title: "Krótka konsultacja",
          desc: "Rozmawiamy o Twojej specjalizacji, sposobie pracy i oczekiwaniach.",
        },
        {
          n: "02",
          title: "Precyzyjne pomiary",
          desc: "Sprawdzamy PD, odległość roboczą i naturalną pozycję podczas pracy.",
        },
        {
          n: "03",
          title: "Indywidualna konfiguracja",
          desc: "Dobieramy powiększenie, oprawę, oświetlenie i ewentualną korekcję.",
        },
      ],
    },

    compare: {
      heading: "TTL czy Flip-Up — co sprawdzi się lepiej?",
      rows: [
        {
          left: "Maksymalna stabilność i stała geometria obrazu",
          right: "TTL",
        },
        { left: "Możliwość regulacji i odchylania optyki", right: "Flip-Up" },
        { left: "Pełna personalizacja parametrów", right: "TTL" },
        {
          left: "Elastyczny start i praca w trybie mieszanym",
          right: "Flip-Up",
        },
      ],
    },

    faqPreview: {
      heading: "FAQ",
      items: [
        {
          q: "Czy lupy mogą uwzględniać korekcję wzroku?",
          a: "Tak. Konfigurację dobieramy indywidualnie. Lupy mogą być wykonane z korekcją dopasowaną do Twojej wady wzroku lub współpracować z używaną korekcją okularową.",
        },
        {
          q: "Jak długo trwa adaptacja do pracy w lupach?",
          a: "Najczęściej wystarcza kilka dni regularnej pracy. Kluczowe znaczenie ma prawidłowo dobrana odległość robocza i kąt obserwacji, dzięki temu adaptacja przebiega szybko i naturalnie.",
        },
        {
          q: "TTL czy Flip-Up - które rozwiązanie będzie lepsze?",
          a: "Lupy TTL zapewniają najwyższą stabilność obrazu, mniejszą wagę i maksymalną precyzję. Flip-Up oferują większą elastyczność regulacji, dlatego dobrze sprawdzają się na początku pracy z powiększeniem lub przy pracy mieszanej.",
        },
      ],

      moreHref: "/faq",
      moreLabel: "Zobacz pełne FAQ",
    },

    contact: {
      heading: "Umów dobór lup EYE OPTIC",
      fields: {
        interests: ["TTL", "Flip-Up", "LED", "Inne"],
        specializations: [
          "Stomatologia ogólna",
          "Endodoncja",
          "Protetyka / estetyka",
          "Chirurgia / perio",
          "Inne",
        ],
      },
    },
  },
};

export default content;
