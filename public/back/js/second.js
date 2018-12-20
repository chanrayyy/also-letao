$(function () {
  var currentPage = 1
  var pageSize = 5
  render()
  function render() {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      dataType: 'json',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (res) {
        console.log(res);
        var htmlStr = template('tmp', res)
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

  $('.btn-add').click(function () {
    $('#addModal').modal('show')
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      dataType: 'json',
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (res) {
        console.log(res);
        var htmlStr = template('dropdown-tmp', res)
        $('.dropdown-menu').html(htmlStr)
      }
    })
  })

  $('.dropdown-menu').on('click', 'a', function () {
    var txt = $(this).text()
    $('#dropdown-text').html(txt)
    var id = $(this).data('id')
    $('.hidden-id').val(id)
    $('#form').data('bootstrapValidator').updateStatus('categoryId', 'VALID')

  })

  $("#fileupload").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      console.log(data);
      var result = data.result
      var picUrl = result.picAddr
      $('#imgBox img').attr('src', picUrl)
      $("[name='brandLogo']").val(picUrl)
      $('#form').data('bootstrapValidator').updateStatus('brandLogo', 'VALID')
    }
  })

  $('#form').bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: '请选择一级分类'
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: '分类名不能为空'
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: '请选择图片'
          }
        }
      }
    }
  })

  $('#form').on('success.form.bv', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'post',
      url: '/category/addSecondCategory',
      dataType: 'json',
      data: $('#form').serialize(),
      success: function (res) {
        console.log(res);
        if (res.success) {
          $('#addModal').modal('hide')
          currentPage = 1
          render()
          $('#form').data('bootstrapValidator').resetForm(true)
          $('#dropdown-text').html('请选择一级分类')
          $('#imgBox img').attr('src', 'images/none.png')
        }

      }
    })
  })
})