var luminateForms = (function($) {
  const form = jQuery("#luminate-form-" + php_vars['form_id']);
  const inputArr = form.find('input');
  const emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  function alertEmpties() {
    let formNotEmpty = true;

    inputArr.each(function() {
      let e = $(this);

      if (e.attr("id").indexOf("cons") !== -1) {
        let elemVal = e.attr("id").split("_");
        elemVal.shift();
        elemVal = elemVal.join(" ");

        if (
          e.val() === "" ||
          e.val().toLowerCase() === elemVal ||
          !validateField('name', e.val(), /[a-zA-Z]/) ||
          !validateField('email', e.val(), emailRe) ||
          !validateField('zip', e.val(), /(^\d{5}$)|(^\d{5}-\d{4}$)/)
        ) {
          formNotEmpty = false;
          e.addClass('form-field-empty');
        }

        function validateField(partialFieldName, formVal, re) {
          if (typeof formVal === "string") {
            formVal = formVal.toLowerCase();
          }

          if (elemVal.indexOf(partialFieldName) !== -1) {
            return re.test((formVal));
          } else {
            return true;
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

(function($) {
  function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
  }

  if ($('.luminate-forms').length) {
    var source = getURLParameter('src');
    var sub_source = getURLParameter('sub_src');

    if (source) {
      $('.luminate-forms #source').val(source);
    }

    if (sub_source) {
      $('.luminate-forms #sub-source').val(sub_source);
    }
  }

  // Display a flash message upon submit
    var flashSubmit = getURLParameter('submitted');
    if (flashSubmit) {
      flashMessage("Thank you for entering the We Will Not Be Tamed sweepstakes! Winners will be announced in November 2018");
    }

  function flashMessage(msgTxt) {
    const body = $("body");

    const message = $(`
    <div class="survey-flash">
    	<div tabindex="0">
    		<ul>
    			<li>${msgTxt}</li>
    		</ul>
    	</div>
    </div>
    `)

    message.hide().prependTo(body).delay(1000).slideDown(500).delay(6000).slideUp(500);
  }
})(jQuery);
