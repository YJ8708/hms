Hms.teachers.answer = {
    init: function() {
        Hms.ViewPort = {
            layout: 'border',
            region: 'center',
            items: [
                    { region: 'north', layout: 'fit', height: '90', title: '答疑区' },
                    { region: 'center', layout: 'fit', items: [grid] },
                    { region: 'west', collapsible: true, layout: 'fit', width: '180', items: [cvw_tree] }
                   ]
        };
    },
};

cm: function(){
        return  [{ xtype: 'rownumberer' },
                 { header: '回答内容', dataIndex: 'answer',editor: 'textfield'},
                 { header: '创建时间', dataIndex: 'created_date' ,editor: 'textfield'},
                 { header: '老师', dataIndex: 'teachers_id',editor: 'combo' },
                 { header: '指定学生', dataIndex: 'students_id',editor: 'combo' }
        ]
},

//store.load({ params: { start: 0, limit: 30} });
store: function(){  
    return Ext.create ('Ext.data.Store',{ 

        proxy: {
                type: 'ajax',
                url: '/teachers/get_answer.json',
                reader: {
                    type: 'json',
                    root: 'answer',
                }
        },

            fields: ['answer', 'created_date', 'teachers_id', 'students_id'],
            autoLoad: true
    });
},

createNoticeGrid: function() { 

    return Ext.create ('Ext.grid.Panel',{ 
        id: 'noticeGrid',
        title: '公告',
        region: 'center',
        columns: this.cm(),
        store: this.store(),
        forceFit: true,
        tbar: this.gridTbar()
    });                  
},
grid: function(){ 
    return Ext.create('Ext.grid.Panel',{ 
        id:'answer',
        title:'答疑',
        region: 'center',
        columns: this.cm(),
        store:this.storea(),
        forceFit:true,
    })
} 

gridTbar: function(){ 
    return Ext.create('Ext.toolbar.Toolbar',{ 
             defaults: { 
                 scope: this
             },
             items: [{ 
                 text: '已读',
                 handler: function(){ this.rAnswer("已答").show()}
             },{ 
                 text: '未答',
                 handler: function(){ this.unAnswer()}
             }]
    })
},

//grid : new Ext.grid.GridPanel({
//    tbar: new Ext.Toolbar(['-', {
//        text: '日报表查询',
//        handler: function() {
//            dailySheetWindow.show();
//        }
//    },'-',{
//        text: '月报表查询',
//        handler: function() {
//            mouthSheetWindow.show();
//        }
//    },'-',{
//        text: '日发货查询',
//        handler: function() {
//            dailyDispatchWindow.show();
//        }
//    },'-',{
//        text: '月发货查询',
//        handler: function() {
//            mouthDispatchWindow.show();
//        }
//    }, '-']),
//    bbar: new Ext.PagingToolbar({
//        pageSize: 30,
//        store: store,
//        displayInfo: true,
//        displayMsg: "显示第{0}条到{1}条记录，一共{2}条",
//        emptyMsg: "没有记录"
//    })
//});
//store.load();


var virtualwarehouseenquiry2contextmenu = new Ext.menu.Menu({
    id: 'theContextMenu',
    items: [{ text: '查看详情', handler: function(){ } }]
});

grid.on("rowcontextmenu", function(grid, rowIndex, e) {
    e.preventDefault();
    grid.getSelectionModel().selectRow(rowIndex);
    virtualwarehouseenquiry2contextmenu.showAt(e.getXY());
});

var treeStore = new Ext.data.JsonStore({
    url: '/managements/get_tree_node.json',
    fields: ['id', 'factory_order_id', 'production_date'],
    root: 'tree_node',
    autoLoad: true
});

var root = new Ext.tree.AsyncTreeNode({
    id: "cvwRoot",
    text: "全部合同",
    expandable: true,   //节点的“+”或“-”一直显示
    children: []
});

var jing_year_nodes = [];

var cvw_tree = new Ext.tree.TreePanel({
    root: root
});

