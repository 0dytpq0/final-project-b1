import MainLayout from "../MainLayout";
import TestComponent from "./_component/TestComponent";

// storybook 실행: npm run storybook
// 삭제 예정 페이지입니다
export default function TestPage() {
  return (
    // 아래와 같이 사용하는 것이 이상적인 헤더 사용방법(서버 사이드로)
    <MainLayout>
      <TestComponent />
    </MainLayout>
  );
}
