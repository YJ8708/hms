# -*- encoding : utf-8 -*-
class CreateAttachments < ActiveRecord::Migration
  def change
    create_table :attachments do |t|
      t.string :filename

      t.timestamps
    end
  end
end
