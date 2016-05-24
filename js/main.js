/**
 * Created by Tomer on 21/05/2016.
 */


(function(){
// handle the active tab
    $('#quick-reports').show();
    $('.tabs').click(function(e){
        $('.work-box').hide();
        $('.tabs').css('background', 'gray');
        $(this).css('background','lightgray');
        $($(this).attr('href')).show();
        console.log($(this));
    })
    // the object that receives all the data
    var dataobj ={
    quickReports: {
        inputNames: {
            quickReportsReport1Name: "",
                quickReportsReport2Name: "",
                quickReportsReport3Name: "",
                myTeamFoldersReport1Name: "",
                myTeamFoldersReport2Name: "",
                myTeamFoldersReport3Name: ""
        }
    },
    myTeamFolders: {
        inputUrls: {
            quickReportsReport1Url: "",
                quickReportsReport2Url: "",
                quickReportsReport3Url: "",
                myTeamFoldersReport1Url: "",
                myTeamFoldersReport2Url: "",
                myTeamFoldersReport3Url: ""
        }
    }
}
    //var dataObj = {quickReports:






})();