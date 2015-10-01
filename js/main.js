/*global $:false */
/* global L */
'use strict';


$(document).ready(function(){


var rotate = 0;
// startL('img/i1.gif');
startM('img/i1.gif');
// $( ".iconography-container-L").animate({ "left": "-=2500px" }, {easing: "linear",duration:100},  {complete: function() {
//       alert('done');
//   }
//     });


$(".learnmore").click(function() {
    jQuery.fx.interval = 13;
    $('html, body').animate({
        scrollTop: $(".horizontal-rule").offset().top
    }, 800);
});


if(isMobile()===false){

    $(window).scroll(function(){
        $(".streetscape_a img").css("opacity", Math.max(0, 250 - $(this).scrollTop())*0.004);
    });

}




// function startL(id) {
// jQuery.fx.interval = 150;
// var random = Math.ceil(Math.random() * 10).toString()

// $( ".iconography-container-L img").attr("src", id)   
// var moveby = $('.subheading').width() + 1620;
// $( ".iconography-container-L").css("left", "+="+moveby+"px");   

// $( ".iconography-container-L").animate({
//     left: "-=" + ($('.subheading').width() + 1620) +"px", 

//   }, {
//     duration: 3000,
//     easing: 'linear',
//     progress: function() {
//         rotate -=45;
//         $( this ).jqrotate(rotate);
//     },
//     complete: function(){
//         // alert("img/i"+random+".gif")
//          startL("img/i"+random+".gif"); 

         
//     }
//   });

// }


function startM(id) {
jQuery.fx.interval = 300;
var random = Math.ceil(Math.random() * 10).toString()

$( ".iconography-container-M img").attr("src", id);
// $( ".iconography-container-M").css("top", "0px")
$( ".iconography-container-M").animate({
    opacity: "1", 
  }, {
    duration: 1000,
    easing: 'linear',
    complete: function(){
         startM("img/i"+random+".gif"); 

         
    }
  });

}






    $(document).click(function(event) { 
        if(!$(event.target).closest('.arrow_box, .desc_box, .rsImg').length) {
            if($('.arrow_box, .desc_box').is(":visible")) {
                $('.arrow_box, .desc_box').hide()
            }
        }        
    })



    $('.arrow_box, .desc_box').hide()


    $(".royalSlider").royalSlider({
            // options go here
            // as an example, enable keyboard arrows nav
            imageScaleMode: 'fit', 
            // autoScaleSliderWidth: 968, 
            // autoScaleSliderHeight: 450, t
            keyboardNavEnabled: true,
            autoScaleSlider: true,
            transitionSpeed: 500,
            // autoHeight: true,
            // arrowsNavHideOnTouch: true,
            imageAlignCenter: false,
            slidesSpacing:20,
            navigateByClick: false,
            controlsInside: false,
            // loop:true,
            // loopRewind: true,
            startSlideId:1,

            visibleNearby: {
                enabled: true,
                centerArea: 0.3,
                center: false,
                breakpoint: 500,
                breakpointCenterArea: Modernizr.mq('only screen and (max-width: 768px)') ? 0.5 : 0.3,
                navigateByCenterClick: false
            }

        }); 


    var slider = $(".royalSlider").data('royalSlider');
    callResize();
    $("#desc0").show();


slider.ev.on('rsBeforeAnimStart', function(event) {
    // $('.arrow_box, .desc_box').hide()
    // $("#desc0").show();
});

slider.ev.on('rsAfterSlideChange', function(event) {
    var slideId = slider.currSlideId +2
    var book_width = ($("img#"+slideId).width() / 2) - 35
    var x_coord =parseInt($("#"+slideId).offset().left + book_width, 10)
    $('.arrow_box').css("left", x_coord + "px");
    $('.arrow_box, .desc_box').show()
    $("#desc0").hide();
    $("#desc"+slideId).show().siblings("div").hide();
});


slider.ev.on('rsSlideClick', function(event, originalEvent) {
    var slideId = event.target.currSlideId
    var id = originalEvent.target.id
    var position = parseInt(id, 10) - slideId
    var book_width = ($(originalEvent.target).width() / 2) - 35
    var x_coord =parseInt($(originalEvent.target).offset().left + book_width, 10)
    $('.arrow_box').css("left", x_coord + "px");
    $('.arrow_box, .desc_box').show()
    $("#desc0").hide();
    $("#desc"+id).show().siblings("div").hide();
 
});






$(window).resize(function() {
        // callResize to execute after window resize
        callResize();
    });


function callResize(){

     $('.arrow_box, .desc_box').hide()
     $("#desc0").show();

if (Modernizr.mq('only screen and (min-width: 991px)')) {   
        // start('img/i1.png');
    }



    if (Modernizr.mq('only screen and (min-width: 480px) and (max-width: 991px)')) {   

    }

    if (Modernizr.mq('only screen and (max-width: 480px)')) {
        slider.goTo(2) 
        slider.st.visibleNearby.breakpointCenterArea = 0.5;


        // $('.iconography-container-L').stop()
        
    }

    if (Modernizr.mq('only screen and (min-width: 768px) and (max-width: 991px)')) {
        slider.st.visibleNearby.breakpointCenterArea = 0.9;
        slider.goTo(1)        
        // $('.iconography-container-L').stop()
        
        
    }

    if (Modernizr.mq('only screen and (min-width: 992px)')) {
        slider.st.visibleNearby.breakpointCenterArea = 0.3;
        slider.goTo(1)
        
        
    }


};


function isMobile(){
    // if we want a more complete list use this: http://detectmobilebrowsers.com/
    // str.test() is more efficent than str.match()
    // remember str.test is case sensitive
    var isMobile = (/iphone|ipod|ipad|android|ie|playbook|silk|blackberry|fennec/).test
         (navigator.userAgent.toLowerCase());
    return isMobile;
}





// Make sure the spreadsheet is published!
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1WiUGQprXA98Bq_cO8O_tGs635AhWf79fqQip3IuxCfc/pubhtml'; 


// Let's get the popup template and compile it using Handlebars
var source   = $("#popup-template").html();
var template = Handlebars.compile(source);



var mapsheet = Mapsheet( { key: public_spreadsheet_url,
    element: "map",
    popupTemplate: "popup-template",
    provider: Mapsheet.Providers.Leaflet,
    markerLayer: new L.MarkerClusterGroup(),
    markerOptions: {
        iconUrl: 'img/pin.png',
            // shadowUrl: 'img/pin_shadow.png',

            // shadowSize:   [50, 64], // size of the shadow
            iconAnchor:   [20, 53], // point of the icon which will correspond to marker's location
            // shadowAnchor: [4, 62],  // the same for the shadow
            popupAnchor:  [0, -66] // point from which the popup should open relative to the iconAnchor
        },
        layerOptions: {
            tilePath: 'http://b.tile.stamen.com/toner/{z}/{x}/{y}.png',
            attribution: '<a href="http://opendefinition.org/"> <img src="http://assets.okfn.org/images/ok_buttons/od_80x15_blue.png" alt="This material is Open Data"></a>' +
            'Map data <a href="http://tacticalurbanismguide.com">tacticalurbanismguide.com</a> ' +
            'Imagery Â© <a href="http://mapbox.com">Mapbox</a>',

            filter: function () {
                new L.CSSFilter(this, {filters: ['contrast(20%)', 'sepia(20%)']}).render();
            }
        },
        mapOptions: {
            zoom: 2,
            center: [-26.4390743, 133.281323],
        },
        click: function(e, point) {
            mapsheet.map().panTo(point.marker.getLatLng());
            // mapsheet.map().setZoom(13);
            // mapsheet.map().setLatLng(e.latlng)
            // mapsheet.map().setContent("New urban tactic here? Tell us about it, <a href='mailto:hello@tacticalurbanismguide.com?Subject=Spotted%20an%20urban%20tactic!' target='_blank'> hello@tacticalurbanism.com</a>")
            // mapsheet.map().openOn(map);
        }
    } );








});