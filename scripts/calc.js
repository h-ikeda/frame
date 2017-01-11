/*eslint-env jquery*/
/*globals w2popup model*/

function parseResponse(response){
    var r = [];
    var d = response.result.displacements;
    for (p in d){
        r.push({recid:p, x:d[p].x, y:d[p].y, z:d[p].z});
    }
    return r;
}

$().w2grid(
    $.extend(gridOptions,{
        name: 'displacements',
        header: 'Displacements',
        show: {
            toolbar: true,
            footer: true,
            toolbarReload: false
        },
        columns: [
            { field: 'recid', caption: 'ID', size: '10%', sortable: true, resizable: true },
            { field: 'x', caption: 'dx', size: '30%', sortable: true, resizable: true },
            { field: 'y', caption: 'dy', size: '30%', sortable: true, resizable: true },
            { field: 'z', caption: 'dz', size: '30%', sortable: true, resizable: true }
        ],
        searches: [
            { field: 'x', caption: 'X', type: 'float' },
            { field: 'y', caption: 'Y', type: 'float' },
            { field: 'z', caption: 'Z', type: 'float' }
        ]
    })
);

$('#calculate').click(function(){
    var btn = $(this).attr("disabled", true);
    $.ajax({
        type:'post',
        url:'http://jsonrpc-calculator.1stop-st.org',
        data:JSON.stringify({
            jsonrpc: '2.0',
            id: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c === 'x' ? r : r&0x3|0x8;
                return v.toString(16);
            }),
            method: 'frame_calculate',
            params: [model]
        }),
        dataType: "json",
        contentType: false,
        success: function(response){
            w2ui['displacements'].records = parseResponse(response);
            w2popup.open({
                title:'Result',
                body:'<div id="popup_res" style="height:100%;width:100%"></div>',
                onOpen: function(e){
                    e.onComplete=function(){
                        $('#popup_res').w2render('displacements');
                        w2ui['displacements'].refresh();
                    }
                }
            });
        },
        error: function(){
            w2popup.open({
                title:'Error',
                body:'Server error.'
            });
        },
        complete: function(){
            btn.attr('disabled',false);
        }
    });
});
