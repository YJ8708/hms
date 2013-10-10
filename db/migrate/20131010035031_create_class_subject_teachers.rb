# -*- encoding : utf-8 -*-
class CreateClassSubjectTeachers < ActiveRecord::Migration
  def change
    create_table :class_subject_teachers do |t|
      t.integer :class_id
      t.integer :subject_id
      t.integer :teacher_id

      t.timestamps
    end
  end
end
