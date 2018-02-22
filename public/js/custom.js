var luminateForms = (function($) {
  const form = jQuery("#luminate-form-" + php_vars['form_id']);
  const inputArr = form.find('input');

  function alertEmpties() {
    let formNotEmpty = true;

    inputArr.each(function() {
      let e = $(this);

      if (e.attr("id").includes("cons")) {
        let elemVal = e.attr("id").split("_")
        elemVal.shift()
        elemVal = elemVal.join(" ");

        if (e.val() === "" || e.val().toLowerCase() === elemVal) {
          e.addClass('form-field-empty');
          formNotEmpty = false;
        }

        //test email field
        if (elemVal.includes('email')) {
          if (!validateEmail(e.val())) {
            formNotEmpty = false;
            e.addClass('form-field-empty');
          }
        }
        if (elemVal.includes('zip')) {
          re = /^\d+$/;
          if (!re.test((e.val()))) {
            formNotEmpty = false;
            e.addClass('form-field-empty');
          }
        }
        if (elemVal.includes('postal')) {
          re = /^\d+$/;
          if (!re.test((e.val()))) {
            formNotEmpty = false;
            e.addClass('form-field-empty');
          }
        }
      }
    });

    if (formNotEmpty === false) {
      alert("Form value fields missing or incorrect.");
      console.log("Invalid form submission");
    }

    return formNotEmpty;
  }

  function removeErrorClass() {
    form.find('input').removeClass('form-field-empty');
  }

  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email.toLowerCase());
  }

  return {
    currentForm: form,
    alertEmpties: alertEmpties,
    removeErrors: removeErrorClass
  }
})(jQuery)

luminateForms.currentForm.submit(function(e) {
  if (luminateForms.alertEmpties()) {
    return true;
  } else {
    e.preventDefault();
  }
});

luminateForms.currentForm.focus(function() {
  luminateForms.removeErrors();
});
