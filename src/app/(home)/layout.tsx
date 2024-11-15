import type { Metadata } from "next";
import { Container, Header, Navigation } from "@/components/shared";
import { Provider } from "./provider";
import localFont from "next/font/local";

import home from "./home.module.scss";

const IBMPlexMono = localFont({
  src: "../fonts/IBMPlexMonoRegular.ttf",
  variable: "--font-IBMPlexMono--",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={IBMPlexMono.className}>
        <Provider>
          <Header />
          <Container>
            <article className={home.article}>
              <Navigation />
              {children}
            </article>
          </Container>
        </Provider>
      </body>
    </html>
  );
}
