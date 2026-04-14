import "./globals.css";
import Providers from "@/components/Providers";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";

export const metadata = {
  title: "Eye Optic",
  description: "Lupy stomatologiczne: TTL, Flip-Up i oświetlenie LED.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body style={{ margin: 0 }}>
        <AppRouterCacheProvider>
          <Providers>{children}</Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
