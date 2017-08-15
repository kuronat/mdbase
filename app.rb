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

require 'watir'
Thread.new {
  b = Watir::Browser.start 'http://localhost:4567', args: %w{--disable-infobars}
  at_exit { b.quit }
  while sleep 1
    b.status unless b.nil? rescue exit(0)
  end
}
