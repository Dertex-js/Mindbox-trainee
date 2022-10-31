import {useState} from "react";
import React from "react";
import "./employees-add-form.css";

const EmployeesAddForm = (props: any) => {
  const [name, setName] = useState<string>("");
  const [salary, setSalary] = useState<string>("");

  const onValueChange = (e: any) => {
    setName(e.target.value);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    props.onPush(name, salary);
    setName("");
    setSalary("");
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
          onChange={onValueChange}
        />
        <input
          type="number"
          className="form-controll new-post-label col-md-4 col-12"
          name="salary"
          placeholder="З/П в $?"
          value={salary}
          onChange={onValueChange}
        />

        <button type="submit" className="btn btn-outline-light col-md-2 col-12">
          Добавить
        </button>
      </form>
    </div>
  );
};

export default EmployeesAddForm;
