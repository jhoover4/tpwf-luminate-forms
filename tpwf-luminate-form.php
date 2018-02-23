<?php
/*
 * Plugin Name:       TPWF Luminate Forms
 * Version:           1.0.0
 * Plugin URI:        http://example.com/plugin-name-uri/
 * Description:       Puts simple Luminate Online forms in luminate with AJAX capabilities
 * Author:            Jordan hoover
 * Author URI:        tpwf.org
 * Text Domain:       tpwf-luminate-forms
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
  die;
}

function luminate_mailist_init()
{
  if( ! is_admin() )
  {
    // Required scripts
  }
}

luminate_mailist_init();

add_shortcode("luminate-mailist", "tpwf_luminate_form_mailist_handler");

function full_code_snippet($form_id){
  $html = '<form id="luminate-form-' . $form_id . '" class="luminate-forms" method="POST" action="https://secure2.convio.net/pwft/site/SSurvey">
    <p>
      <input type="hidden" name="cons_info_component" id="cons_info_component" value="t" />
      <input type="hidden" name="SURVEY_ID" id="SURVEY_ID" value="' . $form_id . '" />
      <input type="text" name="cons_first_name" id="cons_first_name" value="First Name" onfocus="if(this.value == \'First Name\'){this.value=\'\';}" onblur="if(this.value == \'\'){this.value=\'First Name\';}" size="12" maxlength="50" />
      <input type="text" name="cons_last_name" id="cons_last_name" value="Last Name" onfocus="if(this.value == \'Last Name\'){this.value=\'\';}" onblur="if(this.value == \'\'){this.value=\'Last Name\';}" size="12" maxlength="50" style="margin-left:5px" />
    </p>
    <p>
      <input type="text" name="cons_email" id="cons_email" value="Email Address" onfocus="if(this.value == \'Email Address\'){this.value=\'\';}" onblur="if(this.value == \'\'){this.value=\'Email Address\';}" size="26" maxlength="255" style="margin-top:4px;margin-bottom:4px;" />
    </p>
    <p>
      <input type="text" name="cons_zip_code" id="cons_zip_code" value="Zip Code" onfocus="if(this.value == \'Zip Code\'){this.value=\'\';}" onblur="if(this.value == \'\'){this.value=\'Zip Code\';}" size="12" maxlength="40" />';

    if ($form_id == '2223'){
      //this is to add 2223 Toyota opt-in, using a defunct 'postal opt-in' value in luminate

      $html .= '</p>
        <p>
        <input type="checkbox" name="cons_postal_opt_in" id="cons_postal_opt_in" checked/>
        <label for="cons_postal_opt_in">May a Toyota Dealer Contact You?</label>
        <input type="hidden" id="cons_postal_opt_in_requested" name="cons_postal_opt_in_requested" value="true">';
    }

      $html .= '<span style="display:none"><input type="text" name="denySubmit" id="denySubmit" value="" alt="This field is used to prevent form submission by scripts." />Please leave this field empty</span>
        <input type="submit" name="ACTION_SUBMIT_SURVEY_RESPONSE" id="ACTION_SUBMIT_SURVEY_RESPONSE" value="Submit" class="Button"/>
      </p>
      </form>';

  return $html;
}

function email_code_snippet($form_id){
  $html = '<form id="luminate-form-' . $form_id . '-email-only" class="luminate-forms"  method="POST" action="https://secure2.convio.net/pwft/site/SSurvey">
      <input type="hidden" name="cons_info_component" id="cons_info_component" value="t" />
      <input type="hidden" name="SURVEY_ID" id="SURVEY_ID" value="' . $form_id . '" />
      <input type="text" name="cons_email" id="cons_email" value="Email Address" onfocus="if(this.value == \'Email Address\'){this.value=\'\';}" onblur="if(this.value == \'\'){this.value=\'Email Address\';}" size="26" maxlength="255"/>
      <span style="display:none"><input type="text" name="denySubmit" id="denySubmit" value="" alt="This field is used to prevent form submission by scripts." />Please leave this field empty</span>
      <input type="submit" name="ACTION_SUBMIT_SURVEY_RESPONSE" id="ACTION_SUBMIT_SURVEY_RESPONSE" value="Submit" class="Button" />
  </form>';

  return $html;
}

$dataToJS = array(
  'form_id' => array()
);

function tpwf_luminate_form_mailist_handler( $atts ) {
  $a = shortcode_atts( array(
      'form_id' => '1000',
      'email_only' => false,
  ), $atts );

  $form_id = $a['form_id'];

  // this needs to be global so shortcodes don't overwrite each other
  global $dataToJS;

  array_push($dataToJS['form_id'], $form_id);

  // js to hijack form
  wp_enqueue_script( 'custom_js', plugin_dir_url( __FILE__ ) . 'public/js/custom.js', array( 'jquery' ), '', false);
  wp_localize_script( 'custom_js', 'php_vars', $dataToJS );

  if ($a['email_only']) {
    $html = email_code_snippet($form_id);
  } else {
    $html = full_code_snippet($form_id);
  }

  return $html;

}
