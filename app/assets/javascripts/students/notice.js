Hms.students.notice = { 
    init: function(){ 
        Hms.Viewport = Ext.create('Ext.Viewport',{ 
            frame: true,
            layout: 'fit',
            items: [this.notice()]
        });
    },

    noticeStore: function(){ 
        return Ext.create('Ext.data.JsonStore', { 
            fields: ['id','notice','remark','created_date'],
            autoLoad: true,
            pageSize: 10,
            proxy: {
                type: 'ajax',
                url: '/teachers/get_notice.json',
                reader: {
                    type: 'json',
                    root: 'notice'
                }
            }
        });
    },

    notice: function(){ 
        var me = this;
        return Ext.create('Ext.grid.Panel',{ 
            id: 'gridId',
            title: '公告',
            store: me.noticeStore(),
            columns: [
                { text: '公告', dataIndex: 'notice', width: 200},
                { text: '备注', dataIndex: 'remark'},
                { text: '时间', dataIndex: 'created_date' }
            ],
            dockedItems: [{ 
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                store: me.noticeStore(),
                displayInfo: true
            }] 
        });
    },
}
