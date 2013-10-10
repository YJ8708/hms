# -*- encoding : utf-8 -*-
class CreateHomeworks < ActiveRecord::Migration
  def change
    create_table :homeworks do |t|
      t.integer :mark
      t.integer :student_id
      t.integer :teacher_id
      t.integer :thomework_id
      t.integer :subject_id
      t.integer :attachment_id

      t.timestamps
    end
  end
end
