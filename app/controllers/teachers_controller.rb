# -*- encoding : utf-8 -*-
class TeachersController < ApplicationController
  
  def notice
  end

#  def get_notice
#    render :json => { :root => Notice.all }
#  end 
  def get_notice
   respond_to do |format|
     format.json{ render :json => { :notice => Notice.all } }
   end
  end

  def update_notice
    Notice.find(params[:record][:id]).update_attributes(params[:record])
    render :json => {}
  end

  def create_notice
    Notice.create!(params[:record])
    render :json => {}
  end 

  def delete_notice
    Notice.find(params[:id]).destroy
    render :json => {}
  end  

  def get_class_tree_data
    node = { 
        children:[
            { text: "班级分类",expanded: true, children: [
            { text: "11软件1班", leaf: true },
            { text: "12软件2班", leaf: true },
            { text: "11网洛1班", leaf: true }
            ]}
        ]
    }
     render :json => node
  end

end
