import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      day: "",
      month: "",
      year: "",
      gridContent: [
        [<h4></h4>, <h4></h4>, <h4></h4>],
        [<h4></h4>, <h4></h4>, <h4></h4>],
        [<h4></h4>, <h4></h4>, <h4></h4>],
      ],
      PythagridContent: [
        [<h4></h4>, <h4></h4>, <h4></h4>],
        [<h4></h4>, <h4></h4>, <h4></h4>],
        [<h4></h4>, <h4></h4>, <h4></h4>],
      ],
      vedic: [
        [<h4></h4>, <h4></h4>, <h4></h4>],
        [<h4></h4>, <h4></h4>, <h4></h4>],
        [<h4></h4>, <h4></h4>, <h4></h4>],
      ],
      personalityNumber: null,
      daySum: null,
      monthSum: null,
      yearSum: null,
      totalSum: null,
    };
  }

  handleDayChange = (event) => {
    const value = event.target.value.replace(/\D/g, "").slice(0, 2);
    this.setState({ day: value });
  };

  handleMonthChange = (event) => {
    const value = event.target.value.replace(/\D/g, "").slice(0, 2);
    this.setState({ month: value });
  };

  handleYearChange = (event) => {
    const value = event.target.value.replace(/\D/g, "").slice(0, 4);
    this.setState({ year: value });
  };

  calculateDigitSum = (number) => {
    return number
      .toString()
      .split("")
      .map(Number)
      .reduce((acc, curr) => acc + curr, 0);
  };

  displayDob = () => {
    const { day, month, year } = this.state;

    const daySum = this.calculateDigitSum(parseInt(day));
    const monthSum = this.calculateDigitSum(parseInt(month));
    const yearSum = this.calculateDigitSum(parseInt(year));
    let totalSum = daySum + monthSum + yearSum;

    let totalSumforgrid = totalSum; // Initialize totalSumforgrid with totalSum

    // Update totalSum and totalSumforgrid until totalSum is less than or equal to 9
    while (totalSum > 9) {
      totalSumforgrid = this.calculateDigitSum(totalSum);
      totalSum = totalSumforgrid; // Update totalSum for the next iteration
    }

    let number;
    let vedicNumbers;
    if (
      day == "01" ||
      day == "02" ||
      day == "03" ||
      day == "04" ||
      day == "05" ||
      day == "06" ||
      day == "06" ||
      day == "07" ||
      day == "08" ||
      day == "09" ||
      day == "10" ||
      day == "20" ||
      day == "30"
    ) {
      number = [...day, ...month, ...year, totalSumforgrid];
      vedicNumbers = [...day, ...month, ...year, totalSumforgrid];
    } else {
      number = [...day, ...month, ...year, totalSumforgrid, daySum];
      vedicNumbers = [...day, ...month, ...year, totalSumforgrid, daySum];
    }

    vedicNumbers.splice(4, 2);

    console.log(number, "numbers");
    console.log(vedicNumbers, "vedic numbers");
    // Count occurrences of each number
    const occurrences = number.reduce((acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {});

    const occurrences2 = vedicNumbers.reduce((acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {});

    const gridContent = [];
    const vedic = [];

    for (let i = 1; i <= 9; i++) {
      const repeatedNumbers = Array.from(
        { length: occurrences[i] || 0 },
        () => <h4>{i}</h4>
      );
      gridContent.push(repeatedNumbers);
    }

    for (let i = 1; i <= 9; i++) {
      const repeatedNumbers = Array.from(
        { length: occurrences2[i] || 0 },
        () => <h4>{i}</h4>
      );
      vedic.push(repeatedNumbers);
    }

    const data = {
      daySum: daySum,
      monthSum: monthSum,
      yearSum: yearSum,
      totalSum: totalSum,
      gridContent: [
        [gridContent[3], gridContent[8], gridContent[1]], // Row 1: 4, 5, 6
        [gridContent[2], gridContent[4], gridContent[6]], // Row 2: 1, 2, 3
        [gridContent[7], gridContent[0], gridContent[5]], // Row 3: 7, 8, 9
      ],
      PythagridContent: [
        [gridContent[2], gridContent[5], gridContent[8]], // Row 1: 3, 6, 9
        [gridContent[1], gridContent[4], gridContent[7]], // Row 2: 1, 2, 3
        [gridContent[0], gridContent[3], gridContent[6]], // Row 3: 7, 8, 9
      ],

      vedic: [
        [vedic[2], vedic[0], vedic[8]],
        [vedic[5], vedic[6], vedic[4]],
        [vedic[1], vedic[7], vedic[3]],
      ],
    };

    return this.normalizeYearSum(data);
  };

  normalizeYearSum = (data) => {
    let { yearSum, totalSum } = data;
    while (yearSum > 9) {
      yearSum = this.calculateDigitSum(yearSum);
    }
    while (totalSum > 9) {
      totalSum = this.calculateDigitSum(totalSum);
    }
    data.yearSum = yearSum;
    data.totalSum = totalSum;
    return data;
  };

  handleSubmit = () => {
    if (!this.state.day || !this.state.month || !this.state.year) {
      alert("Please Choose your Dob");
      return;
    }
    const dobData = this.displayDob();
    const personalityNumber = dobData.daySum;
    this.setState({
      personalityNumber,
      daySum: dobData.daySum,
      monthSum: dobData.monthSum,
      yearSum: dobData.yearSum,
      totalSum: dobData.totalSum,
      gridContent: dobData.gridContent,
      PythagridContent: dobData.PythagridContent,
      vedic: dobData.vedic,
    });
  };

  handlePrint = () => {
    if (!this.state.day || !this.state.month || !this.state.year) {
      alert("Please Choose your Dob");
      return;
    }
    const dobData = this.displayDob();
    const personalityNumber = dobData.daySum;
    this.setState(
      {
        personalityNumber,
        daySum: dobData.daySum,
        monthSum: dobData.monthSum,
        yearSum: dobData.yearSum,
        totalSum: dobData.totalSum,
        gridContent: dobData.gridContent,
        PythagridContent: dobData.PythagridContent,
        vedic: dobData.vedic,
      },
      () => {
        // Callback function to ensure state is updated before printing
        window.print();
      }
    );
  };

  render() {
    // Generating options for day
    const days = [];
    for (let i = 1; i <= 31; i++) {
      const dayValue = i < 10 ? `0${i}` : i;
      days.push(
        <option key={i} value={dayValue}>
          {dayValue}
        </option>
      );
    }

    // Generating options for month
    const months = [];
    for (let i = 1; i <= 12; i++) {
      const monthValue = i < 10 ? `0${i}` : i; // Add leading zero if less than 10
      months.push(
        <option key={i} value={monthValue}>
          {monthValue}
        </option>
      );
    }

    // Generating options for year
    const years = [];
    for (let i = 1900; i <= 3000; i++) {
      years.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }

    return (
      <>
        <div className="container">
          <h1>Rahul's Numerology</h1>
          <h1>Grid-Calculator</h1>
          <span className="demo">Choose your Dob: </span>
          <div className="mobile-selectors">
            <select
              className="date-input"
              onChange={this.handleDayChange}
              value={this.state.day}
            >
              <option value="">Day</option>
              {days}
            </select>
            <select
              className="date-input ms-1"
              onChange={this.handleMonthChange}
              value={this.state.month}
            >
              <option value="">Month</option>
              {months}
            </select>
            <select
              className="date-input ms-1"
              onChange={this.handleYearChange}
              value={this.state.year}
            >
              <option value="">Year</option>
              {years}
            </select>
          </div>
          <div className="default-field">
            <p>
              Personality Number :{" "}
              <strong>{this.state.personalityNumber}</strong>
              <br />
              Days Sum : <strong>{this.state.daySum}</strong>
              <br />
              Month Sum : <strong>{this.state.monthSum}</strong>
              <br />
              Year Sum : <strong>{this.state.yearSum}</strong>
              <br />
              Total Sum : <strong>{this.state.totalSum}</strong>
            </p>
          </div>
          <button className="btn btn-success ms-2" onClick={this.handleSubmit}>
            Submit
          </button>
          <button className="btn btn-primary ms-2" onClick={this.handlePrint}>
            Print
          </button>
          <div className="grid-container mt-2">
            <div className="grids">
              <h5>Lo Shu Grid</h5>
              {this.state.gridContent.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                  {row.map((cellContent, colIndex) => (
                    <div key={colIndex} className="cell">
                      {cellContent}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* </div> */}
            {/* <div className="grid-container mt-2"> */}
            <div className="grids">
              <h5>Vedic Grid</h5>
              {this.state.vedic.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                  {row.map((cellContent, colIndex) => (
                    <div key={colIndex} className="cell">
                      {cellContent}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* </div> */}
            {/* <div className="grid-container mt-2"> */}
            <div className="grids">
              <h5>Pythagorous Grid</h5>
              {this.state.PythagridContent.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                  {row.map((cellContent, colIndex) => (
                    <div key={colIndex} className="cell">
                      {cellContent}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* </div> */}
          <button
            type="button"
            className="btn btn-primary mt-4"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Show Some Support
          </button>

          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                  Show Some Support
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <p className="upi-id">
                    UPI ID:{" "}
                    <a href="upi://pay?pa=rahulmehandiratta815@oksbi">
                      rahulmehandiratta815@oksbi
                    </a>
                  </p>{" "}
                  <img  src="/scanner.jpeg" alt="Support Image"
                  style={{ maxWidth: "200px", maxHeight: "200px" }} />
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
