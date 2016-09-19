function getData(ajax_dt, callback){
  $.ajax({
    url:ajax_dt.url,
    method:ajax_dt.method,
    data:ajax_dt.data,
    dataType:"json",
    type:ajax_dt.method,
    success: function(data) {
      callback(data);
    }
  });
}

function generateData(type = 0, pointer = null, custom = null){
  var ajax = {};
  if(type == 0){
    ajax.url = pointer.attr("action");
    ajax.method = pointer.attr("method");
    ajax.data = pointer.serialize();
  } else {
    ajax.url = custom.url;
    ajax.method = custom.method;
    ajax.data = custom.data;
  }
  getData(ajax, function(result){
    var p = $("ul#result");
    p.empty();
    $.each(result, function(i, val){
      p.append(`<li>${val.text} | <a action="/" onclick="updateData('${val.id}', '${val.text}')">Edit</a> | <a action="/" onclick="deleteData(this, ${val.id})">remove</a></li>`);
    });
  });
}

function updateData(id, text){
  $("#frm-memo").attr("method", "put");
  $("#hdn-text-id").val(id);
  $("#txt-memo").val(text);
  $("#btn-submit").val("Update");
}

function deleteData(p, id){
  if(confirm("Are you sure you want to delete this?")){
      var ajax = {};
      ajax.url = $(p).attr("action");
      ajax.method = "delete";
      ajax.data = `text_id=${id}`;

      generateData(1, null, ajax);
  } else{
      return false;
  }
}

function initSubmit(){
  $("form").on("submit", function(event){
    event.preventDefault();
    generateData(0, $(this));
    $("#frm-memo").attr("method", "post");
    $("#hdn-text-id").val("");
    $("#txt-memo").val("");
    $("#btn-submit").val("Insert");
  });
}

$(function(){
  initSubmit();
});