cvw_tree.on("expandnode", function(node) { //树的展开时执行的事件
    var myDate = new Date();
    var month_nodes = [];
    var contract_nodes = [];
    var record = [];
    var txt = [];
    for (m = 0; m < treeStore.getCount(); m++) {
        record[m] = treeStore.getAt(m);
    }
    if (node.id == "cvwRoot") {
        for (i = myDate.getFullYear(); i >= 2010 ; i--) {
            jing_year_nodes[i] = new Ext.tree.TreeNode({
                text: i,
                id: "node" + i
            });
            root.appendChild(jing_year_nodes[i]);

            if (i == myDate.getFullYear()) {
                for (j = myDate.getMonth() + 1; j >= 1 ; j--) {
                    if (j > 9) {
                        month_nodes[j] = new Ext.tree.TreeNode({
                            text: j + "月",
                            id: "node" + i + j
                        });
                        jing_year_nodes[i].appendChild(month_nodes[j]);

                        for (k = 0; k < treeStore.getCount(); k++) {
                            var month_data = i + "-" + j;
                            if (record[k].get('production_date').substring(0, 7) == month_data) {
                                contract_nodes[k] = new Ext.tree.TreeNode({
                                    text: record[k].get('factory_order_id'),
                                    id: "node" + i + j + record[k].get('id')
                                });
                                month_nodes[j].appendChild(contract_nodes[k]);
                            }
                        }
                    } else {
                        month_nodes[j] = new Ext.tree.TreeNode({
                            text: j + "月",
                            id: "node" + i + "0" + j
                        });
                        jing_year_nodes[i].appendChild(month_nodes[j]);
                        var x = 0;
                        var myNode = [];

                        for (k = 0; k < treeStore.getCount(); k++) {
                            var month_data = i + "-0" + j;
                            if (record[k].get('production_date').substring(0, 7) == month_data) { //按月份进行分类
                                contract_nodes[k] = new Ext.tree.TreeNode({
                                    text: record[k].get('factory_order_id'),
                                    id: "node" + i + "0" + j + record[k].get('id')
                                });
                                month_nodes[j].appendChild(contract_nodes[k]);
                            }
                        }
                    }
                }
            } else {
                for (j = 12; j > 0; j--) {
                    if (j > 9) {
                        month_nodes[j] = new Ext.tree.TreeNode({
                            text: j + "月",
                            id: "node" + i + j
                        });
                        jing_year_nodes[i].appendChild(month_nodes[j]);

                        for (k = 0; k < treeStore.getCount(); k++) {
                            var month_data = i + "-" + j;
                            if (record[k].get('production_date').substring(0, 7) == month_data) {
                                contract_nodes[k] = new Ext.tree.TreeNode({
                                    text: record[k].get('factory_order_id'),
                                    id: "node" + i + j + record[k].get('id')
                                });
                                month_nodes[j].appendChild(contract_nodes[k]);
                            }
                        }
                    } else {
                        month_nodes[j] = new Ext.tree.TreeNode({
                            text: j + "月",
                            id: "node" + i + "0" + j
                        });
                        jing_year_nodes[i].appendChild(month_nodes[j]);
                        var x = 0;
                        var myNode = [];

                        for (k = 0; k < treeStore.getCount(); k++) {
                            var month_data = i + "-0" + j;
                            if (record[k].get('production_date').substring(0, 7) == month_data) { //按月份进行分类
                                contract_nodes[k] = new Ext.tree.TreeNode({
                                    text: record[k].get('factory_order_id'),
                                    id: "node" + i + "0" + j + record[k].get('id')
                                });
                                month_nodes[j].appendChild(contract_nodes[k]);
                            }
                        }
                    }
                }
            }
        }
    }
});

cvw_tree.on("collapsenode", function(node) { //树的闭合事件
    if (node.id == "cvwRoot") {
        var myDate = new Date();
        for (i = 2010; i <= myDate.getFullYear(); i++) {
            jing_year_nodes[i].remove()
        };
    }
    store.removeAll();
});

cvw_tree.on("click", function(node) {
    var i = node.id.substring(4, 8);
    var j = node.id.substring(8, 10);
    var record = {};
    var contract = node.id.substring(10, node.id.length); //根据id提取合同的名字
    var date = i + "-" + j;
    record = {
        contract: contract,
        date: date
    };

    if (node.id.length > 10) {
        store.proxy = new Ext.data.HttpProxy({
            url: "/managements/get_contract.json",
            method: "post",
            jsonData: { record: record },
        });
        store.load({ params: { start: 0, limit: 30 } });
    }
});


