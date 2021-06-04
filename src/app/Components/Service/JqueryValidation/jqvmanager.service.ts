import { Injectable } from '@angular/core';

declare var $: any;

@Injectable({
  providedIn: 'root'
})

export class JQVManagerService {

  //initialized array
  private inputFieldData: RequireFieldInterface[];
  private singleInputFieldData: RequireFieldInterface;
  private valuesToSet: SetValuesInterface[]

  constructor() {
    this.inputFieldData = [{ "componentName": null, "inputName": null, "checkVal": null }];
    this.valuesToSet = [{ "cmptId": null, "val": null }];
  }

  //show alert message
  public showAlertMessage(alertStyle, alertMessage, alertType, componentClassName): void {
    var alertMsg = '<div class="alert alert-' + alertStyle + '"><strong>' + alertType + '!' + ' ' + '</strong>' + alertMessage + '</div>';
    $('.' + componentClassName).html(alertMsg).show().delay(3000).fadeOut(2000);
  }
  public showUpdateAlertMessage(alertStyle, alertMessage, alertType, componentClassName): void {
    var alertMsg = '<div class="alert alert-' + alertStyle + '"><strong>' + alertType + '!' + ' ' + '</strong>' + alertMessage + '</div>';
    $('.' + componentClassName).html(alertMsg).show().delay(3000).fadeOut(2000);
  }
  public setValue(valueSet: SetValuesInterface[]): void {
    this.valuesToSet = valueSet;
    for (let i = 0; i < this.valuesToSet.length; i++) {
      $('#' + this.valuesToSet[i].cmptId).val(this.valuesToSet[i].val);
    }
  }

  public getValue(componentId: string): any {
    let value = $('#' + componentId).val();
    return value;
  }

  //clear one or more fileds, must pass string type array
  public clearFields(componentIDName: string[]): void {
    for (var i = 0; i < componentIDName.length; i++) {
      // $('#' + componentIDName[i]).val('');
      (<HTMLInputElement>document.getElementById(componentIDName[i])).value = '';
    }
  }

  //required field validator
  public requiredFieldValidated(fieldData: RequireFieldInterface[]): boolean {
    let isValid: boolean = true;
    this.removeAllErrorClasses();
    this.inputFieldData = fieldData;
    for (let i = 0; i < this.inputFieldData.length; i++) {
      if ((<HTMLInputElement>document.getElementById(this.inputFieldData[i].componentName)).value == this.inputFieldData[i].checkVal) {
        this.addErrorClasses(this.inputFieldData[i].componentName, this.inputFieldData[i].inputName);
        isValid = false;
      }
      else {
        this.removeErrorClasses(this.inputFieldData[i].componentName);
        $("#" + this.inputFieldData[i].componentName).closest('.form-group').addClass('has-success');
      }
    }
    return isValid;
  }

  //regex validation
  public regExpValidated(fieldData: RequireFieldInterface[]): boolean {

    let isValid: boolean = true;
    for (let i = 0; i < fieldData.length; i++) {
      if (!fieldData[i].regex.test((<HTMLInputElement>document.getElementById(fieldData[i].componentName)).value) && (<HTMLInputElement>document.getElementById(fieldData[i].componentName)).value != '') {
        this.addInvalidFormatClasses(fieldData[i].componentName, fieldData[i].inputName);
        isValid = false;
      }
    }
    return isValid;
  }

  //required field validator
  public singleRequiredFieldValidated(fieldData: RequireFieldInterface): boolean {
    let isValid: boolean = true;
    // this.removeAllErrorClasses();
    this.singleInputFieldData = fieldData;
    if ($('#' + this.singleInputFieldData.componentName).val() == this.singleInputFieldData.checkVal) {
      this.removeErrorClasses(this.singleInputFieldData.componentName);
      this.addErrorClasses(this.singleInputFieldData.componentName, this.singleInputFieldData.inputName);
      isValid = false;
    }
    else {
      this.removeErrorClasses(this.singleInputFieldData.componentName);
      $("#" + this.singleInputFieldData.componentName).closest('.form-group').addClass('has-success');
    }

    return isValid;
  }


