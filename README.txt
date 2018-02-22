=== Plugin Name ===
Tags: luminate, email, signup, form
Requires at least: 3.0.1
Tested up to: 3.4
Stable tag: 4.3
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Plugin for connecting to Luminate Online Surveys

== Description ==

Use the plugin as a shortcode, passing the Luminate Survey ID as a string. If you want to just output an email sign-up only just add email_only=true to the shortcode. By default this value is set to false.

If a user tries to submit and something is wrong a class named ‘form-field-empty’ is added and an alert is triggered. The class and form are both unstyled by default.

### Shortcode Format
- [luminate-mailist form_id="*FORM ID*"]
- [luminate-mailist form_id="*FORM ID*" email_only=*true*]

### Default Classes
- luminate-form-*FORM ID*
- luminate-forms
- form-field-empty

### Note
If the form id of '2223' a Toyota Opt-in is added to the base form. This is obviously not the most maintainable way to add sections and could be improved
in later versions.
