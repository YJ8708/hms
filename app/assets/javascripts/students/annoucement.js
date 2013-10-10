Hms.chat.announcement = { 
    init: function(){ 
        Hms.Viewport = Ext.create('Ext.Viewport',{ 
            frame: true,
            layout: 'fit',
            items: [this.announcement()]
        });
    },

    announcementStore: function(){ 
        return Ext.create('Ext.data.JsonStore', { 
            fields: ['id','titles','project','teacher','content','created_at'],
            autoLoad: true,
            pageSize: 10,
            proxy: {
                type: 'ajax',
                url: '/announcements/get_announcement.json',
                reader: {
                    type: 'json',
                    root: 'announcement'
                }
            }
        });
    },

    announcement: function(){ 
        var me = this;
        return Ext.create('Ext.grid.Panel',{ 
            id: 'gridId',
            title: '公告',
            store: me.announcementStore(),
            columns: [
                { text: '标题', dataIndex: 'titles', width: 200},
                { text: '科目', dataIndex: 'project'},
                { text: '老师', dataIndex: 'teacher' },
                { text: '内容', dataIndex: 'content', width: 550},
                { text: '时间', dataIndex: 'created_at' }
            ],
            tbar: [{
                  text: '添加',
                  handler: function(){ 
                      Ext.create('Ext.window.Window',{ 
                          id: 'announcementId',
                          title: '添加公告',
                          layout: 'fit',
                          width: 500,
                          height: 400,
                          items: [me.announcementWindow()]
                      }).show();
                  }
            }],
            dockedItems: [{ 
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                store: me.announcementStore(),
                displayInfo: true
            }] 
        });
    },
     
    announcementWindow: function(){ 
        return Ext.create('Ext.form.FormPanel', { 
            defaultType: 'textfield',
            layout: 'vbox',
            height: '100%',
            items: [{ 
                id: 'teacherId',
                fieldLabel: '老师',
                labelWidth: 30,
                width: 250
            },{ 
                id: 'projectId',
                fieldLabel: '科目',
                labelWidth: 30,
                width: 250  
            },{
                id: 'titleId',
                fieldLabel: '标题',
                labelWidth:30,
                width: 400
            },{
                id: 'contentId',
                fieldLabel: '内容',
                labelWidth: 30,
                height: 100,
                width: 450,
                xtype: 'textarea',
                name: 'content'
            }],
            buttons: [{ 
              text: '提交',
              handler: function(){ 
                  var teacher = Ext.getCmp("teacherId").getValue();
                  var project = Ext.getCmp("projectId").getValue();
                  var titles = Ext.getCmp("titleId").getValue();
                  var content = Ext.getCmp("contentId").getValue();
                  var record = { 
                      teacher: teacher,
                      project: project,
                      titles: titles,
                      content: content
                  };
                  Ext.Ajax.request({ 
                      url: 'announcements/create_announcements',
                      method: 'post',
                      jsonData: { record: record },
                      success: function(){ 
                          Ext.Msg.alert('添加','添加成功!');
                      },
                      failure: function(){ 
                          Ext.Msg.alert('添加',"添加成功!");
                      },
                      callback: function(){ 
                          Ext.getCmp('announcementId').close();
                          Ext.getCmp('gridId').store.load();
                      }
                  });
              }
            }],
            buttonAlign: 'center'
        });
    }    
}
