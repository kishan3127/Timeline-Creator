$("button.calculator-button").click(function () {
  var task = $(this).text().toLowerCase();
  switch (task) {
    case "calculate":
      var totalHour = 0;
      var totalMin = 0;
      $("#enter-time .widget-input").each(function () {
        var h = parseInt($(this).find("input:eq(0)").val(), 10);
        var m = parseInt($(this).find("input:eq(1)").val(), 10);
        if (!isNaN(h)) totalHour += h;
        if (!isNaN(m)) {
          totalMin += m;
          if (totalMin / 60 >= 1) {
            totalHour += Math.floor(totalMin / 60);
            totalMin = totalMin % 60;
          }
        }
      });
      $("#see-your-total input:eq(0)").val(
        (totalHour < 10 ? "0" : "") + totalHour
      );
      $("#see-your-total input:eq(1)").val(
        (totalMin < 10 ? "0" : "") + totalMin
      );

      totalHour += totalMin / 60;

      $("#total-pay-input").val(totalHour.toFixed(2));

      break;
    default:
      alert("not yet");
  }
});
