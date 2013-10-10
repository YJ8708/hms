# -*- encoding : utf-8 -*-
###
 # # Provider
 # 
 # reorganize value in specified form.
 # 
 # Examples:
 # 
 # ```
 # class Order
 # 	attr_accessor :num
 # 	def initialize(num)
 # 		@num = num
 # 	end
 # end
 # 
 # class OrderItem
 # 	attr_accessor :order
 # 	def initialize(order)
 # 		@order = order
 # 	end
 # 	
 # 	def other_method
 # 		'other method'
 # 	end
 # end	
 # 
 # order = Order.new('num')
 # order_item = OrderItem.new(order)
 # order_item2 = OrderItem.new(order)
 # 
 # order = Order.new('num')
 # # => #<Order:0x007fc0c88c9610 @num="num"> 
 # order_item = OrderItem.new(order)
 # # => #<OrderItem:0x007fc0ca0af928 @order=#<Order:0x007fc0c88c9610 @num="num">> 
 # order_item2 = OrderItem.dup
 # # => #<Class:0x007fc0ca429608> 
 # order_item.provide('other_method', 'order/num')
 # # => [{"other_method"=>"other method", "order/num"=>"num"}] 
 # [order_item, order_item2].provide('other_method', 'order/num')
 # # =>[
 # 		{"other_method"=>"other method", "order/num"=>"num"}, 
 # 		{"other_method"=>nil, "order/num"=>nil}
 # 	] 
 # [order_item, order_item2].provide('other_method', 'order/num')
 # # => [
 # 	{"other_method"=>"other method", "order/num"=>"num"}, 
 # 	{"other_method"=>"other method", "order/num"=>"num"}
 # ] 
 # ```
 # 
 # `provide!` is the same as `provide`, the only difference is that it will raise exception when your method provided is not existed.
 ##

module Provider
  def provide(*forms)
    do_providing(forms)
  end

  def provide!(*forms)
    do_providing(forms, true)
  end

  private
  
  def do_providing(forms, raising_exception = false)
    forms.map!(&:to_s)
    
    elems = respond_to?(:each) ? self : [self]
    elems.map do |elem|
      forms.each_with_object({}) do |attr, form|
        value = nil
        begin
          value = elem.instance_eval(attr.gsub('/', '.'))
        rescue Exception => e
          raise("\033[31m [can't provide] #{self.class.name}#ID='#{id}' can't provide '#{attr}' \033[0m") if raising_exception
        end
        
        form[attr] = value
      end
    end
  end
end

Object.send :include, Provider
