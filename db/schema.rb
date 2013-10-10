# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20131010130214) do

  create_table "attachments", :force => true do |t|
    t.string   "filename"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "class_subject_teachers", :force => true do |t|
    t.integer  "class_id"
    t.integer  "subject_id"
    t.integer  "teacher_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "classes", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "homeworks", :force => true do |t|
    t.integer  "mark"
    t.integer  "student_id"
    t.integer  "teacher_id"
    t.integer  "thomework_id"
    t.integer  "subject_id"
    t.integer  "attachment_id"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

  create_table "notices", :force => true do |t|
    t.string   "notice",       :null => false
    t.text     "remark"
    t.date     "created_date"
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
    t.string   "myname"
  end

  create_table "problems", :force => true do |t|
    t.string   "content"
    t.integer  "student_id"
    t.integer  "teacher_id"
    t.integer  "answer_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "students", :force => true do |t|
    t.string   "number"
    t.string   "name"
    t.string   "email"
    t.string   "encrypted_password"
    t.integer  "class_id"
    t.datetime "created_at",         :null => false
    t.datetime "updated_at",         :null => false
  end

  create_table "subjects", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "teachers", :force => true do |t|
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.string   "name"
  end

  create_table "thomeworks", :force => true do |t|
    t.string   "name"
    t.string   "time_start"
    t.string   "time_end"
    t.text     "description"
    t.integer  "subject_id"
    t.integer  "class_id"
    t.integer  "teacher_id"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

end
