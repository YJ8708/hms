# -*- encoding : utf-8 -*-
class AddColumnToNotices < ActiveRecord::Migration
  def change
    add_column :notices,:myname,:string
  end
end
