$(function () {
  var validator = $('#form').data('bootstrapValidator')
  $('#form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      username: {
        validators: {
          notEmpty: {
            message: '用户名不能为空'
          },
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度必须在2-6之间'
          },
          callback: {
            message: '用户名不存在'
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: '密码不能为空'
          },
          stringLength: {
            min: 6,
            max: 12,
            message: '密码长度必须在6-12之间'
          },
          callback: {
            message: '密码不正确'
          }
        }
      }
    }
  })
  $('.login').click(function () {
    $('#form').on('success.form.bv', function (e) {
      e.preventDefault();
      $.ajax({
        type: 'post',
        url: '/employee/employeeLogin',
        dataType: 'json',
        data: $('#form').serialize(),
        success: function (res) {
          if(res.error === 1000){
            $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback')
          }
          if(res.error === 1001){
            $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback')
          }
          if(res.success){
            location.href = 'index.html'
          }
        }
      })

    })
  })
  $('.reset').click(function(){
    validator.resetForm()
  })
})