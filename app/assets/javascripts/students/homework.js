Hms.students.homework = { 
    init: function(){ 
        Hms.ViewPort = Ext.create('Ext.panel.Panel', { 
            region: 'center',
            layout: 'border',
            items: [this.homeworkTree(),this.homeworkTabs()]
        });
    },

    //表格开始
    gridStore: function(){ 
        return Ext.create('Ext.data.Store',{ 
            fields: ['name', 'mark', 'teacher', 'download', 'create_time', 'time_end'],
            data: [
                { name: 'C++', mark: '88', teacher: 'chris', download: '链接', create_time: '2013-09-25', time_end: '2013-10-01'},
                { name: 'Java', mark: '98', teacher: 'chris', download: '链接', create_time: '2013-09-25', time_end: '2013-10-01'}
            ]
        })
    },

    homeworkGrid: function(){ 
        return Ext.create('Ext.grid.Panel',{ 
            title: '所有已完成作业',
            forceFit: true,
            bbar: new Ext.PagingToolbar({ 
                pageSize: 2,
                store: this.gridStore(),
                displayInfo: true,
                displayMsg: '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
                emptyMsg: "没有记录"
            }),
            columns: [
                { xtype: 'rownumberer', width: 20, sortable: false },
                { text: '作业名称', sortable: true, dataIndex: 'name' },
                { text: '成绩', sortable: true, dataIndex: 'mark' },
                { text: '老师', sortable: true, dataIndex: 'teacher' },
                { text: '下载', dataIndex: 'download' },
                { text: '提交时间', sortable: true, dataIndex: 'create_time' },
                { text: '截止时间', sortable: true, dataIndex: 'time_end' }
            ],
            store: this.gridStore()
        })
    },
    //表格结束

    //标签开始
    homeworkTabs: function(){ 
        return Ext.widget('tabpanel',{ 
            region: 'center',
            frame: true,
            activeTab: 0,
            items: [{ 
                title: 'C++',
                closable: true,
                layout: 'fit',
                items: [this.homeworkGrid()]
            },{ 
                title: 'Java',
                closable: true,
                layout: 'fit',
                items: [this.homeworkGrid()]
            }]
        })
    },
    //标签结束

    //树开始
    homeworkTree: function(){ 
        return Ext.create('Ext.tree.Panel',{ 
            title: '功能选择',
            width: 200,
            frame: true,
            region: 'west',
            collapsible: true
        })
    }
    //树结束

}
