import { ICON } from "@/constants/Icon";
import Link from "next/link";
import MainLayout from "../layout";

function Home() {
  return (
    <MainLayout
      headerProps={{
        backgroundColor: "white",
        leftIcons: [
          {
            icon: ICON.menu.burgerBlack,
            alt: "Back",
            size: 20,
            path: "/",
          },
        ],
        title: "TripStory",
        titleAlign: "left",
        rightIcons: [
          {
            icon: ICON.notification.black,
            alt: "Notifications",
            size: 20,
            path: "/",
          },
          {
            icon: ICON.avatar.black,
            alt: "Avatar",
            size: 20,
            path: "/",
          },
        ],
      }}
    >
      <main className="w-full h-full">
        <Link
          href="/commons-test"
          className="flex justify-center items-centerp-2 border border-black rounded hover:bg-slate-100"
        >
          테스트 페이지로 이동
        </Link>
      </main>
    </MainLayout>
  );
}

export default Home;
