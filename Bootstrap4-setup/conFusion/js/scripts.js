        // Jquery code for the carousel button
        $(document).ready(function() {
            $('#mycarousel').carousel({ interval: 2000});
            // when carousel button is clicked, invoke function
            $('#carouselButton').click(function() {
                // if the current carousel button is pause, pause the carousel, change button to play
                if ($('#carouselButton').children('span').hasClass('fa-pause')){
                    $('#mycarousel').carousel('pause');
                    $('#carouselButton').children('span').removeClass('fa-pause');
                    $('#carouselButton').children('span').addClass('fa-play');
                }
                else{
                    $('#mycarousel').carousel('cycle');
                    $('#carouselButton').children('span').removeClass('fa-play');
                    $('#carouselButton').children('span').addClass('fa-pause');
                }
            });
 
            $('#reserveTable').click(function() {
                $('#reserveModal').modal('toggle')
            });

            $('#loginLink').click(function() {
                $('#loginModal').modal('toggle')
            });
        });