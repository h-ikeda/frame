/*eslint-env browser, jquery*/
$('#model').w2tabs({
    name: 'model',
    active: 'tab_nodes',
    tabs: [
        {id: 'tab_nodes', caption: 'Nodes'},
        {id: 'tab_lines', caption: 'Line Elements'},
        {id: 'tab_boundaries', caption: 'Boundaries'},
        {id: 'tab_nodeLoads', caption: 'Loads at Nodes'}
    ],
    onClick: function(e){
        $('#'+ this.active.slice(4)).hide();
        $('#'+ e.target.slice(4)).show();
        w2ui[e.target.slice(4)].refresh();
    }
});

$('#nodes').w2grid({
    name: 'nodes',
    header: 'Nodes',
    show: {
        header: true,
        toolbar: true,
        footer: true,
        toolbarReload: false,
        toolbarAdd: true,
        toolbarDelete: true,
    },
    columns: [
        { field: 'recid', caption: 'ID', size: '10%', sortable: true, resizable: true },
        { field: 'x', caption: 'X', size: '30%', sortable: true, resizable: true, editable: { type: 'float'} },
        { field: 'y', caption: 'Y', size: '30%', sortable: true, resizable: true, editable: { type: 'float'} },
        { field: 'z', caption: 'Z', size: '30%', sortable: true, resizable: true, editable: { type: 'float'} }
    ],
    searches: [
        { field: 'x', caption: 'X', type: 'float' },
        { field: 'y', caption: 'Y', type: 'float' },
        { field: 'z', caption: 'Z', type: 'float' }
    ],
    records: model.nodes,
    selectType: 'cell',
    onAdd: function(e){
        var uniq = 0;
        this.records.forEach(function(rec){
            if (uniq <= rec['recid']) {
                uniq = rec['recid'] + 1;
            }
        });
        this.add({ recid: uniq, x:0.0, y:0.0, z:0.0 });
        model.nodes = this.records;
        update();
        render();
    },
    onChange: function(e){
        e.onComplete = function(){
            this.mergeChanges();
            model.nodes = this.records;
            update();
            render();
        };
    }
}).refresh();

$('#lines').w2grid({
    name: 'lines',
    header: 'Line elements',
    show: {
        header: true,
        toolbar: true,
        footer: true,
        toolbarReload: false,
        toolbarAdd: true,
        toolbarDelete: true,
    },
    columns: [
        { field: 'recid', caption: 'ID', size: '10%', sortable: true, resizable: true },
        { field: 'n1', caption: 'Node 1', size: '30%', sortable: true, resizable: true, editable: { type: 'int'} },
        { field: 'n2', caption: 'Node 2', size: '30%', sortable: true, resizable: true, editable: { type: 'int'} },
        { field: 'EA', caption: 'EA', size: '30%', sortable: true, resizable: true, editable: { type: 'float'} }
    ],
    searches: [
        { field: 'n1', caption: 'Node 1', type: 'int' },
        { field: 'n2', caption: 'Node 2', type: 'int' },
        { field: 'EA', caption: 'EA', type: 'float' }
    ],
    records: model.lines,
    selectType: 'cell',
    onAdd: function(e){
        var uniq = 0;
        this.records.forEach(function(rec){
            if (uniq <= rec['recid']) {
                uniq = rec['recid'] + 1;
            }
        });
        this.add({ recid: uniq, n1:0, n2:1, EA:1.0 });
        model.lines = this.records;
        update();
        render();
    },
    onChange: function(e){
        e.onComplete = function(){
            this.mergeChanges();
            model.lines = this.records;
            update();
            render();
        };
    }
}).refresh();

