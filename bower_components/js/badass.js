$(document).ready(function(){
    $(".glyphicon-remove-circle").click(function(){
        $(".leftnav").addClass("hide_menu");
        $(".glyphicon-dashboard").addClass("opacity_one");
    });
    $(".glyphicon-dashboard").click(function(){
        $(".leftnav").removeClass("hide_menu");
        $(".glyphicon-dashboard").removeClass("opacity_one");
    })
    
});