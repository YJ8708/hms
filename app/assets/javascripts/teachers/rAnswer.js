Ext.onReady(function(){
    var cm = new Ext.grid.ColumnModel([
        new Ext.grid.RowNumberer(),
        { header: "鞋号", dataIndex: "shoes_id"},
        { header: "38", dataIndex: "size_38"},
        { header: "39", dataIndex: "size_39"},
        { header: "40", dataIndex: "size_40"},
        { header: "41", dataIndex: "size_41"},
        { header: "42", dataIndex: "size_42"},
        { header: "43", dataIndex: "size_43"},
        { header: "44", dataIndex: "size_44"}
    ]);
    cm :function(){ 
        return  [{ xtype: 'rownumberer' },
                { header: '回答内容', dataIndex: 'answer',editor: 'textarea'},
                { header: '创建日期', dataIndex: 'created_date',editor: 'textfield' },
                { header: '老师', dataIndex: 'teachers_id' ,editor: 'combo'},
                { header: '指定学生', dataIndex: 'students_id' ,editor: 'combo'},
        ]
    }

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

    rAnswerGrid function(){  
        return Ext.create ('Ext.grid.Panel'{
            id: "rAnswerGrid",
            width: 788,
            height: 487,
            frame: true,
            viewConfig: { forceFit: true },
            cm: cm,
            store: store,
            tbar: ["->",{
                xtype: "tbtext",
                text:"选择日期"
            },{
                xtype: "datefield",
                id: "datefield"
            }],
        });
    },
    readyAnswerWindow: function(){ 
        return Ext.create ('Ext.window.Window',{ 
            id: 'answerwindow',
            title: '已答查询',
            width: 800,
            height: 550,
            closeAction: 'hide',
            resizable: false,
            items: [],
            buttons: [{ 
                text: "确定",
                handler: function(){ 
                var day = new Array();
                day = String(Ext.getCmp("datefield").getValue()).split(" ");
                if(day[0] == "Jan"){ 
                    month = "-01-"
                }else if(day[1] == "Feb"){
                    month = "-02-" 
                }else if(day[1] == "Mar"){
                    month = "-03-" 
                }else if(day[1] == "Apr"){
                    month = "-04-" 
                }else if(day[1] == "May"){
                    month = "-05-" 
                }else if(day[1] == "Jun"){
                    month = "-06-" 
                }else if(day[1] == "Jul"){
                    month = "-07-" 
                }else if(day[1] == "Aug"){
                    month = "-08-" 
                }else if(day[1] == "Sep"){
                    month = "-09-" 
                }else if(day[1] == "Oct"){
                    month = "-10-" 
                }else if(day[1] == "Nov"){
                    month = "-11-" 
                }else{
                    month = "-12-" 
                };
                }
            }]
        })
    }

    readyAnswerWindow = new Ext.Window({
        id: "sheetwindow",
        title: "工作日报表查询",
        width: 800,
        height: 550,
        closeAction: "hide",
        resizable: false,
        items: [dailySheetGrid],
        buttons: [{
            text: "确定",
            handler: function(){
                var day = new Array();
                day = String(Ext.getCmp("datefield").getValue()).split(" ");
                if(day[0] == "Jan"){ 
                    month = "-01-"
                }else if(day[1] == "Feb"){
                    month = "-02-" 
                }else if(day[1] == "Mar"){
                    month = "-03-" 
                }else if(day[1] == "Apr"){
                    month = "-04-" 
                }else if(day[1] == "May"){
                    month = "-05-" 
                }else if(day[1] == "Jun"){
                    month = "-06-" 
                }else if(day[1] == "Jul"){
                    month = "-07-" 
                }else if(day[1] == "Aug"){
                    month = "-08-" 
                }else if(day[1] == "Sep"){
                    month = "-09-" 
                }else if(day[1] == "Oct"){
                    month = "-10-" 
                }else if(day[1] == "Nov"){
                    month = "-11-" 
                }else{
                    month = "-12-" 
                };
                var pro = day[3] + month + day[2];
                store.proxy = new Ext.data.HttpProxy({
                    url: "/managements/get_virtual_daily_sheet.json",
                    method: "post",
                    jsonData: { pro_date: pro },
                });
                store.reload();
            }
        },{
            text: "重置",
            handler: function(){
                Ext.getCmp("datefield").reset();
            }
        }]
    });
});

