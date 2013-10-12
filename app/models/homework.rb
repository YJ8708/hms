# -*- encoding : utf-8 -*-
class Homework < ActiveRecord::Base
  attr_accessible :mark, :student_id, :teacher_id, :thomework_id, :subject_id, :attachment_id 
end
