# -*- encoding : utf-8 -*-
class StudentsController < ApplicationController

  def index
  end

  def show
  end

  def get_thomework
    render :json => { :get_thomework => Thomework.all.provide('name', 'description', 'teacher/name', 'subject/name', 'time_end') }
  end

  def get_subject
    render :json => { :get_subject => Subject.all.provide('name')}
  end

  def post_attachment
    require 'fileutils'
    tmp = params[:file]
    name = tmp.original_filename
    file = File.join("public/data", name)
    FileUtils.cp tmp.path, file 
    Attachment.create!(:filename=> name)
    render :json => {}
    
    #name = Time.now.strftime("%y%m%d%I%M%S") + 'size'+ params[:path].size.to_s  ##防止新文件名重复  
    #suffix=File.extname("#{params[:path].original_filename}")  #取旧文件名  
    #name<<suffix  
    #directory = "public/data"  
    #path = File.join(directory, name)                        ##传换路径，格式：/public/data/xx.xx  
    #File.open(path, "wb") { |f| f.write(upload.read) }  ##写文件内容  
  end

end
