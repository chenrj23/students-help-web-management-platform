$(function() {
  $(".del").click(function(e) {
    var target = $(e.target)
    var id = target.data("id")
    var tr = $(".item-id-" + id)

    $.ajax({
      type: "DELETE",
      url: '/admin/department?id=' + id,
    })
    .done(function(results) {
      if (results.success === 1) {
        if (tr.length >0) {
          tr.remove()
        };
      }
    })
  })
})



$(function() {
  $(".comment").click(function(e) {
    var target = $(this)
    var toId = target.data("tid")
    var suggestId = target.data("sid")

    if($("#toId").length > 0){
      $("#toId").val(toId)
    }
    else{
      $('<input>').attr({
        type: "hidden",
        id: "toId",
        name: 'comment[tid]',
        value: toId
      }).appendTo('#commentForm')
    }    


    if($("#suggestId").length > 0){
      $("#suggestId").val(suggestId)
    }
    else{
      $('<input>').attr({
        type: "hidden",
        id: "suggestId",
        name: 'sid',
        value: suggestId
      }).appendTo('#commentForm')
    }

    // if($("#commentId").length > 0){
    //   $("#commentId").val(commentId)
    // }
    // else{
    //   $('<input>').attr({
    //     type: "hidden",
    //     id: "commentId",
    //     name: 'comment[cid]',
    //     value: commentId
    //   }).appendTo('#commentForm')
    //     }    
  })
})