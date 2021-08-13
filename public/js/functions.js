$(function() {

  // ------------------------------------------------------
  // footer date 
  // ------------------------------------------------------
  var d = new Date();
  var month = addZero(d.getMonth()+1);
  var year = addZero(d.getFullYear());
  var monthYear = month + "/" + year; 
  
  $("#today").text(monthYear);

  // ------------------------------------------------------
  // delete questions
  // ------------------------------------------------------
  $(".removeQuestion").on('click', function(event){
    $("#questionId").val(this.value);
  });

  // ------------------------------------------------------
  // delete replies
  // ------------------------------------------------------
  $(".removeReply").on('click', function(event){
    $("#replyId").val(this.value);
  });

  // ------------------------------------------------------
  // delete confirm
  // ------------------------------------------------------
  $("#confirm").on('click', function(event){
    $("#deleteForm").submit();
  }); 

  // ------------------------------------------------------
  // valid form [add.ejs] [edit.ejs]
  // ------------------------------------------------------
  $("#btnConfirm").on('click', function(event){
    
    let title = $("#title");
    let description = $("#description");

    if (title.val() === '') {
      title.focus();
      return false;
    }

    if (description.val() === '') {
      description.focus();
      return false;
    }

  }); 

  $("#btnReply").on('click', function(event) {  
    
    let reply = $("#reply");

    if (reply.val() === '') {
      reply.focus();
      return false;
    }

  }); 

});

function addZero(i) {
  if (i < 10) {
      i = "0" + i;
  }
  return i;
}
