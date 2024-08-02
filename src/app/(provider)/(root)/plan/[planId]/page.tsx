"use client";

import PlanAPI from "@/apis/plan.api";
import { BottomSheetType } from "@/types/plan";
import { Tables } from "@/types/supabase";
import axios from "axios";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import BottomSheet from "../_components/BottomSheet";
import CreateButton from "../_components/CreateButton";
import DayMenu from "../_components/DayMenu";
import ScheculeList from "./ScheculeList";

// PlanAPI 인스턴스를 컴포넌트 바깥으로 이동
const api = new PlanAPI(axios);

function PlanDetailPage({ params }: { params: { planId: string } }) {
  const planId = params.planId;

  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [bottomSheetConfig, setBottomSheetConfig] = useState<BottomSheetType>({
    type: "customePlace",
    status: "add",
  });
  const [selectedDay, setSelectedDay] = useState(1);
  const [days, setDays] = useState<number[]>([]);

  useEffect(() => {
    const fetchPlanData = async () => {
      try {
        const planData: Tables<"plan">[] = await api.getMyPlans(); // PlanAPI를 통해 데이터 가져오기
        const plan = planData.find((p: Tables<"plan">) => p.id === planId);

        if (plan) {
          // startDate 및 endDate가 문자열임을 가정하고 변환
          const startDate = new Date(plan.startDate as string);
          const endDate = new Date(plan.endDate as string);

          const timeDiff = endDate.getTime() - startDate.getTime();
          const daysCount = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // 일 수 계산

          const daysArray = Array.from({ length: daysCount }, (_, i) => i + 1);
          setDays(daysArray);
        }
      } catch (error) {
        console.error("Error fetching plan data:", error);
      }
    };

    fetchPlanData();
  }, [planId]);

  const handleOpen = (
    type: BottomSheetType["type"],
    status: BottomSheetType["status"]
  ) => {
    setBottomSheetConfig({ type, status });
    setBottomSheetVisible(true);
  };

  const handleClose = () => {
    setBottomSheetVisible(false);
  };

  const handleDaySelect = (day: number) => {
    setSelectedDay(day);
  };

  const handleCreateSchedule = useCallback(
    (type: BottomSheetType["type"], status: BottomSheetType["status"]) => {
      handleOpen(type, status);
    },
    []
  );

  if (!planId) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen w-full bg-[#FCFCFC]">
      <div className="h-48 w-full bg-gray-200">
        <div className="relative w-full h-full">
          <Image
            src="/plan/planBanner.png"
            alt="planBanner"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      <DayMenu
        days={days}
        selectedDay={selectedDay}
        onDaySelect={handleDaySelect}
      />
      <ScheculeList planId={planId} selectedDay={selectedDay} />
      {isBottomSheetVisible && (
        <BottomSheet
          type={bottomSheetConfig.type}
          status={bottomSheetConfig.status}
          onClose={handleClose}
          planId={planId}
          day={selectedDay}
        />
      )}

      <CreateButton
        createSchedule={() => handleCreateSchedule("customePlace", "add")}
        createByBookmark={() => handleCreateSchedule("place", "add")}
        createMemo={() => handleCreateSchedule("memo", "add")}
      />
    </div>
  );
}

export default PlanDetailPage;
