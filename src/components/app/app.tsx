import {useState, useRef, ChangeEvent} from "react";
import React from "react";

import Employee from "../types";

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployeesList from "../employees-list/employees-list";
import EmployeesAddForm from "../employees-add-form/employees-add-form";

import "./app.css";
import {employee} from "../../mocks/employee";

const App = () => {
  let maxId = useRef(4);
  const [data, setData] = useState<Employee[]>(employee);
  const [term, setTerm] = useState<string>("");
  const [filter, setFilter] = useState<string>("all");

  const deleteItem = (id: number) => {
    setData(data.filter((item) => item.id !== id));
    console.log(data)
  };

  const addItem = (name: string, salaryStr: string) => {
    if (name && salaryStr) {
      const salary = +salaryStr
      const newItem = {
        name,
        salary,
        increase: false,
        promotion: false,
        id: maxId.current++,
      };
      setData([...data, newItem]);
    }
  };

  const onToggleIncrease = (id: number) => {
    setData(
      data.map((item) => {
        if (item.id === id) {
          return { ...item, increase: !item.increase };
        }
        return item;
      })
    );
  };

  const onTogglePromotion = (id: number) => {
    setData(
      data.map((item) => {
        if (item.id === id) {
          return { ...item, promotion: !item.promotion };
        }
        return item;
      })
    );
  };

  const onUpdateSearch = (term: string) => {
    setTerm(term);
  };

  const onFilterSelect = (filter: string) => {
    setFilter(filter);
  };

  const filterPost = (items: Employee[], filter: string) => {
    switch (filter) {
      case "onPromotion":
        return items.filter((item) => item.promotion);
      case "moreThen1000":
        return items.filter((item) => {
          return item.salary > 1000;
        });
      case "onIncrease":
        return items.filter((item) => item.increase);
      default:
        return items;
    }
  };

  const searchEmp = (items: Employee[], term: string) => {
    if (term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.name.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  };

  const onChangeSalary = (id: number, e: ChangeEvent<HTMLInputElement>) => {
    setData(
      data.map((item) => {
        if (item.id === id) {
          item.salary = +e.target.value;
          return item;
        }
        return item;
      })
    );
  };

  return (
    <div className="app">
      <AppInfo amount={data.length} withIncrease={data.filter((item) => item.increase).length} />

      <div className="search-panel row g-0">
        <SearchPanel onUpdateSearch={onUpdateSearch} />
        <AppFilter filter={filter} onFilterSelect={onFilterSelect} />
      </div>

      <EmployeesList
        data={filterPost(searchEmp(data, term), filter)}
        onDelete={deleteItem}
        onToggleIncrease={onToggleIncrease}
        onTogglePromotion={onTogglePromotion}
        onChangeSalary={onChangeSalary}
      />
      <EmployeesAddForm onPush={addItem} />
    </div>
  );
};

export default App;

//Объединить методы
//Избежать проблемы props drilling через useContext
