
$.ajax({
  type: 'get',
  url: '/category/queryTopCategory',
  success: function(res){
    var htmlStr = template('tmp-left',res)
    $('.lt-main-left ul').html(htmlStr)
    renderById(res.rows[0].id)
    $('.lt-main-left li:first-child').addClass('current')
  }
})

// 二级联动
$('.lt-main-left ul').on('click','li',function(){
  $(this).addClass('current').siblings().removeClass('current')
  renderById($(this).data('id'))
})


function renderById( id){
  $.ajax({
    type: 'get',
    url: '/category/querySecondCategory',
    data: {
      id: id
    },
    success: function(res){
      var htmlStr = template('tmp-right',res)
      $('.lt-main-right ul').html(htmlStr)
    }
  })
}