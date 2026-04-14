# Eye Optic

Strona produktowa Next.js przygotowana do statycznego wdrożenia na hostingu współdzielonym, np. Cyber_Folks.

## Komendy

```bash
npm install
npm run dev
npm run build
npm start
```

- `npm run dev` uruchamia tryb developerski.
- `npm run build` generuje statyczną wersję strony w katalogu `out/`.
- `npm start` uruchamia lokalny podgląd gotowego eksportu statycznego.

## Adres strony

Przed buildem ustaw w `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://eyeoptic.pl
```

Ta wartość jest używana w `sitemap.xml` i `robots.txt`.

## Wdrożenie

Pełna instrukcja wdrożenia na Cyber_Folks, konfiguracji poczty i bezpieczeństwa znajduje się w [DEPLOY_CYBERFOLKS.md](./DEPLOY_CYBERFOLKS.md).

## Kontakt na stronie

Obecna strona kontaktowa korzysta z linków `tel:` i `mailto:`. Nie wymaga backendu ani obsługi formularza po stronie serwera.

Jeśli w przyszłości chcesz dodać prawdziwy formularz kontaktowy wysyłający maile bezpośrednio z witryny, na hostingu współdzielonym potrzebny będzie osobny mechanizm wysyłki, np. endpoint PHP albo zewnętrzna usługa.
