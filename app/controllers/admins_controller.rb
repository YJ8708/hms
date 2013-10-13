# encoding: utf-8
class AdminsController < ApplicationController

  def students
  end

  def teachers
  end

  def get_classes_tree
    tree = {
      children: [
        { text: "班级列表", expanded: true, children: get_classes_list},
        { text: "未分班的", leaf: true }
      ]
    }
    render json: tree
  end

  def del_classes_tree
    Classes.find(params[:id]).destroy
    get_classes_tree
  end

  def get_classes_list
    classesList = []
    Classes.all.each do |c|
      classesList.push({ text: c.name, id: c.id, leaf: true })
    end
    return classesList
  end
end
