# -*- encoding : utf-8 -*-
class Problem < ActiveRecord::Base
   attr_accessible :content, :student_id, :teacher_id, :answer_id
end
