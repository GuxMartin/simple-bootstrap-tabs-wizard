/**
 * Simple Bootstrap Tabs Wizard
 * Version: 0.1.0
 * Autor: gusma62@gmail.com
 */
$.fn.simpleWizard = function(params){
  var params = params || {};
  var target = $(this);
  var id = $(this).attr("id");
  var tagName = $(this).prop("tagName");
  var type = false;
  var contents;

  var config = {
    "nextText": params.nextText || "Next",
    "prevText": params.prevText || "Prev",
    "nextIcon": params.nextIcon || "&gt;",
    "prevIcon": params.prevIcon || "&lt;",
    "btnClass": params.btnClass || "btn-primary",
  };

  switch(tagName){
    case 'UL':
      if( $(target).hasClass("nav-tabs")){ type = "ul.nav-tabs"; }
      else if( $(target).hasClass("nav-pills")){ type = "ul.nav-pills"; }
    break;
    case 'DIV':
      type = "div";
    break;
  }

  if(! type){ return false; }

  switch (type) {
    case 'ul.nav-tabs':
    case 'ul.nav-pills':
      contents = $(this).next().find(".tab-pane");
    break;
    case 'div':
      contents = $(this).parent().next().find(".tab-pane");
    break;
    default: return; break;
  }

  $.each(contents, function(i){
    var html = '<div class="simpleWizard pt-4">';
    if(i != 0){
      html += '<button class="simpleWizard-btn btn '+config.btnClass+'" type="button" name="button">'+config.prevIcon+' '+config.prevText+'</button>';
    }
    if(i != contents.length -1){
      html += '<button class="simpleWizard-btn btn '+config.btnClass+' float-right" type="button" name="button">'+config.nextText+' '+config.nextIcon+'</button>';
    }
    html += '</div>';
    $(contents[i]).append(html);
  });

  var botones = $(contents).find(".simpleWizard-btn");
  // console.log(botones);

  $(botones).each(function(i){
    $(this).on("click", function(){
      var direction = $(this).hasClass('float-right') ? 'next' : 'prev';

      switch (type) {
        case 'ul.nav-tabs':
          var selected = $(target).find('li a.active');
          if( direction == 'next' ){
            $(selected).parent().next().find('a[data-toggle="tab"]').click();
          }
          else{
            $(selected).parent().prev().find('a[data-toggle="tab"]').click();
          }
        break;
        case 'ul.nav-pills':
          var selected = $(target).find('li a.active');
          if( direction == 'next' ){
            $(selected).parent().next().find('a[data-toggle="pill"]').click();
          }
          else{
            $(selected).parent().prev().find('a[data-toggle="pill"]').click();
          }
        break;
        case 'div':
          var selected = $(target).find('a.active');
          if( direction == 'next' ){
            $(selected).next().click();
          }
          else{
            $(selected).prev().click();
          }
        break;
      }// /switch

    });
  });

};// /simpleWizard
