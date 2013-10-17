# -*- encoding : utf-8 -*-
class StudentsController < ApplicationController
  def index
  end

  def show
  end

  def get_thomework
    render :json => { :get_thomework => Thomework.all.provide('id', 'name', 'description', 'teacher/name', 'subject/name', 'time_end') }
  end

  def get_homework
    tabId = params[:id]
    render :json => { :get_homework => Homework.find_all_by_subject_id(tabId).provide('id', 'thomework/name', 'mark', 'teacher/name', 'attachment/filename', 'created_at', 'thomework/time_end' ) }
  end

  def get_subject
    render :json => { :get_subject => Subject.all.provide('id', 'name')}
  end

  def upload_attachment
    tmp = params[:file]
    if tmp
      filename = tmp.original_filename
      file = File.join("public/data", filename)
      File.open(file, 'wb'){ |f| f.write(tmp.read) } 
    end
    render :json => { :success => true }
    
    #name = Time.now.strftime("%y%m%d%I%M%S") + 'size'+ params[:path].size.to_s  ##防止新文件名重复  
    #suffix=File.extname("#{params[:path].original_filename}")  #取旧文件名  
    #name<<suffix  
    #directory = "public/data"  
    #path = File.join(directory, name)                        ##传换路径，格式：/public/data/xx.xx  
    #File.open(path, "wb") { |f| f.write(upload.read) }  ##写文件内容  
  end

  def create_attachment
    a = params[:id]
    getname = params[:name]
    Attachment.create!(:filename=> getname )
    Homework.create!(:teacher_id => Thomework.find_by_teacher_id(a).id, :subject_id => Thomework.find_by_subject_id(a).id, :thomework_id => a, :attachment_id => Attachment.find_by_filename(getname).id )
    render :json => {}
  end

  def download_attachment
    send_file "#{RAILS_ROOT}/public/data/" + params[:id] unless params[:id].blank?
    render :json => true
  end

end
