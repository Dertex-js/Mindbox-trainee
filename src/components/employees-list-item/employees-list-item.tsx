import React, {ChangeEvent, FC} from "react";

import "./employees-list-item.css";
import Employee from "../types";

interface EmployeesListItemProps {
  onDelete: () => void
  onToggleIncrease: () => void
  onTogglePromotion: () => void
  onChangeSalary: (id: number, e: ChangeEvent<HTMLInputElement>) => void
  li: Employee
}

const EmployeesListItem: FC<EmployeesListItemProps> = ({onToggleIncrease, onTogglePromotion, onChangeSalary, onDelete, li}) => {
  const setCursor = (e: any) => {
    if (e.target.selectionStart) {
      const end = e.target.value.length - 1;
      e.target.setSelectionRange(end, end);
      e.target.focus();
    }
  };
  const set$ = (salary: number) => {
    if (salary.toString().indexOf(`$`) === -1) {
      return salary + `$`;
    }
    return salary;
  };

  const { name, salary, increase, promotion } = li;

  let classNames = "list-group-item d-flex justify-content-between row g-0";

  if (increase) {
    classNames += ` increase`;
  }
  if (promotion) {
    classNames += ` like`;
  }

  const salaryHandle = () => {
    onChangeSalary()
  }
  return (
    <li className={classNames}>
      <span
        className="list-group-item-label col-md-1 col-6"
        onClick={onTogglePromotion}
        title="Повысить"
      >
        {name}
      </span>
      <div className="empControl col-6 d-flex justify-content-end">
        <input
          type="text"
          className="list-group-item-input"
          value={set$(salary)}
          onClick={() => setCursor}
          onChange={salaryHandle}
          title="Изменить зп"
        />
        <div className="btns-group d-flex justify-content-center align-items-center">
          <button
            type="button"
            className="btn-cookie btn-sm"
            onClick={onToggleIncrease}
            title="Премировать"
          >
            <i className="fas fa-cookie"></i>
          </button>

          <button
            type="button"
            className="btn-trash btn-sm"
            onClick={onDelete}
            title="Удалить из списка"
          >
            <i className="fas fa-trash"></i>
          </button>
          <i className="fas fa-star"></i>
        </div>
      </div>
    </li>
  );
};

export default EmployeesListItem;
