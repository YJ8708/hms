# -*- encoding : utf-8 -*-
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
puts 'createing Notices'
Notice.create([
    { :notice => 'notice1', :remark => 'remark' },
    { :notice => 'notice2', :remark => 'remark' },
    { :notice => 'notice3', :remark => 'remark' },
])

puts 'creating thomeworks'
Thomework.create!([
  { :name => 'Java', :time_end => '2013-10-13', :description => "课本第33页第3题", :subject_id => '1', :teacher_id => '1' },   
  { :name => 'C++', :time_end => '2013-10-11', :description => "课本第3页第33题", :subject_id => '2', :teacher_id => '2' },   
  { :name => 'C#', :time_end => '2013-10-12', :description => "课本第13页第3题", :subject_id => '3', :teacher_id => '3' },   
])

puts 'creating teachers'
Teacher.create!([
  { :name => 'chris' },
  { :name => '肖锦辉' },
  { :name => '肖东' },
])

puts 'creating subjects'
Subject.create!([
  { :name => 'Java入门' },
  { :name => '深入浅出C++' },
  { :name => 'C#圣经' },
])
