# encoding: utf-8
class AdminsController < ApplicationController

  def students
  end

  def teachers
  end

  def get_class_tree
    tree = { children: [
                    { text: "班级列表", expanded: true, children: [
                        { text: "12网络工程1班", leaf: true },
                        { text: "12网络工程2班", leaf: true },
                        { text: "12软件工程1班", leaf: true },
                        { text: "12软件工程2班", leaf: true }
                    ]},
                    { text: "未分班的", leaf: true }
                ]
            }

    respond_to do |format|
      format.json { render json: tree }
    end
  end
end
