import { ICON } from "@/constants/Icon";
import useDrawerStore from "@/stores/useDrawerStore";
import Image from "next/image";
import Category from "./Category";

function Drawer() {
  const { isOpen, closeDrawer } = useDrawerStore();

  return (
    <aside
      className={`fixed top-0 w-full max-w-xs h-full bg-[#F8F8F8] ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300`}
    >
      <div className="flex justify-between items-center bg-white p-4">
        <h2 className="mx-auto">카테고리</h2>
        <button onClick={closeDrawer}>
          <Image
            src={`/icons/${ICON.cancel.black}.png`}
            alt="cancel"
            width={16}
            height={16}
          />
        </button>
      </div>
      <nav className="flex flex-col">
        <Category
          href="/"
          imgPath="/icons/home-black.png"
          alt="home"
          label="홈"
        />
        <Category
          href="#"
          imgPath="/icons/home-black.png"
          alt="home"
          label="마이 페이지"
        />
        <Category
          imgPath="/icons/home-black.png"
          alt="home"
          label="내 여행 플래너"
          hasArrow
        />
        <Category
          imgPath="/icons/home-black.png"
          alt="home"
          label="여행지"
          hasArrow
        />
      </nav>
    </aside>
  );
}

export default Drawer;