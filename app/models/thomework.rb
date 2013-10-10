# -*- encoding : utf-8 -*-
class Thomework < ActiveRecord::Base
  attr_accessible :name, :time_start, :time_end, :description, :subject_id, :class_id, :teacher_id 
  belongs_to :subject
  belongs_to :classes
  belongs_to :teacher
end
