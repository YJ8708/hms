# -*- encoding : utf-8 -*-
class Classes < ActiveRecord::Base
   attr_accessible :name
   has_many :thomeworks
end
