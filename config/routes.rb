Hms::Application.routes.draw do
 
  devise_for :admins

  devise_for :teachers

  devise_for :students

#  get "windowforms/form"
#
#   resources :arranges do
#   collection do
#     get "homework"
#     
#     get "get_arrange"
#     post "create_arrange"
#     post "delete_arrange"
#     post "update_arrange"
#   
#   end
# end
  resources :admins do
    collection do
      get 'students'
      get 'teachers'
      get 'get_classes_tree'
      post 'del_classes_tree'
    end
  end

  resources :students do
    collection do
      get 'index'
      get 'show'
      get 'get_thomework'
      get 'get_homework'
      get 'get_subject'
      post 'download_attachment'
      get 'show_notice'
      post 'upload_attachment'
      post 'create_attachment'
    end
  end

  resources :teachers do
    collection do
      get 'notice'
      get "get_notice"
      get 'get_class_tree_data'
      post "create_notice"
      post "delete_notice"
      post "update_notice"
    end
  end

  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'
    root :to => 'teachers#notice'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
