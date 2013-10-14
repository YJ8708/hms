# -*- encoding : utf-8 -*-
class Subject < ActiveRecord::Base
  attr_accessible :name
  has_many :thomeworks
  has_many :homeworks
end
