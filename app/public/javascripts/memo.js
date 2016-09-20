
function createRow(obj){
  var $btnEdit = document.createElement('input')
  var $btnDelete = document.createElement('input')
  var tdId = document.createElement('td')
  var tdMemo = document.createElement('td')
  var tdAction = document.createElement('td')
  var row = document.createElement('tr')

  tdId.innerText = obj._id
  tdMemo.innerText = obj.name
  $btnEdit.type = 'button'
  $btnEdit.value = 'Edit'
  $btnEdit.id = obj._id
  $btnEdit.class = 'btnEdit'
  $btnDelete.type = 'button'
  $btnDelete.value = 'Delete'
  $btnDelete.id = obj._id
  $btnEdit.class = 'btnDelete'

  $btnEdit.onclick = function(){
  var myid = $(this).attr('id')
  var myurl = `/memos/${myid}/edit`
  var row = $(this).parent().parent()
  window.location.href = myurl
  }

  $btnDelete.onclick = function(){
  var myid = $(this).attr('id')
  var myurl = `/memos/${myid}/edit`
  var row = $(this).parent().parent()
  $.ajax({
  type:'POST',
  enctype:'application/x-www-form-urlencoded',
  url:myurl,
  data: {_method:'DELETE'}
  }).done(function(){
    row.remove()
  })
  }

  tdAction.appendChild($btnEdit)
  tdAction.appendChild($btnDelete)
  row.appendChild(tdId)
  row.appendChild(tdMemo)
  row.appendChild(tdAction)
  return row
}
