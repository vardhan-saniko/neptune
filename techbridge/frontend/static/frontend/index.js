// Hide some elements on document load
$(".section-2").hide();
$(".section-3").hide();
$("#submitButton").hide();
$("#section-2-form-2").hide();
//$("#section-2-form-3").hide();
//$("#section-2-form-4").hide();
$(".section-5").hide();
$(".contact-details").hide();
$("#addContact-2").hide();

// Hide dropdown buttons (i.e. Next Question buttons)
//$("#dropdown-2").hide();
//$("#dropdown-3").hide();
//$("#dropdown-4").hide();

// Next Section button for showing section 3
$(".button-for-sec3").hide();

// Show likert questions only if the user has had worked with TechBridge
$(".likert-questions").hide();

// Hide the feedback section initially
$(".section-4").hide();

// Used to keep track of number of contacts allowed to be added in section 2
// Each question has a cap of 10 contacts (initially 2 rows are displayed by default)
var contactCounts = [-1, 2, 2];

var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
});


/*
function updateTextInput(val, index) {
    $(".badge-" + index.toString()).text(val);
}
*/

function addContact(index) {

  if (contactCounts[index] < 10) {
    let row = "<div class='row'>" +
    "<div class='col-md-4'> " +
      "<input type='text' class='form-control' placeholder='Full Name'> " +
    "</div> " +
    "<div class='col-md-4'>" +
      "<input type='text' class='form-control' placeholder='Organization Affiliation, Department'>" +
    "</div>" +
     "<div class='col-md-4'> " +
          "<select id='inputState' class='form-control'>" +
            "<option selected>Choose Relationship Type...</option>" +
            "<option>I did not meet this person because of NW TechBridge</option>" +
            "<option>I met this person because of NW TechBridge</option>" +
          "</select>" +
      "</div>" +
    "</div>";

    $("#section-2-form-" + index.toString()).append(row);
  }

  contactCounts[index] += 1;
  if (contactCounts[index] > 9) {
    document.getElementById("addContact-" + index.toString()).disabled = true;
  }
}

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}
const csrftoken = getCookie('csrftoken');

$("#techBridge-question-yes").click(function() {
  $(".likert-questions").fadeIn();
  let target = $(".section-3");
  $('html, body').animate({
    scrollTop: ($(target).offset().top - 20)
  }, 300);
});

$("#techBridge-question-no").click(function() {
  $(".likert-questions").fadeOut();
});

$("#futurecontact-question-yes").click(function() {
  $(".contact-details").fadeIn();
});

$("#futurecontact-question-no").click(function() {
  $(".contact-details").hide();
});

// Used for showing the form (survey section)
function next(sectionId) {
  if (sectionId == 3) {
    $(".section-4").fadeIn();
    $(".section-5").fadeIn();
  }
  let target = $(".section-" + sectionId.toString());
  $(".section-" + sectionId.toString()).fadeIn();
  $('html, body').animate({
    scrollTop: ($(target).offset().top - 30)
  }, 500);
  $("#submitButton").fadeIn();
}

// Used to dropdown questions from section 2
function drop(formId) {
  if (formId === 2) {
    $(".button-for-sec3").fadeIn();
  } 
  $("#addContact-2").fadeIn();
  $("#section-2-form-" + formId.toString()).fadeIn();
  $("#dropdown-" + formId.toString()).fadeIn(); // dropdown button (next question)
}

$("#form").submit(function(e) {

    e.preventDefault(); // avoid to execute the actual submit of the form.

    if ($(".section-3").is(":hidden")) {
      alert("Please make sure to check section 3 of the survey before submitting.");
      return;
    }

    let data = {};
    data["survey_id"] = surveyId;

    // Fetch responses from section 1
    data["firstName"] = $("#firstName").val().trim();
    data["lastName"] = $("#lastName").val().trim();
    data["jobTitle"] = $("#jobTitle").val().trim();
    data["specialityAreas"] = $("#specialityAreas").val().trim();
    data["companyName"] = $("#companyName").val().trim();
    data["joiningDate"] = $("#joiningDate").val().trim();

    /*
    if (document.querySelector('input[name="techBridgeRadio"]:checked') === null) {
      data["techBridge"] = "null";
    }
    else {
      data["techBridge"] = document.querySelector('input[name="techBridgeRadio"]:checked').value;
    }
    */

    data["organizationRole"] = [];
    data["noOfPeople"] = $("#noOfPeople").val().trim();
    data["supervisors"] = $("#supervisors").val().trim();
    data["section2"] = {
      "q1": [],
      "q2": []
    };
    data["likertScales"] = new Array();

    // Fetch checkbox checked values. data["likertScales"] will be an empty list if no option is selected
    let checkedValues = $('input[type="checkbox"]:checked');
    for (var i = 0; i < checkedValues.length; i++) {
      data["organizationRole"].push(checkedValues[i].value);
    }

    // Fetch responses from section 2
    for (let formId = 1; formId <= 2; formId++) {
      let formElements =  document.getElementById("section-2-form-" + formId.toString());
      let l = 0;
      while (l < formElements.length) {
          //if (l == 2) { l += 1; continue; }
          let name = formElements[l].value.trim();
          let org = formElements[l + 1].value.trim();
          let relationship = formElements[l + 2].value.trim();
          if (relationship === "Choose Relationship Type...") { relationship = ""; }
          
          if (name == "" && org == "" && relationship == "") {
            l += 3;
            continue;
          }

          let packet = { "name": name, "org": org, "relationship": relationship };
          if (formId == 1) packet["contactFrequency"] = "high";
          if (formId == 2) packet["contactFrequency"] = "low";
          
          data["section2"]["q" + formId.toString()].push(packet);
          l += 3;
      }

    }

    if (!$(".section-3").is(":hidden")) {
      // Fetch the likert scale responses (section 3)
      if (document.querySelector('input[name="tb"]:checked') != null) {
        if (document.querySelector('input[name="tb"]:checked').value == "True") {
          for (let i = 1; i <= 13; i++) {
            if (document.querySelector('input[name="likert-'+ i.toString() + '"]:checked') === null) 
              data["likertScales"].push("null");
            else 
              data["likertScales"].push(document.querySelector('input[name="likert-'+ i.toString() + '"]:checked').value);
          }
        }
      }
    }

    // Fetch the feedback
    data["feedback"] = $("#feedback").val().trim();

    // Fetch contact details if available
    if (document.querySelector('input[name="futurecontact"]:checked') === null) {
      data["contact"] = "False";
    }
    else {
      data["contact"] = document.querySelector('input[name="futurecontact"]:checked').value;
    }

    data["phone"] = $("#contact-phone").val().trim();
    data["email"] = $("#contact-email").val().trim();

    $.ajax({
      type: 'POST',
      url: '/survey_page3',
      contentType: 'application/json',
      headers: {'X-CSRFToken': csrftoken},
      mode: 'same-origin',
      data: JSON.stringify(data), // access in body
      }).done(function () {
        console.log("aaaaa");
          window.location = "/thank_you";
      }).fail(function (msg) {
          return false;
      });

});


