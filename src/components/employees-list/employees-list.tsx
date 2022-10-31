import React, {ChangeEvent, FC} from "react";

import "./employees-list.css";
import EmployeesListItem from "../employees-list-item/employees-list-item";
import Employee from "../types";

interface EmployeesListProps {
  data: Employee[]
  onDelete: (id: number) => void
  onToggleIncrease: (id: number) => void
  onTogglePromotion: (id: number) => void
  onChangeSalary: (id: number, e: ChangeEvent<HTMLInputElement>) => void
}

const EmployeesList: FC<EmployeesListProps> = ({ data, onDelete, onToggleIncrease, onTogglePromotion, onChangeSalary }) => {
  const elements = data.map((li) => {
    const { id } = li;
    return (
      <EmployeesListItem
        key={id}
        onDelete={() => onDelete(id)}
        onToggleIncrease={() => onToggleIncrease(id)}
        onTogglePromotion={() => onTogglePromotion(id)}
        onChangeSalary={onChangeSalary}
        li={li}
      />
    );
  });
  return <ul className="app-list list-group">{elements}</ul>;
}

export default EmployeesList;
