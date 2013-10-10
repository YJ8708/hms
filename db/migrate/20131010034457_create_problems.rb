# -*- encoding : utf-8 -*-
class CreateProblems < ActiveRecord::Migration
  def change
    create_table :problems do |t|
      t.string :content
      t.integer :student_id
      t.integer :teacher_id
      t.integer :answer_id

      t.timestamps
    end
  end
end
