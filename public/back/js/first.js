$(function () {
  // 每页几条
  var pageSize = 3
  // 当前页
  var currentPage = 1
  render()
  function render() {
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      dataType: 'json',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (res) {
        var htmlStr = template('tmp', res)
        $('tbody').html(htmlStr)
        console.log(res);
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: res.page,
          totalPages: Math.ceil(res.total / res.size),
          onPageClicked: function (a, b, c, page) {
            currentPage = page
            render()
          }
        })
      }
    })
  }

  $('.btn-add').click(function () {
    $('#addModal').modal('show')
  })


  $('.add-cate').click(function(){
    $('#form').bootstrapValidator({
      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
      fields: {
        categoryName: {
          validators:{
            notEmpty: {
              message: '类名不能为空'
            }
          }
        }
      }
    })
    $('#form').on('success.form.bv',function(e){
      e.preventDefault()
      $.ajax({
        type: 'post',
        url: '/category/addTopCategory',
        dataType: 'json',
        data: $('#form').serialize(),
        success: function(res){
          $('#addModal').modal('hide')
          currentPage = 1
          render()
          $('#form').data('bootstrapValidator').resetForm(true)
        }

      })
    })
  })
})
