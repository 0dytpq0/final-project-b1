import Header from "@/components/commons/Header";
import { HeaderProps } from "@/components/commons/Header/Header";
import ClientDrawer from "../Drawer/ClientDrawer";
import Footer from "../commons/Footer/Footer";
import LgHeader from "../commons/Header/LgHeader";

type MainLayoutProps = {
  children: React.ReactNode;
  headerProps?: HeaderProps;
  noHeader?: boolean;
};

function MainLayout({ children, headerProps, noHeader }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {headerProps && (
        <>
          <Header {...headerProps} />
          {!noHeader && <LgHeader />}
        </>
      )}
      <ClientDrawer />
      {children}
      <Footer />
    </div>
  );
}

export default MainLayout;
