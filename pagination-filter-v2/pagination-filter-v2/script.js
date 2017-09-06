// On load function
$(function() {
  // Selectors
  const $students = $(".student-item");
  const $search = $(".student-search");

  let $activePage = 1;

  // Add search box to the html file
  $search.html("<input placeholder='Search for students...'>"
  + "<button>Search</button>");

  // Event handler for clicking on "search"
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

    // HTML string to be added
    let $pageList = "";

    // Loop through and add all the pages to the $pageList HTML-string
    for (let i = 1; i <= $totPages; i++) {
      $pageList += "<li><a>" + i + "</a></li>";
    }

    // Add a <ul> tar and the $pageList string together..
    // .. and add it to the html file
    $pages.html("<ul>" + $pageList + "</ul>");

    // Add the new active page
    $("li", $pages)[$activePage].addClass("active");

    // Event handler when button/anchor-element is clicked
    $($pages).on("click", "a", function(e) {

      // Prevent default action from triggering
      e.preventDefault();

      // Removes the current active class
      $("li", $pages)[$activePage].removeClass("active");

      // change active page
      $activePage = e.target.innerHTML;

      // Shows the page that is clicked
      showPage($activePage, $students);
    });

  }

  function searchList() {
    // Hide previously shown students
    $students.hide();

    // Store the input as lower case to compare with the student names
    let $input = $("input", $search).val().toLowerCase();

    // Array containing matched students
    let $matched = $students.filter(function() {
      return $(".email", this).text().indexOf($input) >= 0;
    });

    /* for (let i = 0; i < $students.length; i++) {
        if ($(".email")[i].innerHTML.indexOf($input) >= 0) {
          $matched.push($students[i]);
        }
      } */
    if ($matched.length === 0) {
      $(".no-matches").html("<p>No students matched your search..</p>");
    }
    else {
      $(".no-matches").html("");
    }

    showPage(1, $matched);
    appendPageLinks($matched);
  }

  showPage(1, $students);
  appendPageLinks($students);
});
