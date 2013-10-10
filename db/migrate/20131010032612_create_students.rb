# -*- encoding : utf-8 -*-
class CreateStudents < ActiveRecord::Migration
  def change
    create_table :students do |t|
      t.string :number
      t.string :name
      t.string :email
      t.string :encrypted_password
      t.integer :class_id

      t.timestamps
    end
  end
end
