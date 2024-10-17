import { RegisterPage } from "@/components/shared/RegisterPage/RegisterPage";
import { IBM_Plex_Mono } from "next/font/google";

const IBMPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: [ "400", "500", "600", "700"],
  variable: "--font-indie",
});

export default function Home() {
  return (
    <div>
      <main>
        <RegisterPage />
      </main>
    </div>
  );
}
