const { create } = require("json-server");

// Your code here

// Function to create an employee record
function createEmployeeRecord(dataArray) { // Take an array as an input
    return {
        firstName: dataArray[0],
        familyName: dataArray[1],
        title: dataArray[2],
        payPerHour: dataArray[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

// const testEmployee = createEmployeeRecord(["Gray", "Worm", "Security", 1]); // Accept an array
// console.log(testEmployee.firstName); // Output: Gray

// Function to process an array of arrays into employee records
function createEmployeeRecords(dataArray) {
    return dataArray.map(createEmployeeRecord);
}

// Function to create a time in event
function createTimeInEvent(employeeRecord, dateTime) {
    if (!employeeRecord || !Array.isArray(employeeRecord.timeInEvents)) {
        throw new Error("Invalid");
    }

    const [date, hour] = dateTime.split(' ');

    // New event object
    const timeInEvent = {
        type: "TimeIn",
        date: date,
        hour: parseInt(hour, 10)
    };
    employeeRecord.timeInEvents.push(timeInEvent);
    return employeeRecord;
}

// Function to create a time out event
function createTimeOutEvent(employeeRecord, dateTime) {
    const [date, hour] = dateTime.split(' ');
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        date: date,
        hour: parseInt(hour, 10)
    });
    return employeeRecord;
}

// Function to calculate hours worked on a certain date
function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(e => e.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(e => e.date === date);
    return (timeOutEvent.hour - timeInEvent.hour) /100;
}

// Function to calculate wages earned on a specific date
function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return hoursWorked * employeeRecord.payPerHour;
}

// Function to collect all wages for an employee
function allWagesFor(employeeRecord) {
    if (!employeeRecord || !Array.isArray(employeeRecord.timeInEvents)) {
        throw new Error("Invalid or missing timeInEvents");
    }

    const datesWorked = employeeRecord.timeInEvents.map(e => e.date);

    return datesWorked.reduce((total, date) => {
        return total + wagesEarnedOnDate(employeeRecord, date);
    }, 0);
}

// Function to acucmulate the value of all dates worked by employee
function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, employeeRecord) => {
        return total + allWagesFor(employeeRecord);
    }, 0);
}
