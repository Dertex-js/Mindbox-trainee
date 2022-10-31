import { useState, useRef } from "react";
import React from "react";

import Employee from "../types";

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployeesList from "../employees-list/employees-list";
import EmployeesAddForm from "../employees-add-form/employees-add-form";

import "./app.css";

const App = () => {
  let maxId = useRef(4);
  const [data, setData] = useState([
    { name: "John S.", salary: 800, increase: false, promotion: true, id: 1 },
    { name: "Alex M.", salary: 2500, increase: false, promotion: false, id: 2 },
    { name: "Carl W.", salary: 15000, increase: true, promotion: false, id: 3 },
  ]);
  const [term, setTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const deleteItem = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const addItem = (name, salary) => {
    if (name && salary) {
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

  const onToggleIncrease = (id) => {
    setData(
      data.map((item) => {
        if (item.id === id) {
          return { ...item, increase: !item.increase };
        }
        return item;
      })
    );
  };

  const onTogglePromotion = (id) => {
    setData(
      data.map((item) => {
        if (item.id === id) {
          return { ...item, promotion: !item.promotion };
        }
        return item;
      })
    );
  };

  const onUpdateSearch = (term) => {
    setTerm(term);
  };

  const onFilterSelect = (filter) => {
    setFilter(filter);
  };

  const filterPost = (items, filter) => {
    switch (filter) {
      case "onPromotion":
        return items.filter((item) => item.promotion);
      case "moreThen1000":
        return items.filter((item) => {
          if (isNaN(item.salary)) {
            item.salary = +item.salary.slice(0, item.salary.length - 1);
          }
          return item.salary > 1000;
        });
      case "onIncrease":
        return items.filter((item) => item.increase);
      default:
        return items;
    }
  };

  const searchEmp = (items, term) => {
    if (term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.name.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  };

  const onChangeSalary = (id, e) => {
    setData(
      data.map((item) => {
        if (item.id === id) {
          item.salary = e.value;
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
