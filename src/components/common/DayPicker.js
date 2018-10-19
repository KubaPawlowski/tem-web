import React, { Component } from 'react';
import { time, sanitize } from '../../functions';
import EditableProp from './EditableProp';
import { IconButton } from '.';

class DayPicker extends Component {
  constructor(props) {
    super(props);
    const date = new Date();
    const pickedDay = (date.getDate()) < 10 ? `0${date.getDate()}` : date.getDate();
    const pickedMonth = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const pickedYear = date.getFullYear();
    this.state = {
      pickedDay,
      pickedYear,
      pickedMonth,
    };
  }

  onDateChange = (value, mode) => {
    const { pickedDay, pickedYear, pickedMonth } = this.state;
    const { onChange } = this.props;
    console.log(mode);
    const clean = sanitize.onlyNumeric(value);
    switch (mode) {
      case 'year':
        this.setState({
          pickedYear: clean,
        });
        return onChange(`${pickedYear}${pickedMonth}${pickedDay}`);
      case 'month':
        this.setState({
          pickedMonth: clean,
        });
        return onChange(`${pickedYear}${pickedMonth}${pickedDay}`);
      case 'day':
        this.setState({
          pickedDay: clean,
        });
        return onChange(`${pickedYear}${pickedMonth}${pickedDay}`);
      default:
        return null;
    }
    // more validation needed
  }

  onValidate = value => sanitize.onlyNumeric(value)

  changeDateClick(mode) {
    const add = mode === 'forward' ? 1 : -1;
    const { onChange } = this.props;
    const { pickedDay, pickedYear, pickedMonth } = this.state;

    const dateToChange = new Date(pickedYear, pickedMonth - 1, pickedDay);

    const newDate = new Date(dateToChange.setDate(dateToChange.getDate() + add));

    const pickedDate = time.getCurrentDate(newDate);
    const newPickedYear = pickedDate.slice(0, 4);
    const newPickedMonth = pickedDate.slice(4, 6);
    const newPickedDay = pickedDate.slice(6, 8);

    this.setState({
      pickedDay: newPickedDay,
      pickedMonth: newPickedMonth,
      pickedYear: newPickedYear,
    }, () => onChange(pickedDate));
  }

  render() {
    const { pickedDay, pickedYear, pickedMonth } = this.state;
    return (
      <div
        className="datePicker"
        style={{
          marginTop: 16,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <IconButton iconPath={require('../../assets/left-arrow_g.svg')} size={24} onPress={() => this.changeDateClick('back')} />
        <EditableProp onChange={this.onDateChange} mode="year" value={pickedYear} validation={this.onValidate} />
        <EditableProp onChange={this.onDateChange} mode="month" value={pickedMonth} validation={this.onValidate} />
        <EditableProp onChange={this.onDateChange} mode="day" value={pickedDay} validation={this.onValidate} />
        <IconButton iconPath={require('../../assets/right-arrow_g.svg')} size={24} onPress={() => this.changeDateClick('forward')} />
      </div>
    );
  }
}

export default DayPicker;
