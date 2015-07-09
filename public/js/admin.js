$(function() {

  $(".del").click(function(e) {
    var target = $(e.target)
    var id = target.data("id")
    var tr = $(".item-id-" + id)

    $.ajax({
      type: "DELETE",
      url: '/admin/suggest?id=' + id,
    })
    .done(function(results) {
      if (results.success === 1) {
        if (tr.length >0) {
          tr.remove()
        };
      }
    })
  })



  $(".update").click(function(e) {
    var target = $(e.target)
    var catId = target.data("catid")
    var itemId = target.data("itemid")
    var tr = $(".item-id-" + itemId)
    var td = $("td.item-id-" + itemId)
    var stat = td.text().trim()
    if (stat == "尚未发送") {
      $.ajax({
        type: "PUT",
        url: '/admin/suggest/to?itemId=' + itemId + '&catId=' + catId 
      })
      .done(function(results) {
        if (results.success === 1) {
          td.text(results.toDepartment)
        }
      })     
    }
    else {
      alert("已发送")
    }
  })


})


