import React, {FC} from "react";

import "./app-info.css";

interface AppInfoProps {
  amount: number
  withIncrease: number
}

const AppInfo: FC<AppInfoProps> = ({ amount, withIncrease }) => {
  return (
    <div className="app-info">
      <h1>Учет сотрудников в компании N</h1>
      <h2>Общее число сотрудников: {amount}</h2>
      <h2>Премию получат: {withIncrease}</h2>
    </div>
  );
};

export default AppInfo;
