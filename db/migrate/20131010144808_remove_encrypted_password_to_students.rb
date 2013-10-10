class RemoveEncryptedPasswordToStudents < ActiveRecord::Migration
  def up
    remove_column :students, :encrypted_password
  end

  def down
  end
end
