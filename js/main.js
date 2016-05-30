/**
 * Created by Tomer on 21/05/2016.
 */


(function(){
// the object that receives all the data
    var dataObj ={
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
    $('.tabs').first().css('background','lightgray');
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
        // empty validation
        function validEmpty () {
            var empty = 0;
            for (var i=0; i<=5; i++){
                if ($(input[i]).val() !== ('')) {
                    empty = 1;
                }
            }
                if (empty === 0 ){
                    $(input[0]).prop('required',true);
                }  else {
                    $(input).each(function(){
                        $(this).prop('required',false)
                    });
                }
        }
        validEmpty();
        input.keyup( function(){
            validEmpty();
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
    // add info to dataObj
    // @param1 from_name
    // @param2 dataObj key name
    var dataIn = function(form){
        var input = $(form).find('input');
        if ($(form).attr('id') === 'quick-reports-form') {
            var place = 'quickReports';
        } else {
            var place = 'myTeamFolders';
        }
        for(var i=0;i<=4; i+=2){
            var data= $(input[i]).data('d');
            dataObj[place].inputNames[data] = $(input[i]).val();
        }
        for(var i=1;i<=5; i+=2){
            var data= $(input[i]).data('d');
            dataObj[place].inputUrls[data] = $(input[i]).val();
        }
    }
    // sets drop down selector
    var dropDown = function (report) {
        var select = $('<select>')
            .css('margin','20px'),
            iFrame = $('<iframe>');
        for (var i=1; i<=3; i++){
            var repNum = report +'Report' +i+ 'Name',
                repNmUrl = report +'Report' +i+ 'Url',
                opt = $('<option>')
                    .attr('value',repNmUrl)
                    .append(dataObj[report].inputNames[repNum]);
            if (dataObj[report].inputNames[repNum] !== ''){
                $(select).append(opt);
            }
        $(iFrame).attr('src',dataObj[report].inputUrls[repNmUrl]);
        }
        // append to the current form
        if (report === 'quickReports'){
            $('#quick-reports').append(select);
            $('#quick-reports').append(iFrame);
        } else {
            $('#my-team-folders').append(select);
        }

    }

    // handles the iFrame append and selection



    // handle form submission
    $('form').submit(function(e) {
        console.log($(e.target).data('d'));
        dataIn(e.target);
        console.log(dataObj);
        e.preventDefault();
        $('.from-bg').toggleClass('display-no');
        $('.settings-icon').toggleClass('display-no');
        dropDown($(e.target).data('d'));
    } );

    // shows the form on settings click
    $('.settings-icon').click(function (e) {
        if ($('.from-bg').hasClass('display-no')) {
            $('select').remove();
            $('.from-bg').toggleClass('display-no');
            $('.settings-icon').toggleClass('display-no');
            console.log("setings");
        }

    });




})();