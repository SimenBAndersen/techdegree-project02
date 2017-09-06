// On load function
$(function() {
  // Selectors
  const $students = $(".student-item");
  const $search = $(".student-search");

  // Add search box to the html file
  $search.html("<input placeholder='Search for students...'>"
  + "<button>Search</button>");

  // Event handler for clicking on the "search"-button
  $search.on('click', 'button', function() {
    searchList();
  });

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

    // Total number of pages to be shown
    let $totPages = Math.ceil(studentList.length / 10);

    // Select the page-number class
    let $pages = $(".pagination");

    // If only 1 page: leave the pagination class empty
    if ($totPages === 1) {
      $pages.html("");
      return;
    }

    // HTML string to be added
    let $pageList = "";

    // Loop through and add all the pages to the $pageList HTML-string
    for (let i = 1; i <= $totPages; i++) {
      $pageList += "<li><a>" + i + "</a></li>";
    }

    // Add a <ul> tar and the $pageList string together..
    // .. and add it to the html file
    $pages.html("<ul>" + $pageList + "</ul>");

    // Event handler when button/anchor-element is clicked
    $($pages).on("click", "a", function(e) {

      // Prevent default action from triggering
      e.preventDefault();

      // Shows the page that is clicked
      showPage(e.target.innerHTML, $students);
    });
  }

  // Take an input and see if it is part of a student name in the list
  function searchList() {
    // Hide previously shown students
    $students.hide();

    // Store the input as lower case to compare with the student names
    let $input = $("input", $search).val().toLowerCase();

    // Filter through the student emails
    // Returns the students that matches the input
    let $matched = $students.filter(function() {
      return $(".email", this).text().indexOf($input) >= 0;
    });

    // If no matches: Print message in the no-matches class
    if ($matched.length === 0) {
      $(".no-matches").html("<p>No student matched your search..</p>");
    }
    // Leave the no-matches class empty if there has been a match
    else {
      $(".no-matches").html("");
    }

    // Print the new first page with the matching students
    showPage(1, $matched);

    // Prints new page links
    appendPageLinks($matched);
  }

  // Prints the initial page and student list
  showPage(1, $students);

  // Prints the initial page links
  appendPageLinks($students);
});
