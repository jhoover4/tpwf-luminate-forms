let runLuminateForms = (function($) {
  const luminateForms = [];
  const key = 'pwft';

  addLuminateForms = () => {
    const formIds = [php_vars['form_id']];

     formIds.forEach(function(el) {
       let newForm = new LuminateForms(el)
       newForm.form;

       newForm.form.submit(function(e) {
         e.preventDefault();
         newForm.formSubmit();
       });

       newForm.form.focus(function() {
         newForm.removeErrorClass();
       });

       luminateForms.push(newForm);
     });
  }

  return {
    addForms: addLuminateForms,
    luminateForms: luminateForms
  };

})(jQuery);

runLuminateForms.addForms();

function LuminateForms(form_id){
  this.form = jQuery("#luminate-form-" + form_id);
  this.inputArr = this.form.find('input');
  this.formValues = this.findFormValues();

  this.findFormValues = () => {
      let formValues = {};

      this.inputArr.each(function(){
        if (e.attr("id").includes("cons")) {
          let e = jQuery(this);
          let elemVal = e.attr("id").split("_")
          elemVal.shift()
          elemVal = elemVal.join(" ");

          formValues[elemVal] = e.val();
        }
    });
      return formValues;
  }

  this.formSubmit = () => {
    console.log("Hijacking form submit...");

    const email = this.form.find('#cons_email').val();

    if (this.alertEmpties() === true) {
      this.ajaxRequest();
    }
  }

  this.alertEmpties = () => {
    let formNotEmpty = true;

    this.inputArr.each(function(){
      let e = jQuery(this);

      if (e.attr("id").includes("cons")) {
        let elemVal = e.attr("id").split("_")
        elemVal.shift()
        elemVal = elemVal.join(" ");

        if (e.val() === "" || e.val().toLowerCase() === elemVal) {
          e.addClass('form-field-empty');
          formNotEmpty = false;
        }
      }
    });

    if (formNotEmpty === false){
      alert("Form value fields missing");
    }

    return formNotEmpty;
  }

  this.removeErrorClass = () => {
      this.form.find('input').removeClass('form-field-empty');
  }

  this.ajaxRequest = () => {
      let requestUrl = 'https://secure2.convio.net/pwft/site/CRSurveyAPI?method=submitSurvey&v=1.0&api_key=' + key +
        '&survey_id=2184' +
        '&cons_email_opt_in=True';

      for (var key in this.formValues){
        requestUrl += "&cons_" + key + "=" + this.formValues[key];
      }

      jQuery.ajax({
        url: requestUrl,
        type: 'post',
        //data:$form.serialize(),
        success: function() {
          console.log("Form was submitted");
          this.form.html("<p>Thank you for your submission!</p>")
        }
      });
    }
}
