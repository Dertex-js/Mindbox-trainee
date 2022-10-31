import React from "react";

import "./employees-list-item.css";

const EmployeesListItem = (props) => {
  const onSalaryChange = (e) => {
    props.onChangeSalary(e.target);
  };

  const setCursor = (e) => {
    if (e.target.selectionStart) {
      var end = e.target.value.length - 1;
      e.target.setSelectionRange(end, end);
      e.target.focus();
    }
  };
  const set$ = (salary) => {
    if (salary.toString().indexOf(`$`) === -1) {
      return salary + `$`;
    }
    return salary;
  };

  const { name, salary, increase, promotion, onDelete, onTogglePromotion, onToggleIncrease } =
    props;

  let classNames = "list-group-item d-flex justify-content-between row g-0";

  if (increase) {
    classNames += ` increase`;
  }
  if (promotion) {
    classNames += ` like`;
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
          onClick={setCursor}
          onChange={onSalaryChange}
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
