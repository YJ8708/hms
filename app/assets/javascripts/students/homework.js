Hms.students.homework = { 
    init: function(){ 
        Hms.ViewPort = Ext.create('Ext.panel.Panel', { 
            region: 'center',
            layout: 'border',
            items: [this.tree(),this.homeworkTabs()]
        });
    },

    //表格开始
    gridStore: function(tabId){ 
        Ext.define('User', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id', type: 'integer'},
                {name: 'thomework/name', type: 'string'},
                {name: 'mark', type: 'integer'},
                {name: 'teacher/name', type: 'string'},
                {name: 'attachment/filename', type: 'string'},
                {name: 'created_at', type: 'datatime'},
                {name: 'thomework/time_end', type: 'datatime'},
                //{name: 'descn', type: 'pressmebutton'}
            ]
        });

        return Ext.create('Ext.data.Store', {
            model: 'User',
            proxy: {
                type: 'ajax',
                url: '/students/get_homework.json?id='+tabId,
                reader: {
                    type: 'json',
                    root: 'get_homework',
                }
            },
            autoLoad: true
        });
        
    },

    homeworkGrid: function(tabId){ 
        return Ext.create('Ext.grid.Panel',{ 
            title: '所有已完成作业',
            forceFit: true,
            bbar: new Ext.PagingToolbar({ 
                pageSize: 25,
                store: this.gridStore(tabId),
                displayInfo: true,
                displayMsg: '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
                emptyMsg: "没有记录"
            }),
            columns: [
                { xtype: 'rownumberer', width: 20, align: 'center', sortable: false },
                { text: '作业名称', sortable: true, align: 'center', dataIndex: 'thomework/name' },
                { text: '成绩', sortable: true, align: 'center', dataIndex: 'mark' },
                { text: '老师', sortable: true, align: 'center', dataIndex: 'teacher/name' },
                { text: '文件名', align: 'center', dataIndex: 'attachment/filename' },
                { text: '提交时间', sortable: true, align: 'center', renderer:Ext.util.Format.dateRenderer('Y年m月d日'), dataIndex: 'created_at' },
                { text: '截止时间', sortable: true, align: 'center', renderer:Ext.util.Format.dateRenderer('Y年m月d日'), dataIndex: 'thomework/time_end' },
                { text: '下载', menuDisabled: true, sortable: false, align: 'center', xtype: 'actioncolumn', icon: '/assets/downloads.png', tooltip: '下载作业', handler: function(record){ Ext.Ajax.request({ url:'/students/download_attachment', params:{ id: '123.jpg' } })} }
            ],
            store: this.gridStore(tabId)
        })
    },
    //表格结束

    //标签开始
    homeworkTabs: function(){ 
        Ext.Ajax.request({ 
            url: '/students/get_subject.json',
            scope: this,
            success: function(response){ 
           
                var o = Ext.decode(response.responseText);
        
                var s = new Array();

                var u = o.get_subject.length;

                for(var i=0; i<u; i++){
                    var tabId = o.get_subject[i].id;
                    s[i] = tabs11.add({
                        title: o.get_subject[i].name,
                        id: o.get_subject[i].id,
                        layout: 'fit',
                        listeners: { 
                            tabchange: function(tab, tabpanel){ 
                                tab.loader.load(tabpanel.id);
                            }
                        },
                        items: [this.homeworkGrid(tabId)]
                    });
                    tabs11.setActiveTab(s[i]);
                };
            }
        });

        return tabs11 = Ext.widget('tabpanel',{ 
            region: 'center',
            frame: true,
            activeTab: 0
        })
    },
    //标签结束

    //树开始
    treeStore: function(){ 
        return Ext.create('Ext.data.TreeStore',{ 
            root: {
                expanded: true,
                children: [
                  { text: "公告", leaf: true, href: '/students/show_notice' },
                  { text: "查看作业", leaf: true, href: '/students' },
                  { text: "查看成绩", leaf: true, href: '/students/show' },
                  { text: "答疑", leaf: true, href: '#' }
                ]
            }
        })
    },

    tree: function(){ 
        return Ext.create('Ext.tree.Panel',{ 
            title: '功能选择',
            width: 200,
            frame: true,
            region: 'west',
            collapsible: true,
            rootVisible: false,
            store: this.treeStore()
        })
    }
    //树结束

}
