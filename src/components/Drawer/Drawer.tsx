import { ICON } from "@/constants/icon";
import useDrawerStore from "@/stores/drawer.store";
import Image from "next/image";
import CategoryList from "./CategoryList";

function Drawer() {
  const { isOpen, closeDrawer } = useDrawerStore();

  return (
    <aside
      className={`fixed top-0 w-full max-w-xs h-full bg-[#F8F8F8] transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"} duration-1000 z-drawer`}
    >
      <div className="flex justify-end items-center bg-white p-4">
        <h2 className="mx-auto absolute left-0 right-0 text-center">
          카테고리
        </h2>
        <button onClick={closeDrawer} className="relative">
          <Image
            src={`/icons/${ICON.cancel.black}.png`}
            alt="cancel"
            width={16}
            height={16}
            priority
          />
        </button>
      </div>
      <CategoryList />
    </aside>
  );
}

export default Drawer;
