import React, { useState } from "react";
import { LikeOutline } from "antd-mobile-icons";
import { ResultPage, Image, Popup } from "antd-mobile";
import exampleImage from "../../assets/chu2.png";
import adImage from "../../assets/ad.jpg";

export default function Result({
  result,
  onClose,
  scoreImageSrc = exampleImage,
  qrCodeContent = adImage,
}) {
  const [showConsultation, setShowConsultation] = useState(false);

  return (
    <ResultPage
      icon={<LikeOutline />}
      status="success"
      title={`总成绩 ${result} 分`}
      description="具体计算规则，请参考下方《国家体质健康测试》评分标准"
      primaryButtonText={"提分咨询"}
      secondaryButtonText={"重新计算"}
      onPrimaryButtonClick={() => setShowConsultation(true)}
      onSecondaryButtonClick={() => onClose()}
    >
      <div>
        <Image src={scoreImageSrc} />
      </div>
      <Popup
        visible={showConsultation}
        onMaskClick={() => setShowConsultation(false)}
        bodyStyle={{
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          minHeight: "40vh",
        }}
      >
        <Image src={qrCodeContent} />
      </Popup>
    </ResultPage>
  );
}
