var $ = require("jquery")
var md = require('markdown-it')().use(require('./guard-delimiter'))
var path = require("path")

$(".btn").on("click", (e)=>{
  console.log("polling")
  var btn = $(e.currentTarget)
  $.get("/file", {path: btn.attr("link")}).then((s)=>{
    console.log("change detected!")
    var h = md.render(s)

    $(".markdown-body").html("")
    $(".markdown-body").append(`<div><a class=fileopen href=/dummy path="${btn.attr("link")}">${path.basename(btn.attr("link"))}</a></div>`)
    $(".markdown-body").append(h)

    $(".fileopen").on("click", e =>{
      $.get("/open", {path: e.currentTarget.getAttribute("path")}, console.log)
      e.preventDefault()
    })

    MathJax.Hub.Queue(["Typeset",MathJax.Hub,"preview"])
  })
})
