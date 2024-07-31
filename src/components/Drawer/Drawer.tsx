import { ICON } from "@/constants/icon";
import useDrawerStore from "@/stores/drawer.store";
import Image from "next/image";
import CategoryList from "./CategoryList";

function Drawer() {
  const { isOpen, closeDrawer } = useDrawerStore();

  return (
    <aside
      className={`fixed top-0 w-full max-w-xs h-full bg-[#F8F8F8] ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 z-[100]`}
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
      <CategoryList />
    </aside>
  );
}

export default Drawer;
