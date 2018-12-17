// 进度条
$(document).ajaxStart(function(){
  NProgress.start();
})
$(document).ajaxStop(function(){
  NProgress.done();
})

//header栏操作
$(function(){
  $('.icon_left').click(function(){
    $('.lt_aside').toggleClass('hidemenu')
    $('.lt_header').toggleClass('hidemenu')
    $('.lt_main').toggleClass('hidemenu')
  })
})