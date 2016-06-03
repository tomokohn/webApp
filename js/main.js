/**
 * Created by Tomer on 21/05/2016.
 */



// the object that receives all the data
    var dataObj = {
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
        input.change( function(){
            // check url in pair
            for (var i=1; i<=5; i+=2){
                if ($(input[i-1]).val() !== ('')) {
                    $(input[i]).prop('required',true);
                } else {
                    $(input[i]).prop('required',false).removeClass('must');

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
// empty validation

    var validEmptyForm = function(form){
        var input = $(form).find('input');
        var empty = 0;
        for (var i=0; i<=5; i++){
            if ($(input[i]).val() !== '') {
                empty = 1;
            }
        }
        if (empty === 1 ) {
            return true;
        } else {
            $(input[0]).addClass('must');
            return false;
        }
    }

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
        // refresh the localstorage json
        (function (){
            localStorage.clear();
            localStorage.setItem('dataObj', JSON.stringify(dataObj));
        })();
    }
    // pull from localstorage and apply to forms
    var dataOut = function (form) {
        var dataObjSto = JSON.parse(localStorage.getItem('dataObj')) || dataObj,
            input = $(form).find('input');
        if ($(form).attr('id') === 'quick-reports-form') {
            var place = 'quickReports';
        } else {
            var place = 'myTeamFolders';
        }

        for(var i=0;i<=4; i+=2){
            var data= $(input[i]).data('d');
             $(input[i]).val(dataObjSto[place].inputNames[data]);
        }
        for(var i=1;i<=5; i+=2){
            var data= $(input[i]).data('d');
             $(input[i]).val(dataObjSto[place].inputUrls[data]);
        }
    }

    // sets drop down selector
    var dropDown = function (report) {
        var select = $('<select>');
        for (var i=1; i<=3; i++){
            var repNum = report +'Report' +i+ 'Name',
                repNmUrl = dataObj[report].inputUrls[report +'Report' +i+ 'Url'],
                opt = $('<option>')
                    .attr('value',repNmUrl)
                    .append(dataObj[report].inputNames[repNum]);
            if (dataObj[report].inputNames[repNum] !== ''){
                $(select).append(opt);

        }
            // append to the current form
            if (report === 'quickReports'){
                $('#quick-reports').append(select);
                $('#quickSetting').attr('href',$(select).find('option').first().val());
            } else {
                $('#my-team-folders').append(select);
                $('#myTeamSeting').attr('href',$(select).find('option').first().val());
            }
        }


    }
    // handles the iFrame append and selection
    var ifSelect = function (report) {
        var iFrame = $('<iframe>');

        if (report === 'quickReports'){
            $(iFrame).attr('src',$('#quick-reports select option:first-child').val());
            $('#quick-reports').append(iFrame);
            $('select').change(function(){
                $(iFrame).attr('src',$(this).val());
                $('#quickSetting').attr('href',$(this).val());
            });
        } else {
            $(iFrame).attr('src',$('#my-team-folders select option:first-child').val());
            $('#my-team-folders').append(iFrame);
            $('select').change(function(){
                $(iFrame).attr('src',$(this).val());
                $('#myTeamSeting').attr('href',$(this).val());
            });
        }
    }
    // activate localstorage and validations
$( document ).ready(function() {
    dataOut($("#quick-reports-form"));
    dataOut($("#my-team-folders-form"));
    validForm('#quick-reports');
    validForm('#my-team-folders');
})

    //handle search from
    var search = function (info) {
     
    }

    // handle form submission
    $('form').submit(function(e) {
        e.preventDefault();
        if ($(e.target).hasClass('search-box')) {
            search($(e.target).find('input').val());
            return ;
        }
        if (validEmptyForm(e.target)) {
            $(e.target).find('input:nth-of-type(1)').removeClass('must');
            dataIn(e.target);
            $(e.target).parent().toggleClass('display-no');
            $(e.target).parent().parent().find('.settings-icons').toggleClass('display-no');
            dropDown($(e.target).data('d'));
            ifSelect($(e.target).data('d'));
        }
    } );

    // shows the form on settings click
    $('.settings-icon').click(function (e) {
        $(e.target).parent().parent().find('select').remove();
        $(e.target).parent().parent().find('iframe').remove();
        $(e.target).parent().toggleClass('display-no');
        $(e.target).parent().parent().find('.from-bg').toggleClass('display-no');

        });




