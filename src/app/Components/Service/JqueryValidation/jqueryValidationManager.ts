import { OnInit } from '@angular/core';
declare var $ : any;

export class JqueryValidationManager implements OnInit {

  constructor() { }

  ngOnInit() {
  }
    
  removeAllErrorClasses(){
    $(".text-danger").remove();
    $('.form-group').removeClass('has-error');
  }
    
  removeErrorClasses(componentName : string){
    $('#' + componentName).removeClass('text-danger');
    $('#' + componentName).removeClass('has-error');
  }
    
  addErrorClasses(componentName : string, inputName : string){
    $("#" + componentName).after('<p class="text-danger">' + inputName + ' field is required</p>');
    $("#" + componentName).closest('.form-group').addClass('has-error');
  }

  setFocus(componentIDName : string){
    $('#' + componentIDName).focus();
  }

  showAlertMessage(alertStyle, alertMessage, alertType, componentClassName, delayTime, fadeOutTime ){
    var alertMsg = '<div class="alert alert-' +  alertStyle + '"><' + alertType + '>Error!</strong>' + alertMessage + '</div>';
    // return $('.' + componentClassName).html(alertMsg).show().delay(delayTime).fadeOut(fadeOutTime);
    return $('.' + componentClassName).html(alertMsg).show().delay(delayTime).fadeOut(fadeOutTime);
  }

  setNullValue(componentClassName){
    $('.' + componentClassName).val("");
  }

  setValue(componentClassName, value){
    $('.' + componentClassName).val(value);
  }

  checkIsNull(componentIDName){
    if($('#' + componentIDName).val() == ""){
      return true;
    }
    else{
      return false;
    }
  }

  

}

function setFocus(componentIDName : string){
  return $('#' + componentIDName).focus();
}
