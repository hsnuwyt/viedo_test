var videoAreaStatic = false;
var videoEditArea = $('#video-edit-area');

$('#open-add-video-btn').click(function(){
  if (!videoAreaStatic) {
    videoEditArea.show();
    videoAreaStatic = true;
  } else {
    videoEditArea.hide();
    videoAreaStatic = false;
  }
});