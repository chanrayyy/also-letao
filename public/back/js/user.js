
$(function () {
  // 每页几条
  var pageSize = 5
  // 当前页
  var currentPage = 1
  var currentId, isDelete
  render()
  function render() {

    $.ajax({
      type: 'get',
      url: '/user/queryUser',
      dataType: 'json',
      data: {
        page: currentPage,
        pageSize: pageSize,
      },
      success: function (res) {
        console.log(res);
        var htmlStr = template("tmp", res);
        $('tbody').html(htmlStr)
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: res.page,
          totalPages: Math.ceil(res.total / res.size),
          onPageClicked: function (a, b, c, page) {
            console.log(page);
            currentPage = page
            render()
          }
        })
      }
    })
  }


  $('tbody').on('click','.btn',function(){
    $('#userModal').modal('show')
    currentId = $(this).parent().data('id')
    console.log(currentId);
    isDelete = $(this).hasClass('btn-danger') ? 0 : 1
  })

  $('.btn_yes').click(function () {
    $.ajax({
      type: 'post',
      url: '/user/updateUser',
      dataType: 'json',
      data: {
        id: currentId,
        isDelete: isDelete
      },
      success: function (res) {
        console.log(res);
        $('#userModal').modal('hide')
        render()
      }
    })
  })
})