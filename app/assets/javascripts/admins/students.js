Hms.admins.students = { 
    init: function() { 
        Hms.ViewPort = Ext.create('Ext.panel.Panel', { 
            region: 'center',
            layout: 'border',
            items: [
                this.createClassTree(),
                this.createStudentGrid(),
                this.createSubjectGrid()
            ]
        });
    },

    createClassTree: function() { 
        return Ext.create('Ext.tree.Panel', {
            region: 'west',
            title: '惠州学院学生',
            useArrows: true,
            width: 240,
            collapsible: true,
            margin: '0 0 0 5',
            store: this.storeClassTree(),
            split: true,
            rootVisible: false,
            tbar: [{ 
                text: '新建'
            }]
        });
    },

    createStudentGrid: function() { 
        return Ext.create('Ext.grid.Panel', {
            region: 'center',
            title: '学生列表',
            store: this.storeStudentGrid(),
            columns: [
                { text: 'Number', dataIndex: 'number' },
                { text: 'Name', dataIndex: 'name' },
                { text: 'Email', dataIndex: 'email', flex: 1 }
            ],
            tbar: [{ 
                text: '移动'
            }]
        });
    },

    createSubjectGrid: function() { 
        return Ext.create('Ext.grid.Panel', { 
            region: 'east',
            title: '科目列表',
            width: 300,
            collapsible: true,
            margin: '0 5 0 0',
            split: true,
            store: this.storeSubjectGrid(),
            columns: [
                { text: '科目', dataIndex: 'subject', flex: 1 },
                { text: '老师', dataIndex: 'teacher', flex: 1 }
            ],
            tbar: [{ 
                text: '新增'
            }]
        });
    },

    storeClassTree: function() { 
        return Ext.create('Ext.data.TreeStore', {
            root: { expanded: true },
            proxy: { 
                type: 'ajax',
                url: '/admins/get_class_tree.json',
                reader: { 
                    type: 'json'
                }
            }
        });
    },

/*
    storeClassTree: function() { 
        return Ext.create('Ext.data.TreeStore', { 
            root: {
                expanded: true,
                children: [
                    { text: "班级列表", expanded: true, children: [
                        { text: "12网络工程1班", leaf: true },
                        { text: "12网络工程2班", leaf: true },
                        { text: "12软件工程1班", leaf: true },
                        { text: "12软件工程2班", leaf: true }
                    ]},
                    { text: "未分班的", leaf: false }
                ]
            }
        });
    },
*/
    storeStudentGrid: function() { 
        return Ext.create('Ext.data.Store', { 
            fields: ['number', 'name', 'email'],
            data: { 'items': [
                { 'number': '1212', 'name': '威威', 'email': 'wei@qq.com' },
                { 'number': '1213', 'name': '木木', 'email': 'mumu@qq.com' },
                { 'number': '1215', 'name': '呆呆', 'email': 'dd@qq.com' }
            ]},
            proxy: { 
                type: 'memory',
                reader: { 
                    type: 'json',
                    root: 'items'
                }
            }
        });
    },

    storeSubjectGrid: function() { 
        return Ext.create('Ext.data.Store', { 
            fields: ['subject', 'teacher'],
            data: { 'items': [
                { 'subject': '高等数学', 'teacher': '小白' },
                { 'subject': 'C++', 'teacher': '许涛' },
                { 'subject': '大学物理', 'teacher': '李昌勇' }
            ]},
            proxy: { 
                type: 'memory',
                reader: { 
                    type: 'json',
                    root: 'items'
                }
            }
        });
    }
}
