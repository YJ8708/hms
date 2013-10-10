# -*- encoding : utf-8 -*-
class Notice < ActiveRecord::Base
  attr_accessible :remark, :notice, :created_date, :teacher_id
#  belongs_to :teacher
end