$('#boundaries').w2grid({
    name: 'boundaries',
    header: 'Boundaries',
    show: {
        header: true,
        toolbar: true,
        footer: true,
        toolbarReload: false,
        toolbarAdd: true,
        toolbarDelete: true,
    },
    columns: [
        { field: 'recid', caption: 'ID', size: '12.5%', sortable: true, resizable: true },
        { field: 'node', caption: 'Node', size: '12.5%', sortable: true, resizable: true, editable: { type: 'int'} },
        { field: 'x', caption: 'X', size: '12.5%', sortable: true, resizable: true, editable: { type: 'float'} },
        { field: 'y', caption: 'Y', size: '12.5%', sortable: true, resizable: true, editable: { type: 'float'} },
        { field: 'z', caption: 'Z', size: '12.5%', sortable: true, resizable: true, editable: { type: 'float'} },
        { field: 'rx', caption: 'RX', size: '12.5%', sortable: true, resizable: true, editable: { type: 'float'} },
        { field: 'ry', caption: 'RY', size: '12.5%', sortable: true, resizable: true, editable: { type: 'float'} },
        { field: 'rz', caption: 'RZ', size: '12.5%', sortable: true, resizable: true, editable: { type: 'float'} }
    ],
    searches: [
        { field: 'node', caption: 'Node', type: 'int' },
        { field: 'x', caption: 'X', type: 'float' },
        { field: 'y', caption: 'Y', type: 'float' },
        { field: 'z', caption: 'Z', type: 'float' },
        { field: 'rx', caption: 'RX', type: 'float' },
        { field: 'ry', caption: 'RY', type: 'float' },
        { field: 'rz', caption: 'RZ', type: 'float' }
    ],
    records: model.boundaries,
    selectType: 'cell',
    onAdd: function(e){
        var uniq = 0;
        this.records.forEach(function(rec){
            if (uniq <= rec['recid']) {
                uniq = rec['recid'] + 1;
            }
        });
        this.add({ recid: uniq, n1:0, n2:1, EA:1.0 });
        model.boundaries = this.records;
        update();
        render();
    },
    onChange: function(e){
        e.onComplete = function(){
            this.mergeChanges();
            model.boundaries = this.records;
            update();
            render();
        };
    }
}).refresh();

$('#nodeLoads').w2grid({
    name: 'nodeLoads',
    header: 'Loads at nodes',
    show: {
        header: true,
        toolbar: true,
        footer: true,
        toolbarReload: false,
        toolbarAdd: true,
        toolbarDelete: true,
    },
    columns: [
        { field: 'recid', caption: 'ID', size: '12.5%', sortable: true, resizable: true },
        { field: 'node', caption: 'Node', size: '12.5%', sortable: true, resizable: true, editable: { type: 'int'} },
        { field: 'x', caption: 'Px', size: '12.5%', sortable: true, resizable: true, editable: { type: 'float'} },
        { field: 'y', caption: 'Py', size: '12.5%', sortable: true, resizable: true, editable: { type: 'float'} },
        { field: 'z', caption: 'Pz', size: '12.5%', sortable: true, resizable: true, editable: { type: 'float'} },
        { field: 'rx', caption: 'Mx', size: '12.5%', sortable: true, resizable: true, editable: { type: 'float'} },
        { field: 'ry', caption: 'My', size: '12.5%', sortable: true, resizable: true, editable: { type: 'float'} },
        { field: 'rz', caption: 'Mz', size: '12.5%', sortable: true, resizable: true, editable: { type: 'float'} }
    ],
    searches: [
        { field: 'node', caption: 'Node', type: 'int' },
        { field: 'x', caption: 'Px', type: 'float' },
        { field: 'y', caption: 'Py', type: 'float' },
        { field: 'z', caption: 'Pz', type: 'float' },
        { field: 'rx', caption: 'Mx', type: 'float' },
        { field: 'ry', caption: 'My', type: 'float' },
        { field: 'rz', caption: 'Mz', type: 'float' }
    ],
    records: model.nodeLoads,
    selectType: 'cell',
    onAdd: function(e){
        var uniq = 0;
        this.records.forEach(function(rec){
            if (uniq <= rec['recid']) {
                uniq = rec['recid'] + 1;
            }
        });
        this.add({ recid: uniq, n1:0, n2:1, EA:1.0 });
        model.nodeLoads = this.records;
        update();
        render();
    },
    onChange: function(e){
        e.onComplete = function(){
            this.mergeChanges();
            model.nodeLoads = this.records;
            update();
            render();
        };
    }
}).refresh();