  //load refreshed data table
  public loadFreshDataTable(componentId: string) {

    if ($.fn.DataTable.isDataTable('#' + componentId)) {
      $('#' + componentId).DataTable().destroy();
    }
    this.loadDataTable(componentId);
  }


  //load data table
  public loadDataTable(componentId: string): boolean {
    setTimeout(function () {
      $(function () {
        $('#' + componentId).DataTable();
      });
    }, 1);
    return true;
  }

  public loadSimpleDataTable(tableId: string): void {
    setTimeout(function () {
      $(function () {
        $('#' + tableId).DataTable({
          "paging": false,
          "ordering": false,
          "info": false,
          "searching": false
        });
      });
    }, 2000);
  }

  //load lookup table
  public loadLookupTable(tableId: string): void {
    setTimeout(function () {
      $(function () {
        $('#' + tableId).DataTable({
          "aLengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
          "iDisplayLength": 5
        });
      });
    }, 2000);
  }

  //show html content
  public showDataInHTML(componentClassName: string, data: any) {
    $('.' + componentClassName).html(data);
  }

  //set as focussed on selected text field
  public setFocus(componentIDName: string): void {
    $('#' + componentIDName).focus();
  }

  //remove all error classes in input fields
  public removeAllErrorClasses(): void {
    $(".text-danger").remove();
    $('.form-group').removeClass('has-error');
  }

  //remove all error classes in inputs that only selected
  public removeErrorClasses(componentName: string): void {
    $('#' + componentName).removeClass('text-danger');
    $('#' + componentName).removeClass('has-error');
  }

  //add error class for selected compnent/input
  public addErrorClasses(componentName: string, inputName: string): void {
    $("#" + componentName).after('<p class="text-danger">' + inputName + ' is required</p>');
    $("#" + componentName).closest('.form-group').addClass('has-error');
  }

  //remove all error and success classes from inputs and set as default look
  public setInputsAsDefault(): void {
    $('.form-group').removeClass('has-error');
    $('.form-group').removeClass('has-success');
    $('.text-danger').remove();
  }

  //set inputs as read only
  public setInputAsReadOnly(componentName: string): void {
    $('#' + componentName).prop('readonly', true);
  }

  //set input fields collection as disabled
  public disableInputFields(componentId: string[]): void {
    for (let i = 0; i < componentId.length; i++) {
      $('#' + componentId[i]).prop('disabled', true);
    }
  }

  //disable combo boxes, buttons etc....
  public disableComponents(componentId: string[]): void {
    for (let i = 0; i < componentId.length; i++) {
      $('#' + componentId[i]).prop('disabled', true);
    }
  }

  //set as checked for selected radio button
  public setRadioAsChecked(componentId: any): void {
    $('#' + componentId).prop("checked", true);
  }

  //settings for wizard menu...
  public setWizardSettings(): void {

    $(document).ready(function () {

      var navListItems = $('div.setup-panel div a'),
        allWells = $('.setup-content'),
        allNextBtn = $('.nextBtn');

      allWells.hide();

      navListItems.click(function (e) {
        e.preventDefault();
        var $target = $($(this).attr('href')),
          $item = $(this);

        if (!$item.hasClass('disabled')) {
          navListItems.removeClass('btn-success').addClass('btn-default');
          $item.addClass('btn-success');
          allWells.hide();
          $target.show();
          $target.find('input:eq(0)').focus();
        }
      });

      allNextBtn.click(function () {
        var curStep = $(this).closest(".setup-content"),
          curStepBtn = curStep.attr("id"),
          nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
          curInputs = curStep.find("input[type='text'],input[type='url']"),
          isValid = true;

        $(".form-group").removeClass("has-error");
        for (var i = 0; i < curInputs.length; i++) {
          if (!curInputs[i].validity.valid) {
            isValid = false;
            $(curInputs[i]).closest(".form-group").addClass("has-error");
          }
        }

        if (isValid) {
          nextStepWizard.removeAttr('disabled').trigger('click');
          nextStepWizard.addClass('btn-success')
        }
      });

      $('div.setup-panel div a.btn-success').trigger('click');
    });

  }

