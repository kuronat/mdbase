require 'sinatra'
require 'sinatra/reloader' if development?
require 'cgi'

get "/" do
  erb :index
end

get '/file' do
  File.read params["path"]
end

get '/open' do
  system "open \"#{CGI.unescape params["path"]}\""
  "ok"
end
