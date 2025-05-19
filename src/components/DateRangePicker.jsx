import React, { useState } from "react";
import Button from "./Button";
import "./DateRangePicker.scss";

const DateRangePicker = ({ onFilter }) => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (start && end) {
      onFilter(start, end);
    }
  };

  return (
    <form className="date-range-picker" onSubmit={handleSubmit}>
      <div className="input-group">
        <label>Inizio</label>
        <input
          type="date"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          required
        />
      </div>

      <div className="input-group">
        <label>Fine</label>
        <input
          type="date"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          required
        />
      </div>

      <Button type="submit" variant="primary">Filtra</Button>
    </form>
  );
};

export default DateRangePicker;
