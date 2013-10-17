Hms.students.menu = { 
    init: function(){ 
        Hms.ViewPort = Ext.create('Ext.panel.Panel', { 
            region: 'center',
            layout: 'border',
            items: [this.tree()]
        })
    },

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

}
