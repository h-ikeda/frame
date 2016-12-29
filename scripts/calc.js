/*eslint-env jquery, node*/
/*globals w2popup model THREE*/

function jsonrpc2_makeRequest(method, params){
    return {
        jsonrpc: '2.0',
        id: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c === 'x' ? r : r&0x3|0x8;
            return v.toString(16);
        }),
        method: method,
        params: params
    };
}

function jsonrpc2(url, requests, onSuccess, onError, onComplete){
    var req = {
        type:"post",
        url:url,
        data:JSON.stringify(requests),
        dataType: "json"
    };
    if (onSuccess !== void 0){
        req.success = onSuccess;
    }
    if (onError !== void 0){
        req.error = onError;
    }
    if (onComplete !== void 0){
        req.complete = onComplete;
    }
    $.ajax(req);
}

function rotateXmatrix(theta){
    //right-handed system, right-hand rule.
    return [
        [1,0,0],
        [0,Math.cos(theta),Math.sin(theta)],
        [0,-Math.sin(theta),Math.cos(theta)]
    ];
}

function rotateYmatrix(theta){
    //right-handed system, right-hand rule.
    return [
        [Math.cos(theta),0,-Math.sin(theta)],
        [0,1,0],
        [Math.sin(theta),0,Math.cos(theta)]
    ];
}

function rotateZmatrix(theta){
    //right-handed system, right-hand rule.
    return [
        [Math.cos(theta),Math.sin(theta),0],
        [-Math.sin(theta),Math.cos(theta),0],
        [0,0,1]
    ];
}

$('#calculate').click(/* @callback */ function(e){
    var button = $(this).attr("disabled", true);
    
    var K = [], P = [], t=[];
    model.nodes.forEach(function(rec){
        t.push([rec.recid, 'x'], [rec.recid, 'y'], [rec.recid, 'z']); //,[rec.recid,'rx'],[rec.recid,'ry'],[rec.recid,'rz']);
    });
    
    model.boundaries.forEach(function(rec){
        $.each(rec, function(key, value){
            if (key !== 'recid' && value === true){
                t.splice(t.indexOf(t.find(function(s){
                    return s[0] === rec.node && s[1] === key;
                })),1);
            }
        });
    });
    for (var i=0; i<t.length; ++i){
        K[i]=[];
        P[i]=0.0;
        for (var j=0; j<t.length; ++j){
            K[i][j] = 0.0;
        }
    }
    
    var requests = [];
    var u = [];
    
    model.lines.forEach(function(rec){
        var n1 = model.nodes.find(function(t){
            return rec.n1 === t.recid;
        });
        var n2 = model.nodes.find(function(t){
            return rec.n2 === t.recid;
        });
        var v = new THREE.Vector3(n2.x-n1.x, n2.y-n1.y, n2.z-n1.z);
        var localKz = rec.EA / v.length();
        var localK11=[
            [0,0,0],
            [0,0,0],
            [0,0,-localKz]
        ];
        
        var localK12=[
            [0,0,0],
            [0,0,0],
            [0,0,localKz]
        ];
        
        var localK21=[
            [0,0,0],
            [0,0,0],
            [0,0,localKz]
        ];
        
        var localK22=[
            [0,0,0],
            [0,0,0],
            [0,0,-localKz]
        ];
        
        var vv = new THREE.Vector3();
        vv.copy(v);
        vv=vv.projectOnPlane(new THREE.Vector3(0,1,0));
        
        var rY = rotateYmatrix(v.x === 0 && v.z === 0 ? 0 :(new THREE.Vector3(0,0,1)).angleTo(vv));
        var rX = rotateXmatrix(v.x === 0 && v.z === 0 ? (v.y > 0 ? Math.PI*0.5 : -Math.PI*0.5) :vv.angleTo(v));

        var invrY = rotateYmatrix(v.x === 0 && v.z === 0 ? 0 :-(new THREE.Vector3(0,0,1)).angleTo(vv));
        var invrX = rotateXmatrix(v.x === 0 && v.z === 0 ? (v.y < 0 ? Math.PI*0.5 : -Math.PI*0.5) :-vv.angleTo(v));

        var r;
        r=jsonrpc2_makeRequest('dot', {a:invrY, b:invrX, c:localK11, d:rX, e: rY});
        u.push([n1.recid, n1.recid, r.id]);
        requests.push(r);
        r=jsonrpc2_makeRequest('dot', {a:invrY, b:invrX, c:localK12, d:rX, e: rY});
        u.push([n1.recid, n2.recid, r.id]);
        requests.push(r);
        r=jsonrpc2_makeRequest('dot', {a:invrY, b:invrX, c:localK21, d:rX, e: rY});
        u.push([n2.recid, n1.recid, r.id]);
        requests.push(r);
        r=jsonrpc2_makeRequest('dot', {a:invrY, b:invrX, c:localK22, d:rX, e: rY});
        u.push([n2.recid, n2.recid, r.id]);
        requests.push(r);
    });
    
    jsonrpc2('http://jsonrpc-calculator.1stop-st.org', requests, function(json_data){

       json_data.forEach(function(res){
            var n = u.find(function(o){
                return o[2] === res.id;
            });
            var d = ['x', 'y', 'z'];
            for (var v = 0; v < 3; ++v){
                for (var m=0; m<3; ++m){
                    var r = t.indexOf(t.find(function(x){
                            return x[0] === n[0] && x[1] === d[v];
                        }));
                    var c = t.indexOf(t.find(function(x){
                            return x[0] === n[1] && x[1] === d[m];
                        }));
                    if (r > -1 && c > -1) {
                        K[r][c] += res.result[v][m];
                    }
                }
            }
        });
        
        
        
    var jsonRequest = jsonrpc2_makeRequest('solve', {a:K, b:P});
    
    jsonrpc2('http://jsonrpc-calculator.1stop-st.org', jsonRequest, function(json_data){
        w2popup.open({
            title   : 'Result',
            body    : 'Displacements:<br>' + json_data.result +'<br>'//+ json_data.error.message
        });
    }, function(){
            w2popup.open({
                title   : 'Result',
                body    : 'Server error.'
            });
    }, function(){
            button.attr("disabled", false);
    });
}, function(){
        w2popup.open({
            title :'Result',
            body : 'Server error.'
        });
        button.attr("disabled", false);
    });
});