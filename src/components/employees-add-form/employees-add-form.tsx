import {ChangeEvent, FC, useState} from "react";
import React from "react";
import "./employees-add-form.css";

interface EmployeesAddFormProps {
  onPush: (name: string, salaryStr: string) => void
}

const EmployeesAddForm: FC<EmployeesAddFormProps> = ({onPush}) => {
  const [name, setName] = useState<string>("");
  const [salaryStr, setSalaryStr] = useState<string>("");

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setName(e.target.value);
    }
  };

  const onSalaryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSalaryStr(e.target.value)
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onPush(name, salaryStr);
    setName("");
    setSalaryStr("");
  };

  return (
    <div className="app-add-form">
      <h3>Добавьте нового сотрудника</h3>
      <form className="add-form d-md-flex d-block row g-0" onSubmit={onSubmit}>
        <input
          type="text"
          className="form-controll new-post-label col-md-4 col-12"
          name="name"
          placeholder="Как его зовут?"
          value={name}
          onChange={onNameChange}
        />
        <input
          type="number"
          className="form-controll new-post-label col-md-4 col-12"
          name="salary"
          placeholder="З/П в $?"
          value={salaryStr}
          onChange={onSalaryChange}
        />

        <button type="submit" className="btn btn-outline-light col-md-2 col-12">
          Добавить
        </button>
      </form>
    </div>
  );
};

export default EmployeesAddForm;
