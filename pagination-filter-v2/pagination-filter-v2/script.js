// On load function
$(function() {
  // All the students
  const $students = $(".student-item");

  // Display page and list of students
  function showPage(pageNumber, studentList) {

    // Hide the students on the page
    studentList.hide();

    // Find the index of the students to show
    let $studentIndex = (pageNumber - 1) * 10;

    // Select and show 10 students, starting from $studentIndex
    studentList.slice($studentIndex, $studentIndex + 10).show();

  }

  // Create page links
  // Call showPage() to display list of students
  function appendPageLinks(studentList) {
    
  }

  // TEST:
  // showPage(1, $students);
});
