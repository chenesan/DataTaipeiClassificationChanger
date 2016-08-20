
(function(){
  var data = {}
  chrome.runtime.sendMessage({'get': 'data'}, function(response) {
    data = JSON.parse(response)
    var keys = Object.keys(data)
    var items = document.getElementsByClassName('dataset-item');
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var category = item.querySelector('.dataset-list-category');
      var categoryTextElement = category.getElementsByTagName('a')[0];
      var heading = item.querySelector('.dataset-heading');
      var anchorElement = heading.children[0];
      var title = anchorElement.text;
      if (title in data && categoryTextElement.getElementsByTagName('span').length === 0) {
        var splitedCategoryText = categoryTextElement.innerHTML.split(' ');
        var oldCategory = splitedCategoryText[splitedCategoryText.length - 1];
        categoryTextElement.innerHTML = splitedCategoryText.slice(0, 3).join(' ');
        var oldText = document.createElement('span');
        oldText.style['text-decoration'] = 'line-through';
        categoryTextElement.appendChild(oldText);
        oldText.innerHTML = oldCategory;
        var newText = document.createElement('span');
        newText.style.color = 'red';
        categoryTextElement.appendChild(newText);
        newText.innerHTML = data[title];
      }
    }
  })
})()
