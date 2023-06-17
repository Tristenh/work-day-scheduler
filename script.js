
const saveBtn = $(".saveBtn");
const row = $(".row");
const description = $(".description");

// prints the current date
var today = dayjs();
$("#currentDay").text(today.format("dddd MMM, DD"));

// gets the targeted row id number
isCurrent();
function isCurrent() {
  row.each(function () {
    let row = $(this);
    let rowId = row.attr("id");
    let idNumber = parseInt(rowId.split("-")[1]);

    if (idNumber === dayjs().hour()) {
      $("#" + rowId)
        .removeClass("future")
        .toggleClass("present", true);
      row.find("textarea").val("present");
    } else if (idNumber < dayjs().hour()) {
      $("#" + rowId)
        .removeClass("future")
        .toggleClass("past", true);
      row.find("textarea").val("past");

      console.log("past");
    } else if (idNumber > dayjs().hour()) {
      $("#" + rowId)
        .removeClass("present past")
        .toggleClass("future", true);
      row.find("textarea").val("future");
    }
  });
}
// gets rowId and decription value saved to localStorage
saveBtn.on("click", function () {
  let rowId = $(this).closest(".row").attr("id");
  let idNumber = parseInt(rowId.split("-")[1]);
  console.log(idNumber);
  let descriptionValue = $(this).siblings(".description").val();
  console.log(descriptionValue);

  localStorage.setItem(rowId, descriptionValue);
  renderMessage();
});

// for each row gets the current rowId  retreives saved rowId and description value
function renderMessage() {
  row.each(function () {
    let rowId = $(this).attr("id");
    var storedDescription = localStorage.getItem(rowId);
    if (storedDescription !== null) {
      $(this).find(".description").val(storedDescription);
    }
  });
}
renderMessage();
