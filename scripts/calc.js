/* eslint-env node */
$('#calculate').click(function(e){
    var button = $(this).attr("disabled", true);

    var data = {
        method: 'solve',
        params: {
            a:[[6,5],[6,2]],
            b:[1,2]
        },
        jsonrpc: '2.0',
        id: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        })
    };
    console.log('connecting...');
    // 通信実行
    $.ajax({
        type:"post",
        url:"http://jsonrpc-calculator.1stop-st.org",
        data:JSON.stringify(data),
        contentType: 'application/json', 
        dataType: "json",      
        success: function(json_data) {
            console.log(json_data);
        },
        error: function() {        
            console.log("Server Error.");
        },
        complete: function() {    
            button.attr("disabled", false); 
        }
    });
});