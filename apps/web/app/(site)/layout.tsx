import MainBackground from "../../components/animations/MainBackground";
import Footer from "../../components/footer/footer";
import Header from "../../components/header";


export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <MainBackground/>
      <Header />

      <main>{children}</main>

      <Footer />
    </>
  );
}