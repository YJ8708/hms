# -*- encoding : utf-8 -*-
class Homework < ActiveRecord::Base
  attr_accessible :mark, :student_id, :teacher_id, :thomework_id, :subject_id, :attachment_id 
  belongs_to :student
  belongs_to :teacher
  belongs_to :thomework
  belongs_to :subject
  belongs_to :attachment
end
