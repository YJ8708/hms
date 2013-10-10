 Hms.teachers.notice = { 
    init: function() { 
        Hms.ViewPort = { 
            height:930,
            width: 1900,
            layout: 'border',
//            region:'center',
            defaults: { 
                split: true
            },
            items: [{
                title: '教师主页',
                region: 'south',   
                xtype: 'panel',
                height: 35,
            },{
                title: '班级',
                region:'west',
                xtype: 'panel',
                width: 200,
                collapsible: true,  
                id: 'west-region-container',
                layout: 'fit',
                items: [this.createTree()]
            },{
                region: 'center',    
                xtype: 'panel',
                layout: 'fit',
                items: [this.createNoticeGrid()]
            }],
//            items: [this.createNoticeGrid()]
        };
    },
    createTree: function(){  
        var store = Ext.create('Ext.data.TreeStore', { 
            proxy: {
                type: 'ajax',
                url: '/teachers/get_class_tree_data.json',
                reader: {
                    type: 'json',
                }
            },
            autoLoad: true
        })
        return  Ext.create('Ext.tree.Panel',{ 
            store: store,
            width: 180,
            rootVisible: false,
            useArrows: true,
        })   
     },
    store: function(){  
        return Ext.create ('Ext.data.Store',{ 

            proxy: {
                    type: 'ajax',
                    url: '/teachers/get_notice.json',
                    reader: {
                        type: 'json',
                        root: 'notice',
                    }
                },

            fields: ["id", "notice", "remark", "created_date"],
            autoLoad: true
        });
    },

    cm: function(){
        return  [{ xtype: 'rownumberer' },
                { header: '公告内容', dataIndex: 'notice',editor: 'textfield'},
                { header: '备注', dataIndex: 'remark' ,editor: 'textfield'},
                { header: '创建日期', dataIndex: 'created_date',editor: 'textfield' }
        ]
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

//    gridTbar: function() { 
//        var me = this;
//        return [{ 
//                text: '添加',
//                handler: function() { 
//                me.addNotice("添加公告").show(); }
//            }, { 
//                text: '删除',
//                handler: function() { this.deleteNotice(); }
//            }, { 
//                text: '修改',
//                handler: function() { this.updateNotice(); }
//            }]
//    },
    gridTbar: function(){ 
         return Ext.create('Ext.toolbar.Toolbar',{ 
             defaults: { 
                 scope: this
             },
             items: [{ 
                 text: '添加',
                 handler: function(){ this.addNotice("添加公告").show()}
             },{ 
                 text: '修改',
                 handler: function(){ this.updateNotice()}
             },{ 
                 text: '删除',
                 handler: function(){ this.deleteNotice() }
             }]
        })
    },

    addNotice: function(type) {
        var addNoticeForm = Ext.create('Ext.form.Panel',{ 
            id: 'addNoticeForm',
            labelAlign: 'right',
            width: 300,
            height: 190,
            labelWidth: 60,
            bodyStyle: 'padding: 10px 0 0 0',
            frame: true,
            items: [
                { id: 'addNotice', fieldLabel: '公告内容', xtype: 'textfield', width: 200 },
                { id: 'addRemark', fieldLabel: '备注', xtype: 'textarea', width: 200 },
                { id: 'addCreatedDate', fieldLabel: '创建日期', xtype: 'datefield', width: 200 }
            ],
            buttons: [{ 
                text: '保存',
                scope: this,
                handler: function() { 
                    this.checkForNotice(type)
                }
            }]
        });

        return Ext.create('Ext.window.Window',{ 
            id: 'addWindow',
            title: type,
            modal: true,
            items: [ addNoticeForm ]
        });
    },

    checkForNotice: function(type) { 
        var notice = Ext.getCmp('addNotice').getValue();
        var remark = Ext.getCmp('addRemark').getValue();
        var created_date = Ext.getCmp('addCreatedDate').getValue();
        var selection = Ext.getCmp('noticeGrid').getSelectionModel();
        var store = Ext.getCmp('noticeGrid').store;
        var win
        var record = { 
            notice: notice ,
            remark: remark,
            created_date: created_date
        };
        if(notice) { 
            if(type == "修改") { 
                var record = { 
                    id: selection.getLastSelected().data["id"],
                    notice: notice,
                    remark: remark,
                    created_date: created_date
                };
                Ext.Ajax.request({ 
                    url: '/teachers/update_notice.json',
                    method: 'post',
                    jsonData: { record: record },
                    success: function() { 
                        Ext.getCmp('noticeGrid').store.load();                    
                        Ext.getCmp('addWindow').close();                        
                        Ext.Msg.alert('修改', '修改成功!');
                    },
                    failure: function() { 
                        Ext.Msg.alert('修改', '修改失败!');         
                    },
                });
            }else{ 
                Ext.Ajax.request({ 
                    url: '/teachers/create_notice.json',
                    method: 'post',
                    jsonData: { record: record },
                    success: function() { 
                        Ext.Msg.alert('添加', '添加成功!');
                    },
                    failure: function() { 
                        Ext.Msg.alert('添加', '添加失败!');         
                    },
                    callback: function() { 
                        Ext.getCmp('addNoticeForm').form.reset();
                        Ext.getCmp('addWindow').close();
                        Ext.getCmp('noticeGrid').store.load();
                    }
                });      
            }

        }else{ 
            Ext.Msg.alert('警告', '内容不能为空' );
        }
    },

    deleteNotice: function() { 
//        var selection = Ext.getCmp('noticeGrid').getSelectionModel();
        
//        if(selection.getSelected()) { 
//            Ext.Ajax.request({ 
//                url: '/teachers/delete_notice.json',
//                method: 'post',
//                jsonData: { id: selection.getSelected().id },
//                success: function() { 
//                    Ext.getCmp('noticeGrid').store.load();                    
//                    Ext.Msg.alert('删除', '删除成功!');
//                },
//                failure: function() { 
//                    Ext.Msg.alert('删除', '删除失败!');         
//                },
//            })
//        }else{ 
//            Ext.Msg.alert('警告', '请选择一条记录');
//        }
//    },
        var record = Ext.getCmp('noticeGrid').getSelectionModel().getSelection()[0].data.id;
        if( Ext.getCmp('noticeGrid').getSelectionModel().getSelection().pop()){ 
                   Ext.Ajax.request({ 
                       url: '/teachers/delete_notice.json',
                       method: 'post',
                       jsonData: { id: record },
                       success: function(){ 
                            Ext.getCmp('noticeGrid').store.load();
                            Ext.Msg.alert('删除','删除成功！');
                       },
                       failure: function(){ 
                           Ext.Msg.alert('删除','删除失败！');
                       },
                   })
        }else{ 
              Ext.Msg.alert('警告','请选择一条记录');
        }
    },

    updateNotice: function() { 
        var selection = Ext.getCmp('noticeGrid').getSelectionModel();
        if(!selection.getLastSelected()) { 
            Ext.Msg.alert('警告', '请选择一条记录');
        }else{ 
            var data = selection.getLastSelected().data;
            this.addNotice("修改").show();             
            Ext.getCmp('addNotice').setValue(data["notice"]);
            Ext.getCmp('addRemark').setValue(data["remark"]);
            Ext.getCmp('addCreatedDate').setValue(data["created_date"]);
        };
    } 

};

