# -*- encoding : utf-8 -*-
class Attachment < ActiveRecord::Base
   attr_accessible :filename
   has_one :homework
end
