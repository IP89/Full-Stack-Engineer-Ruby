Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'marvel#update_db'

  get '/list' => 'comic#list'
  post '/comic_modify' => 'comic#change'
  get '/search' => 'comic#search'
  get '/comic' => 'comic#get'

end
