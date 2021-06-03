import { Injectable } from "@angular/core";
import { ToastrService, Toast } from "ngx-toastr";
import { HttpErrorResponse, HttpClient } from "@angular/common/http";
import { PostStatus } from "src/app/common-ui/PostStatus/post-status";
import { Action, ActionCls } from "../Interface/Action/action";
import { baseAppUrl } from "src/app/app-globals";

declare var $: any;

@Injectable({
  providedIn: "root"
})
export class JQManager {
  constructor(private toastr: ToastrService, private http: HttpClient) {
    this.toastrConfig();
  }

  //#region  Select2

  public select2() {
    $(".select2").select2();
  }

  //When Change Fire, This Return the select tag id and selected id,its call select2 function
  public select2_ChangeTrigger(passthis, selectTagId) {
    $(document).ready(function () {
      // Initialize Select2
      $(".select2").select2();

      // Set option selected onchange
      $(".select2").change(function () {
        passthis.select2($(this).attr("id"), this.value);
      });
    });
  }

  public select2_ManuallySelect(selectTagId, value) {
    $(document).ready(function () {
      $("#" + selectTagId).val(value);
      $("#" + selectTagId)
        .select2()
        .trigger("change");
    });
  }
  //#endregion

  //#region DataTable

  //Default DataTable
  public DataTable(TableId) {
    // $('#'+TableId).DataTable();
    setTimeout(function () {
      $(function () {
        $("#" + TableId).DataTable();
      });
    }, 200);
  }

  //DestroyDataTable
  public DataTableDestroy(TableId) {
    if ($.fn.DataTable.isDataTable("#" + TableId)) {
      $("#" + TableId)
        .DataTable()
        .clear()
        .destroy();
    }
  }



  // DataTable For nonPanging
  public DataTableNonPanging(TableId) {
    // $('#'+TableId).DataTable();
    setTimeout(function () {
      $(function () {
        $("#" + TableId).DataTable({
          scrollY: 500,
          "paging": false,
        });
      });
    }, 200);
  }

  //DestroyDataTable
  public DataTableNonPangingDestroy(TableId) {
    if ($.fn.DataTable.isDataTable("#" + TableId)) {
      $("#" + TableId)
        .DataTable()
        .clear()
        .destroy();
    }
  }

  //DataTable For Lookup
  public DataTableModel(TableId) {
    setTimeout(function () {
      $(function () {
        if (!$.fn.DataTable.isDataTable("#" + TableId)) {
          $("#" + TableId).DataTable({
            aLengthMenu: [
              [5, 10, 25, 50, -1],
              [5, 10, 25, 50, "All"]
            ],
            iDisplayLength: 5
          });
        }
      });
    }, 1000);
  }

  //#endregion

  //#region Modal

  //show default modal dialog
  public DefaultModalDialog(modalDialogId: string): void {
    $("#" + modalDialogId).modal();
  }
  public BackdropstaticModalDialog(modalDialogId: string): void {
    $("#" + modalDialogId).modal({ backdrop: 'static', keyboard: false });
  }

  //hide modal dialog
  public hideModalDialog(modalDialogId: string): any {
    return $("#" + modalDialogId).modal("hide");
  }

  //#endregion

  //#region Toastr Message

  private toastrConfig() {
    this.toastr.toastrConfig.toastComponent = Toast;
    this.toastr.toastrConfig.autoDismiss = true;
    this.toastr.toastrConfig.closeButton = true;
    this.toastr.toastrConfig.newestOnTop = true;
    this.toastr.toastrConfig.tapToDismiss = true;
    this.toastr.toastrConfig.progressBar = false;
  }

  public toastrSuccess(msg, title = "Successful!", displayTime: number = 2000) {
    this.toastr.success(msg, title, { timeOut: displayTime });
  }

  public toastrError(msg, title = "Error! ", displayTime: number = 3000) {
    this.toastr.error(msg, title, { timeOut: displayTime });
  }

  public toastrInfo(msg, title = "Information! ", displayTime: number = 3000) {
    this.toastr.info(msg, title, { timeOut: displayTime });
  }

  public toastrWarning(msg, title = "Warning! ", displayTime: number = 3000) {
    this.toastr.warning(msg, title, { timeOut: displayTime });
  }

  public toastrRemove(id) {
    this.toastr.remove(id);
  }

  public toastrClear() {
    this.toastr.clear();
  }

  //#endregion

  public ErrorResponse(respond: PostStatus, err: HttpErrorResponse) {
    console.log(err);
    respond.ErrorId = 3;
    respond.ErrorDescription = err.message;
    respond.ErrorClass = "alert-danger";
  }

  public actionHandler(actionValue): Action {
    var action = new ActionCls();
    switch (String(actionValue).toUpperCase()) {
      case "CREATE":
        action.actionIcon = "fas fa-plus-square";
        action.actionValue =
          actionValue.substring(0, 1) + actionValue.substring(1).toLowerCase();
        action.fildisabler = false;
        action.btnName = "Save";
        action.mainBtnIcon = "fas fa-save";
        break;
      case "VIEW":
        action.actionIcon = "far fa-eye";
        action.actionValue =
          actionValue.substring(0, 1) + actionValue.substring(1).toLowerCase();
        action.fildisabler = true;
        action.btnName = "Go To List";
        action.mainBtnIcon = "fas fa-arrow-alt-circle-left";
        break;
      case "UPDATE":
        action.actionIcon = "fas fa-edit";
        action.actionValue =
          actionValue.substring(0, 1) + actionValue.substring(1).toLowerCase();
        action.fildisabler = false;
        action.btnName = "Update";
        action.mainBtnIcon = "fas fa-pen-nib";
        break;
      default:
        break;
    }

    return action;
  }


  public inputMask() {
    $("[data-mask]").inputmask();
  }

  public timePicker(ID = 'timepicker') {
    $(document).ready(function () {
      $(function () {
        $("#" + ID).datetimepicker({
          format: "HH:mm"
        });
      });
    });
  }

  public DatePicker(ID) {
    $(document).ready(function () {
      $(function () {
        $("#" + ID).datetimepicker({
          format: "YYYY-MM-DD"
        });
      });
    });
  }




}
