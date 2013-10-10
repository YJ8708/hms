# -*- encoding : utf-8 -*-
class CreateThomeworks < ActiveRecord::Migration
  def change
    create_table :thomeworks do |t|
      t.string :name
      t.string :time_start
      t.string :time_end
      t.text :description
      t.integer :subject_id
      t.integer :class_id
      t.integer :teacher_id

      t.timestamps
    end
  end
end
