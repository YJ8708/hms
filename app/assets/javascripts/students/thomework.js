Hms.students.thomework = {     
    init: function(){ 
        Hms.ViewPort = Ext.create('Ext.panel.Panel',{
            region: 'center',
            layout: 'border',
            items: [this.thomeworkContainer(), this.thomeworkTree()]
        });
    },

    //整合表格表单
    thomeworkContainer: function(){ 
        return Ext.create('Ext.panel.Panel', { 
            region: 'center',
            layout: 'border',
            items: [this.thomeworkGrid(), this.thomeworkForm()]
        })
    },

    //表格开始
    thomeworkGrid: function(){ 
        return Ext.create('Ext.grid.Panel',{ 
            title: '布置作业',
            region: 'center',
            id: 'thomeworkGrid',
            frame: true,
            forceFit: true,
            listeners: { 
                'itemclick':function(){ 
                    var record = Ext.getCmp('thomeworkGrid').getSelectionModel().getLastSelected();
                    if(record){ 
                        Ext.getCmp("thomeworkForm").getForm().loadRecord(record);
                    }
                }
            },
            bbar: new Ext.PagingToolbar({ 
                pageSize: 25,
                store: this.thomeworkStore(),
                displayInfo: true,
                displayMsg: '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
                emptyMsg: "没有记录"
            }),
            columns: [
                { xtype: 'rownumberer', width: 10, sortable: false },
                { text: '作业名称', sortable: true, dataIndex: 'name' },
                { text: '内容', sortable: true, dataIndex: 'description' },
                { text: '老师', sortable: true, dataIndex: 'teacher/name' },
                { text: '科目', sortable: true, dataIndex: 'subject/name' },
                { text: '截止时间', sortable: true, dataIndex: 'time_end' }
            ],
            store: this.thomeworkStore()
        });
    },

    thomeworkStore: function(){ 
        Ext.define('User', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'name', type: 'string'},
                {name: 'description', type: 'string'},
                {name: 'teacher/name', type: 'string'},
                {name: 'subject/name', type: 'string'},
                {name: 'time_end', type: 'datatimie'}
            ]
        });

        return Ext.create('Ext.data.Store', {
            model: 'User',
            proxy: {
                type: 'ajax',
                url: '/students/get_thomework.json',
                reader: {
                    type: 'json',
                    root: 'get_thomework',
                }
            },
            autoLoad: true
        });
    },
    //表格结束 

    //表单开始
    thomeworkForm: function(){ 
        return Ext.create('Ext.form.Panel',{ 
            title: '作业详情',
            id: 'thomeworkForm',
            region: 'south',
            height: 360,
            frame: true,
            layout: 'column',
            items: [{ 
                columnWidth: .5,
                layout: 'form',
                dafaultType:'textfield',
                //labelAlign: 'right',
                //labelWidth: 50,
                //buttonAlign: 'light',
                xtype: 'fieldset',
                title: 'first',
                //style:'margin-left:40px',
                items: [{ 
                    id: 'name',
                    fieldLabel: '作业名称',
                    name: 'name',
                    xtype: 'textfield'
                },{ 
                    id: 'description',
                    fieldLabel: '内容',
                    name: 'description',
                    xtype: 'textarea',
                    height: 250
                }]
            },{ 
                columnWidth: .5,
                layout: 'form',
                //labelAlign: 'right',
                //labelWidth: 80,
                //buttonAlign: 'light',
                xtype: 'fieldset',
                title: 'second',
                style:'margin-left:10px',
                items: [{ 
                    id: 'teacher/name',
                    fieldLabel: '老师',
                    name: 'teacher/name',
                    xtype: 'textfield',
                },{ 
                    id: 'subject/name',
                    fieldLabel: '科目',
                    name: 'subject/name',
                    xtype: 'textfield'
                },{ 
                    id: 'time_end',
                    fieldLabel: '截止时间',
                    name: 'time_end',
                    xtype: 'textfield'
                },this.thomeworkUpload()]
            }]
        })
    },

    //上传组件
    thomeworkUpload: function(){ 
        return Ext.create('Ext.form.Panel', {
            title: '上传作业',
            bodyPadding: 10,
            frame: true,
            layout: 'form',
            style:'margin-top:69px',
            items: [{
                xtype: 'filefield',
                name: 'file',
                fieldLabel: '文件',
                labelWidth: 50,
                msgTarget: 'side',
                allowBlank: false,
                anchor: '100%',
                buttonText: '选择作业'
            }],

            buttons: [{
                text: '上传',
                handler: function() {
                    var form = this.up('form').getForm();
                    if(form.isValid()){
                        form.submit({
                            url: '/students/post_attachment.json',
                            waitMsg: '上传中...',
                            success: function(fp, o) {
                                Ext.Msg.alert('Success', '你的作业"' + o.result.file + '" 已经上传!');
                            }
                        });
                    }
                }
            }]
        });
    },
    //表单结束

    //树开始
    thomeworkTree: function(){ 
        return Ext.create('Ext.tree.Panel',{ 
            title: '功能选择',
            width: 200,
            frame: true,
            region: 'west',
            collapsible: true
            //store: this.treeStore()
        })
    }
    //树结束
   
}; 
