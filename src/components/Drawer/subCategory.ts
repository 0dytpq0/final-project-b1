type SubCategoryProps = {
  title: string;
  path: string;
};

export const SUB_CATEGORY: SubCategoryProps[] = [
  // { title: "내 여행", path: "/plan" }, // mvp 이후 진행
  { title: "내 여행 리스트", path: "/plan" },
  { title: "가계부", path: "/account" },
];
