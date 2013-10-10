class RemoveEmailToStudents < ActiveRecord::Migration
  def up
    remove_column :students, :email
  end

  def down
  end
end
