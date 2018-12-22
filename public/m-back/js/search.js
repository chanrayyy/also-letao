
render()
function getHistory() {
  var arr = JSON.parse(localStorage.getItem('search-list') || '[]')
  return arr
}
function render() {
  var arr = getHistory()
  var htmlStr = template('tmp', { arr: arr })
  $('.lt-history').html(htmlStr)
}
$('.lt-history').on('click', '.btn-deleteAll', function () {
  mui.confirm('确认删除所有吗', '温馨提示', ['取消', '确认'], function (e) {
    if (e.index == 1) {
      localStorage.removeItem('search-list')
      render()
    }
  })
})
$('.lt-history').on('click', '.btn-delete', function () {
  mui.confirm('确认删除吗', '温馨提示', ['取消', '确认'], function (e) {
    if (e.index == 1) {
      console.log(111);
      var index = $('.btn-delete').data('index')
      var arr = getHistory()
      arr.splice(index, 1)
      localStorage.setItem('search-list', JSON.stringify(arr))
      render()
    }
  })
})
$('.search-btn').click(function () {
  // 获取输入的搜索内容
  var key = $('.search-input').val().trim();
  if (key === '') {
    return
  }
  // 获取数组
  var arr = getHistory()
  // 获取数组中的重复项 进行判断并删除
  var index = arr.indexOf(key)
  if (index !== -1) {
    arr.splice(index, 1)
  }
  if (arr.length > 10) {
    arr.pop()
  }
  arr.unshift(key)
  localStorage.setItem('search-list', JSON.stringify(arr))
  render()
  $('.search-input').val('')
  location.href = ''
})
