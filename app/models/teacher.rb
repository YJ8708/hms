# -*- encoding : utf-8 -*-
class Teacher < ActiveRecord::Base
  attr_accessible :email, :name, :number, :password, :phone
  has_many :thomeworks
end
