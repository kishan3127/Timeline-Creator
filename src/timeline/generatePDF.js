import jsPDF from "jspdf";
import "jspdf-autotable";
var moment = require("moment");

const generatePDF = (tickets, props) => {
  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = ["#", "Hours", "Description", "Completed on"];
  // define an empty array of rows
  const tableRows = [];

  // for each ticket pass all its data into an array
  tickets.forEach((ticket, index) => {
    const ticketData = [
      index + 1,
      ticket.hoursList,
      ticket.description && ticket.description === ""
        ? "-"
        : ticket.description,
      moment(ticket.datesAsPerHour).format("MMMM Do YYYY, h:mm:ss a")
    ];
    // push each tickcet's info into a row
    tableRows.push(ticketData);
  });

  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, {
    cellWidth: "wrap",

    startY: 20
  });
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left
  doc.text(
    props.numberOfDeveloper,
    props.workingHour,
    moment(props.selectedDate).format("MMMM Do YYYY, h:mm:ss a")
  );
  // we define the name of our PDF file.
  doc.save(`report_${dateStr}.pdf`);
};

export default generatePDF;
