// 进度条
$(document).ajaxStart(function(){
  NProgress.start();
})
$(document).ajaxStop(function(){
  NProgress.done();
})

$(function(){
  //header栏操作
  $('.icon_left').click(function(){
    $('.lt_aside').toggleClass('hidemenu')
    $('.lt_header').toggleClass('hidemenu')
    $('.lt_main').toggleClass('hidemenu')
  })
  $('.icon_right').click(function(){
    $('#myModal').modal('show')
  })
  // aside栏操作
  $('.cate').click(function(){
    $('.child').stop().slideToggle()
  })
  // 点击退出
  $('.btn_q').click(function(){
    $.ajax({
      type: 'get',
      url: '/employee/employeeLogout',
      dataType: 'json',
      success: function(res){
        if(res.success){
          location.href = 'login.html'
        }
      }

    })
  })
})