  //search on key-up : this method use to filter searched values in table or list or etc...
  public searchOnKeyUp(searchComponentId: string, parentElemetClass: string, childElement: string): void {

    $(function () {
      $('#' + searchComponentId).keyup(function () {

        var val = $(this).val().toLowerCase();

        $("." + parentElemetClass + " " + childElement).hide();

        $("." + parentElemetClass + " " + childElement).each(function () {

          var text = $(this).text().toLowerCase();

          if (text.indexOf(val) != -1) {

            $(this).show();
          }
        });
      });
    });

  }

  //show static modal dialog
  public showModalDialog(modalDialogId: string): void {
    $('#' + modalDialogId).modal({ backdrop: 'static', keyboard: false });
  }

  //show default modal dialog
  public showDefaultModalDialog(modalDialogId: string): void {
    $('#' + modalDialogId).modal('show');
  }

  //hide modal dialog
  public hideModalDialog(modalDialogId: string): any {
    return $('#' + modalDialogId).modal('hide');
  }

  //validate using regular expressions
  public regexValidated(fieldData: RequireFieldInterface[]): boolean {
    let isValid: boolean = true;
    // this.removeAllErrorClasses();
    this.inputFieldData = fieldData;
    for (let i = 0; i < this.inputFieldData.length; i++) {
      let value = (<HTMLInputElement>document.getElementById(this.inputFieldData[i].componentName)).value;
      let regex = new RegExp(this.inputFieldData[i].regex)
      if (!regex.test(value)) {
        this.addInvalidFormatClasses(this.inputFieldData[i].componentName, this.inputFieldData[i].inputName);
        isValid = false;
      }
      else {
        this.removeErrorClasses(this.inputFieldData[i].componentName);
        $("#" + this.inputFieldData[i].componentName).closest('.form-group').addClass('has-success');
      }
    }
    return isValid;
  }

  //add invalid format errors
  public addInvalidFormatClasses(componentName: string, inputName: string): void {
    $("#" + componentName).after('<p class="text-danger">' + inputName + ' is invalid</p>');
    $("#" + componentName).closest('.form-group').addClass('has-error');
  }
  public addAccountCodeClasses(componentName: string, inputName: string): void {
    $("#" + componentName).after('<p class="text-danger">' + inputName);
    $("#" + componentName).closest('.form-group').addClass('has-error');
  }

  public addBMDConfigClasses(componentName: string, inputName: string): void {
    this.removeAllErrorClasses();
    $("#" + componentName).after('<p class="text-danger">' + inputName + ' is invalid</p>');
    $("#" + componentName).closest('.form-group').addClass('has-error');
  }

  public removeModalBackdrop() {
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  }
  //get document title - ex: logistics One
  public getPrintName() {
    return document.title;
  }
  //set document title another string - ex: logistics One
  public setPrintName(titleVal) {
    document.title = titleVal;
  }
  /*print method 
    elem - printable div
    title - custome title for printable document when it saving 
    used components 
      1. draft-bl - DraftBlComponent 
  */
  printElement(elem, title = this.getPrintName()) {
    var tempTitle = this.getPrintName();
    this.setPrintName(title);
    var domClone = elem.cloneNode(true);
    var $printItem = document.createElement("div") as HTMLElement;
    $printItem.id = "print-div";
    document.body.style.visibility = 'hidden'
    document.body.appendChild($printItem);
    $printItem.appendChild(domClone);
    window.print();
    document.body.style.visibility = 'visible';
    $printItem.remove();
    this.setPrintName(tempTitle);
  }
}

//Interface for set require field set
export interface RequireFieldInterface {
  componentName: string;
  inputName: string;
  checkVal?: any;
  regex?: RegExp;
}

//Inteface for set values for inputs
export interface SetValuesInterface {
  cmptId: string;
  val: any;
}
