/**
 * Created by Tomer on 21/05/2016.
 */


(function(){
// the object that receives all the data
    var dataobj ={
        quickReports: {
            inputNames: {
                quickReportsReport1Name: "",
                quickReportsReport2Name: "",
                quickReportsReport3Name: ""
            },
            inputUrls: {
                quickReportsReport1Url: "",
                quickReportsReport2Url: "",
                quickReportsReport3Url: ""
            }
        },
        myTeamFolders: {
            inputNames: {
                myTeamFoldersReport1Name: "",
                myTeamFoldersReport2Name: "",
                myTeamFoldersReport3Name: ""
            },
            inputUrls: {
                myTeamFoldersReport1Url: "",
                myTeamFoldersReport2Url: "",
                myTeamFoldersReport3Url: ""
            }
        }
    };
    
// handle the active tab
    $('#quick-reports').show();
    $('.tabs').click(function(e){
        $('.work-box').hide();
        $('.tabs').css('background', 'gray');
        $(this).css('background','lightgray');
        $($(this).attr('href')).show();
        console.log($(this));
    })
    
// input validation function - add required to pair input
    var validForm = function (tab) {
       var input = $(tab).find('input');
        input.change( function(){
            // check url in pair
            for (var i=1; i<=5; i+=2){
                if ($(input[i-1]).val() !== ('')) {
                    $(input[i]).prop('required',true);
                } else {
                    $(input[i]).prop('required',false);
                }
            }
            //check name in pair
            for (var i=0; i<=4; i+=2){
                if ($(input[i+1]).val() !== ('')) {
                    $(input[i]).prop('required',true);
                } else {
                    $(input[i]).prop('required',false);
                }
            }
        });
    };

validForm('#quick-reports');
    
/*$('.submit').click(function (e) {
    e.preventDefault()
} )*/




})();