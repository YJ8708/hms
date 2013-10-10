class AddEmailAndEncryptedPasswordToStudents < ActiveRecord::Migration
  def change
    add_column :students, :email, :string, :null => false, :default => ""
    add_column :students, :encrypted_password, :string, :null => false, :default => ""
  end
end
