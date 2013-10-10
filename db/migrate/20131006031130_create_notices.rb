# -*- encoding : utf-8 -*-
class CreateNotices < ActiveRecord::Migration
  def change
    create_table :notices do |t|
      t.string :notice, :null => false
      t.text :remark
      t.date :created_date

      t.timestamps
    end
  end
end
